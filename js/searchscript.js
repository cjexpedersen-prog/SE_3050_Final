let response;
let rdata;
let sdata;
let ldata;
let lastcall;
let searchdata ={
        Sfunc:"6",
        sterm:"",
        maxp:"99",
        mnumber:"1",
        ordernum:"1001"
};


document.addEventListener("DOMContentLoaded", () => {
        const searchMenu = document.getElementById("searchf");
        functionChange(Number(searchMenu.value));
});

function functionChange(ufn){
        if (ufn==1){
                document.getElementById("qbox").innerHTML=`<button id="func1b" onClick="getdata(1)">View all products</button>`
               console.log("event 1")
        }else if (ufn==2){
                document.getElementById("qbox").innerHTML=`<div class="search-row"><input type="text" id="query" placeholder="Keyword search"></input><button id="func2b" onClick="getdata(2)">Search</button></div>`
        }else if (ufn==3){
                document.getElementById("qbox").innerHTML=`<div class="search-row"><input type="text" id="query" placeholder="Search for Category (Vegetables, Greens, Fruits, Honey, Mushrooms, Bakery, Dairy, or Eggs)"><input  type="number" id="maxp" min="1" max="100" step="1" value="99"></input><button id="func3b" onClick="getdata(3)">Search</button></div>`
        }else if (ufn==4){
                document.getElementById("qbox").innerHTML=`<div class="search-row"><input type="text" id="query" placeholder="Search Market by City"></input><button id="func4b" onClick="getdata(4)">Search</button></div>`
        }else if (ufn==5){
                document.getElementById("qbox").innerHTML=`<div class="id-row"><input type="number" id="mnum" min="1" max="10" step="1" value="1"><button id="func5b" onClick="getdata(5)">List Vendors by MarketID</button></div>`
        }else if (ufn==6){
                document.getElementById("qbox").innerHTML=`<button id="func6b" onClick="getdata(6)">View Market contact and general information</button>`
        }else if (ufn==7){
                document.getElementById("qbox").innerHTML=`<button id="func7b" onClick="getdata(7)">View items in need of restock</button>`
        }else if (ufn==8){
                document.getElementById("qbox").innerHTML=`<div class="id-row"><input type="number" id="mnum" min="1001" max="1030" step="1" value="1001" ><button id="func8b" onClick="getdata(8)">View Order Information</button></div>`
              
        }else if (ufn==9){
                document.getElementById("qbox").innerHTML=`<button id="func9b" onClick="getdata(9)">View Order totals</button>`
        }else if (ufn==10){
                document.getElementById("qbox").innerHTML=`<button id="func10b" onClick="getdata(10)">View Vendor Revenue</button>`
        }else if (ufn==11){
                document.getElementById("qbox").innerHTML=`<button id="func10b" onClick="getdata(11)">View Total Paid Sales by Market</button>`
        }else if (ufn==12){
                document.getElementById("qbox").innerHTML=`<button id="func12b" onClick="getdata(12)">View Best-selling products by quantity</button>`
        }else if (ufn==13){
                document.getElementById("qbox").innerHTML=`<button id="func13b" onClick="getdata(13)">View Order counts by status</button>`
        }else if (ufn==14){
                document.getElementById("qbox").innerHTML=`<button id="func14b" onClick="getdata(14)">Daily revenue trends</button>`
        }else if (ufn==15){
                document.getElementById("qbox").innerHTML=`<button id="func15b" onClick="getdata(15)">Count products and stock units per vendor</button>`
        }
}



