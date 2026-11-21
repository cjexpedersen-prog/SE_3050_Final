let response;
let rdata;
let sdata;
let ldata;
let lastcall;
let searchdata ={
        Sfunc:"6",
        sterm:"",
        maxp:"",
        mnumber:"0",
        ordernum:"0"
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
                document.getElementById("qbox").innerHTML=`<div class="search-row"><input type="text" id="query" placeholder="Search for Category (Vegetables, Greens, Fruits, Honey, Mushrooms, Bakery, Dairy, or Eggs)"><input  type="number" id="maxp" min="1" max="100" step="1" placeholder="Max Price"></input><button id="func3b" onClick="getdata(3)">Search</button></div>`
        }else if (ufn==4){
                document.getElementById("qbox").innerHTML=`<div class="search-row"><input type="text" id="query" placeholder="Search Market by City"></input><button id="func4b" onClick="getdata(4)">Search</button></div>`
        }else if (ufn==5){
                document.getElementById("qbox").innerHTML=`<div class="id-row"><input type="number" id="mnum" min="1" max="10" step="1" placeholder="Market ID"><button id="func5b" onClick="getdata(5)">List Vendors by MarketID</button></div>`
        }else if (ufn==6){
                document.getElementById("qbox").innerHTML=`<button id="func6b" onClick="getdata(6)">View Market contact and general information</button>`
        }else if (ufn==7){
                document.getElementById("qbox").innerHTML=`<button id="func7b" onClick="getdata(7)">View items in need of restock</button>`
        }else if (ufn==8){
                document.getElementById("qbox").innerHTML=`<div class="id-row"><input type="number" id="mnum" min="1001" max="1030" step="1" placeholder="Order ID"><button id="func8b" onClick="getdata(8)">View Order Information</button></div>`
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
                searchdata.sterm = document.getElementById("query").value
                searchdata.maxp = document.getElementById("mnum").value
        }else if (fetchinfo==4){
                searchdata.sterm = document.getElementById("query").value
        }else if (fetchinfo==5){
                 searchdata.mnumber = document.getElementById("mnum").value
        }else if (fetchinfo==8){
                searchdata.ordernum = document.getElementById("mnum").value
        }
    submitdata();
        
};
function displayeddata(){
        displaydata="";
        displayform=lastcall;
        ldata = JSON.parse(sdata);
        if (displayform==1){
                displaydata ='<table><tr><th>Category</th><th>In stock Quantity:</th><th>Market Name</th><th>Price</th><th>ProductID</th><th>Product Name</th><th>Vendor Name</th></tr>'
        for(let i of ldata){displaydata+=`<tr><td>${i.Category}</td><td>${i.InStockQuantity}</td><td>${i.MarketName}</td><td>${i.Price}</td><td>${i.ProductID}</td><td>${i.ProductName}</td><td>${i.VendorName}</td><tr>`}
                displaydata+="</table>"
                document.getElementById("lresults").innerHTML=displaydata;
        } else if (displayform==2){
                console.log("show 2")
        }else if (displayform==3){
                console.log("show 3")
        }else if (displayform==4){
                console.log("show 4")
        }else if (displayform==5){
                console.log("show 5")
        }else if (displayform==6){
                console.log("show 6")
                
        }else if (displayform==7){
                console.log("show 7")
        }else if (displayform==8){
                console.log("show 8")
        }else if (displayform==9){
                console.log("show 9")       
        }else if (displayform==10){
               console.log("show 10")
        }else if (displayform==11){
                console.log("show 11")
        }else if (displayform==12){
               console.log("show 12")
        }else if (displayform==13){
              console.log("show 13")
        }else if (displayform==14){
               console.log("show 14")
        }else if (displayform==115){
               console.log("show 15")
        }
        
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
