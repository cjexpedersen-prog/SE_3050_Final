
function functionChange(ufn){
        if (ufn=1){
                document.getElementById("qbox").innerHTML=`<button id="func1b" onClick="fetcher(1)">View all products</button>`
        }else if (ufn=2){
                document.getElementById("qbox").innerHTML=`<input type="text" id="query" placeholder="Keyword search"></input><button id="func2b" onClick="fetcher(2)">Search by keyword<button>`
        }else if (ufn=3){
                document.getElementById("qbox").innerHTML=`<label for="query">Search Vegetables, Greens, Fruits, Honey, Mushrooms, Bakery, Dairy, or Eggs</label><input type="text" id="query" placeholder="Search by Category"></input><input type="number" id="maxp" min="1" max="100" step="1" value="1"><button id="func3b" onClick="fetcher(3)">Search by keyword<button>`
        }else if (ufn=4){
                document.getElementById("qbox").innerHTML=`<input type="text" id="query" placeholder="Search Market by City"></input><button id="func4b" onClick="fetcher(4)">Search Market by City<button>`
        }else if (ufn=5){
                document.getElementById("qbox").innerHTML=`<label for="mnum">MarketID: </label><input type="number" id="mnum" min="1" max="10" step="1" value="1"><button id="func5b" onClick="fetcher(5)">List Vendors by MarketID<button>`
        }else if (ufn=6){
                document.getElementById("qbox").innerHTML=`<button id="func6b" onClick="fetcher(6)">View Market contact and general information</button>`
        }else if (ufn=7){
                document.getElementById("qbox").innerHTML=`<button id="func7b" onClick="fetcher(7)">View items in need of restock</button>`
        }else if (ufn=8){
                document.getElementById("qbox").innerHTML=`<label for="onum">MarketID: </label><input type="number" id="mnum" min="1001" max="1030" step="1" value="1001"><button id="func8b" onClick="fetcher(5)">View Order Information<button>`
        }else if (ufn=9){
                document.getElementById("qbox").innerHTML=`<button id="func9b" onClick="fetcher(9)">View Order totals</button>`
        }else if (ufn=10){
                document.getElementById("qbox").innerHTML=`<button id="func10b" onClick="fetcher(10)">View Vendor Revenue</button>`
        }else if (ufn=11){
                document.getElementById("qbox").innerHTML=`<button id="func10b" onClick="fetcher(11)">View Total Paid Sales by Market</button>`
        }else if (ufn=12){
                document.getElementById("qbox").innerHTML=`<button id="func12b" onClick="fetcher(12)">View Best-selling products by quantity</button>`
        }else if (ufn=13){
                document.getElementById("qbox").innerHTML=`<button id="func13b" onClick="fetcher(13)">View Order counts by status</button>`
        }else if (ufn=14){
                document.getElementById("qbox").innerHTML=`<button id="func14b" onClick="fetcher(14)">Daily revenue trends</button>`
        }else if (ufn=15){
                document.getElementById("qbox").innerHTML=`<button id="func15b" onClick="fetcher(15)">Count products and stock units per vendor</button>`
        }
}



let searchdata ={
        Sfunc:"0",
        sterm:"",
        maxp:"",
        mnumber:"0",
        ordernum:"0"
};
function readsearchT(){

    
    
}



function getdata(fetchinfo) {
        if (fetchinfo==1){
                console.log('value 1 recieved.');
        };
    readsearchT();
    console.log(searchdata.scaleU);
        
};