function getdata(fetchinfo) {
        lastcall=fetchinfo;
        searchdata.Sfunc=fetchinfo;
        if (fetchinfo==2){
                searchdata.sterm = document.getElementById("query").value
        } else if (fetchinfo==3){
                if (searchdata.sterm = document.getElementById("query").value==''){
                        window.alert('The search box may not be empty.');
                        return;
                }
                searchdata.sterm = document.getElementById("query").value
                if (isNaN(document.getElementById("maxp").valueAsNumber)){
                        searchdata.maxp=999;
                }else{
                searchdata.maxp = document.getElementById("maxp").valueAsNumber};
        }else if (fetchinfo==4){
                if (searchdata.sterm = document.getElementById("query").value==''){
                        window.alert('The search box may not be empty.');
                        return;;
                }
                searchdata.sterm = document.getElementById("query").value
        }else if (fetchinfo==5){
                 searchdata.mnumber = document.getElementById("mnum").value
        }else if (fetchinfo==8){
                searchdata.ordernum = document.getElementById("mnum").value
        }
    submitdata();
        return;
};
function displayeddata(){
        displaydata="";
        displayform=lastcall;
        ldata = JSON.parse(sdata);
        if (displayform==1){
                displaydata ='<table><tr><th>Category</th><th>In stock Quantity</th><th>Market Name</th><th>Price</th><th>Product ID</th><th>Product Name</th><th>Vendor Name</th></tr>'
        for(let i of ldata){displaydata+=`<tr><td>${i.Category}</td><td>${i.InStockQuantity}</td><td>${i.MarketName}</td><td>${i.Price}</td><td>${i.ProductID}</td><td>${i.ProductName}</td><td>${i.VendorName}</td><tr>`}
        } else if (displayform==2){
                displaydata ='<table><tr><th>Product ID</th><th>Product Name</th><th>Vendor Name</th></tr>'
        for(let i of ldata){displaydata+=`<tr><td>${i.ProductID}</td><td>${i.Name}</td><td>${i.VendorName}</td><tr>`}
        }else if (displayform==3){
                displaydata ='<table><tr><th>Product ID</th><th>Name</th><th>Price</th><th>In Stock Quantity</th></tr>'
        for(let i of ldata){displaydata+=`<tr><td>${i.ProductID}</td><td>${i.Name}</td><td>${i.Price}</td><td>${i.InStockQuantity}</td><tr>`}
        }else if (displayform==4){
                displaydata ='<table><tr><th>Market ID</th><th>Name</th><th>State</th><th>Operation Hours</th><th>Phone Number</th></tr>'
        for(let i of ldata){displaydata+=`<tr><td>${i.MarketID}</td><td>${i.Name}</td><td>${i.State}</td><td>${i.OperationHours}</td><td>${i.Phone}</td><tr>`}
        }else if (displayform==5){
                displaydata ='<table><tr><th>Vendor ID</th><th>Vendor Name</th><th>Phone Number</th><th>Operation Hours</th><th>Market Name</tr>'
        for(let i of ldata){displaydata+=`<tr><td>${i.VendorID}</td><td>${i.VendorName}</td><td>${i.Phone}</td><td>${i.OperationHours}</td><td>${i.MarketName}</td><tr>`}
                
        }else if (displayform==6){
                  displaydata ='<table><tr><th>Market ID</th><th>Market Name</th><th>Email Address</th><th>Type</th></tr>';
                for(let i of ldata){displaydata+=`<tr><td>${i.MarketID}</td><td>${i.Name}</td><td>${i.Email}</td><td>${i.Type}</td><tr>`}
        }else if (displayform==7){
                displaydata ='<table><tr><th>Product ID</th><th>Product Name</th><th>In stock Quantity</th><th>Vendor Name</th></tr>'
        for(let i of ldata){displaydata+=`<tr><td>${i.ProductID}</td><td>${i.ProductName}</td><td>${i.InStockQuantity}</td><td>${i.VendorName}</td><tr>`}
        }else if (displayform==8){
                 displaydata ='<table><tr><th>Order ID</th><th>Order Name</th><th>Order Status</th><th>Product Name/th><th>Quantity</th><th>Unit Price</th><th>Line Total</th></tr>'
        for(let i of ldata){displaydata+=`<tr><td>${i.OrderID}</td><td>${i.OrderDate}</td><td>${i.OrderStatus}</td><td>${i.ProductName}</td><td>${i.Quantity}</td><td>${i.UnitPrice}</td><td>${i.LineTotal}</td><tr>`}
        }else if (displayform==9){
                displaydata ='<table><tr><th>Order ID</th><th>Order Date</th><th>Payment Status</th><th>Order Status</th><th>Order Total</th></tr>'
                 for(let i of ldata){displaydata+=`<tr><td>${i.OrderID}</td><td>${i.OrderDate}</td><td>${i.OrderStatus}</td><td>${i.PaymentStatus}</td><td>${i.OrderTotal}</td><tr>`}
        }else if (displayform==10){
                displaydata ='<table><tr><th>Vendor ID</th><th>Market Name</th><th>Revenue</th></tr>';
                for(let i of ldata){displaydata+=`<tr><td>${i.VendorID}</td><td>${i.VendorName}</td><td>${i.Revenue}</td><tr>`}
        }else if (displayform==11){
              displaydata ='<table><tr><th>Market ID</th><th>Market Name</th><th>Revenue</th></tr>';
                for(let i of ldata){displaydata+=`<tr><td>${i.MarketID}</td><td>${i.MarketName}</td><td>${i.Revenue}</td><tr>`}
        }else if (displayform==12){
              displaydata ='<table><tr><th>ProductID</th><th>Product Name</th><th>Units Sold</th></tr>'
        for(let i of ldata){displaydata+=`<tr><td>${i.ProductID}</td><td>${i.ProductName}</td><td>${i.UnitsSold}</td><tr>`}
        }else if (displayform==13){
              displaydata ='<table><tr><th>Order Status</th><th>Total Number</th></tr>';
                for(let i of ldata){displaydata+=`<tr><td>${i.OrderStatus}</td><td>${i.NumberOfOrders}</td><tr>`}
        }else if (displayform==14){
               displaydata ='<table><tr><th>Order Date</th><th>Daily Revenue</th></tr>'
                 for(let i of ldata){displaydata+=`<tr><td>${i.OrderDate}</td><td>${i.DailyRevenue}</td><tr>`}
        }else if (displayform==15){
               displaydata ='<table><tr><th>Vendor ID</th><th>Vendor Name</th><th>Product Count</th><th>Total Stock Units</th></tr>';
                for(let i of ldata){displaydata+=`<tr><td>${i.VendorID}</td><td>${i.VendorName}</td><td>${i.ProductCount}</td><td>${i.TotalStockUnits}</td><tr>`}
        }
         displaydata+="</table>"
        document.getElementById("lresults").innerHTML=displaydata;
};
async function submitdata(){
    let url = "../php/sqlsearch.php"
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if(xhr.readyState == 4 && xhr.status == 200){
            sdata = xhr.responseText;
                console.log(rdata);
                console.log(sdata);
                document.getElementById("lresults").textContent=sdata;
                displayeddata();
            }
        }
    xhr.open("POST",url, true)
        xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
        xhr.send(JSON.stringify(searchdata));
        console.log(xhr.responseText);
        
};
async function trynew(){
    try{
            response = await fetch("../test.txt");
            rdata = await response;
            sdata = await response.responseText;
            if (!rdata.ok){
                console.error("Test failed : ",error);
            }
            else{
                console.log(rdata);
                console.log(sdata);
                document.getElementById("lsresults").textContent=sdata;
            }
    }
    catch (error){
        console.error("Test failed : ",error);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("preorder-form");

    if (!form) return;

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const productId = Number(
            document.getElementById("preorder-product").value
        );

        const quantity = Number(
            document.getElementById("preorder-quantity").value
        );

        const message = document.getElementById("preorder-message");

        if (!Number.isSafeInteger(productId) ||
            !Number.isSafeInteger(quantity) ||
            productId < 1 || quantity < 1) {
            message.textContent = "Enter a valid product ID and quantity.";
            return;
        }

        try {
            const response = await fetch("../php/preorder.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ productId, quantity })
            });

            const result = await response.json();

            message.textContent = result.message;

            if (response.ok && result.success) {
                form.reset();
            }
        } catch (error) {
            message.textContent =
                "Unable to connect to the pre-order service.";
        }
    });
});

