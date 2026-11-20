let response;
let rdata;
let sdata;
let searchdata ={
        Sfunc:"0",
        sterm:"",
        maxp:"",
        mnumber:"0",
        ordernum:"0"
};
function functionChange(ufn){
        if (ufn==1){
                document.getElementById("qbox").innerHTML=`<button id="func1b" onClick="getdata(1)">View all products</button>`
        }else if (ufn==2){
                document.getElementById("qbox").innerHTML=`<input type="text" id="query" placeholder="Keyword search"></input><button id="func2b" onClick="getdata(2)">Search by keyword</button>`
        }else if (ufn==3){
                document.getElementById("qbox").innerHTML=`<label for="query">Search Vegetables, Greens, Fruits, Honey, Mushrooms, Bakery, Dairy, or Eggs</label><input type="text" id="query" placeholder="Search by Category"></input><input type="number" id="maxp" min="1" max="100" step="1" value="1"><button id="func3b" onClick="getdata(3)">Search by keyword</button>`
        }else if (ufn==4){
                document.getElementById("qbox").innerHTML=`<input type="text" id="query" placeholder="Search Market by City"></input><button id="func4b" onClick="getdata(4)">Search Market by City</button>`
        }else if (ufn==5){
                document.getElementById("qbox").innerHTML=`<label for="mnum">MarketID: </label><input type="number" id="mnum" min="1" max="10" step="1" value="1"><button id="func5b" onClick="getdata(5)">List Vendors by MarketID</button>`
        }else if (ufn==6){
                document.getElementById("qbox").innerHTML=`<button id="func6b" onClick="getdata(6)">View Market contact and general information</button>`
        }else if (ufn==7){
                document.getElementById("qbox").innerHTML=`<button id="func7b" onClick="getdata(7)">View items in need of restock</button>`
        }else if (ufn==8){
                document.getElementById("qbox").innerHTML=`<label for="onum">MarketID: </label><input type="number" id="mnum" min="1001" max="1030" step="1" value="1001"><button id="func8b" onClick="getdata(5)">View Order Information</button>`
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




function readsearchT(){

    
    
}



function getdata(fetchinfo) {
        searchdata.sfunc=fetchinfo;
        if (fetchinfo==2){
                searchdata.sterm = document.getElementById("query").value;
        }elseif (fetchinfo==3){
                searchdata.sterm = document.getElementById("query").value;
                searchdata.maxp = document.getElementById("mnum").value;
        }elseif (fetchinfo==4){
                searchdata.sterm = document.getElementById("query").value;
        }elseif (fetchinfo==5){
                 searchdata.mnumber = document.getElementById("mnum").value;
        }elseif (fetchinfo==8){
                searchdata.ordernum = document.getElementById("mnum").value;
        };
    submitdata();
        
};

function submitdata(){
    let url = "../script/sqlcatch.php"
    getdata();
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if(xhr.readyState == 4 && xhr.status == 200){
        document.getElementbyId("lresults").innerHTML='<p id="tester"></p>'
            document.getElementById("tester").innerText=this.responseText;
        }
    };
    xhr.open("GET",url, true)
        xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
        xhr.send(JSON.stringify(data));
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
                document.getElementById("lresults").textContent=sdata;
            }
    }
    catch (error){
        console.error("Test failed : ",error);
    }
}
