var category = document.getElementById('dropdown').innerText;
var selected = document.getElementsByClassName('options');
var accBalance = 0;
function drop(){
    document.getElementById('dropcontent').classList.toggle("show")
}
console.log(document.getElementById("amount").value);
console.log(document.getElementById('dropdown').innerText);
function checkin_or_out(){
    if (document.getElementById("amount").value && document.getElementById('dropdown').innerText !== "Categories"){
        if (document.getElementById('expense-toggle').classList.contains('highlighted')){
            getexpense();
        }else{
            // console.log('else is working');
            getincome();
        }
    }else{
        alert("Invalid Inputs!!!")
    }
}
function income_mode(){
    if (document.getElementById('income-toggle').classList.contains('highlighted')){
    }
    else{
        document.getElementById('income-toggle').classList.toggle("highlighted");
        document.getElementById('expense-toggle').classList.toggle("highlighted");
        document.getElementById('inputs').classList.toggle("hide")
    };
}

function expense_mode(){
    if (document.getElementById('expense-toggle').classList.contains('highlighted')){
    }
    else{
        document.getElementById('income-toggle').classList.toggle("highlighted");
        document.getElementById('expense-toggle').classList.toggle("highlighted");
        document.getElementById('inputs').classList.toggle("hide")
    };

}


function changecategory(v){
    let category = document.getElementById('Drop-head').innerText
    selected = document.getElementsByClassName('options')
    category = "Categories : " + selected[v-1].innerHTML
    document.getElementById('Drop-head').innerHTML =  category;
    var title = selected[v-1].innerHTML
    console.log(title);
}


function getexpense(){
    var amt = document.getElementById("amount").value;
    category = document.getElementById('dropdown').innerText
    if(localStorage.getItem("itemsJson")==null)
    {
        itemJsonArray=[]
        itemJsonArray.push([category.slice(13,),amt])
        localStorage.setItem('itemsJson',JSON.stringify(itemJsonArray))
    }
    else{
        itemstr=localStorage.getItem("itemsJson")
        itemJsonArray = JSON.parse(itemstr)
        itemJsonArray.push([category.slice(13,),amt])
        localStorage.setItem('itemsJson',JSON.stringify(itemJsonArray))
    }
    save();
}
function getincome(){
    var amt = document.getElementById("amount").value;
    category = 'Income Credited';

    if(localStorage.getItem("itemsJson")==null)
    {
        itemJsonArray=[]
        itemJsonArray.push([category,amt])
        localStorage.setItem('itemsJson',JSON.stringify(itemJsonArray))
    }
    else{
        itemstr=localStorage.getItem("itemsJson")
        itemJsonArray = JSON.parse(itemstr)
        itemJsonArray.push([category,amt])
        localStorage.setItem('itemsJson',JSON.stringify(itemJsonArray))
    }
    var arrlen = itemJsonArray.length
    window.accBalance += Number(itemJsonArray[arrlen-1][1])
    console.log(accBalance);
    save();
}

function save(use=true){
    if(localStorage.getItem("itemsJson")==null)
    {
        itemJsonArray=[]
    }
    else{
        itemstr=localStorage.getItem("itemsJson")
        itemJsonArray = JSON.parse(itemstr)
    }
    var data = localStorage.getItem('itemsJson')
    let tablebody = document.getElementById("table-body");
    let str = '';
    itemJsonArray.forEach((element , i) => {
        str += '<tr><td> -- </td><td>'+  element[0] + ' </td><td>' + element[1] + ' </td><td><button class="delete-button" onclick="deleting('+i+')">Delete</button></td></tr>';
    });
    tablebody.innerHTML = str;

    let finalbalance=document.getElementById("finalbalance").innerText;
    finalbalance=Number(finalbalance)
    
    updateFinalBalance(finalbalance,use)
}

function updateFinalBalance(finalbalance,use){
    if (use) {
        // let expense=itemJsonArray[itemJsonArray.length-1][1]
        // expense=Number(expense)
        let accbalance=document.getElementById("accbalance").innerText;
        accbalance=Number(accbalance)
        let expense=0
        let income=0
        itemJsonArray.forEach((element) => {
           
            
            if (element[0]=="Income Credited"){
                income+=Number(element[1])
                finalbalance=accbalance+income-expense
            }
            else {
                expense+=Number(element[1])
                finalbalance=accbalance-expense+income
            }
        })

        //finalbalance=finalbalance-expense;
    }

    console.log(finalbalance)
    document.getElementById("finalbalance").innerHTML="<h3>"+finalbalance+"</h3>";
}



function clearing(){
    if (confirm("You are claring all data???")){
        localStorage.clear();
        window.accBalance = 0
        save(false)
        let accbalance=document.getElementById("accbalance").innerText;
        document.getElementById("finalbalance").innerHTML="<h3>"+accbalance+"</h3>";
    }
}
function deleting(i){
    itemstr=localStorage.getItem("itemsJson");
    itemJsonArray = JSON.parse(itemstr);
    itemJsonArray.splice(i,1)
    localStorage.setItem('itemsJson',JSON.stringify(itemJsonArray));
    save(false);

    let accbalance=document.getElementById("accbalance").innerText;
    accbalance=Number(accbalance)
    let finalbalance=document.getElementById("finalbalance").innerText;
    finalbalance=Number(finalbalance)
    let expense=0;
    if(localStorage.getItem("itemsJson")!=null){
        itemJsonArray.forEach((element) =>{
            str=element[1]
            str=Number(str)
            expense=expense+str
        })
        
        finalbalance=accbalance-expense
    }
    else {
        finalbalance=accbalance
    }

    console.log(finalbalance)
    document.getElementById("finalbalance").innerHTML="<h3>"+finalbalance+"</h3>";
}
save();
console.log(accBalance);
const userdata = [
    {
        Grocery :{},
        Medical:{},
        Stationary:{}, 
        Petrol:{}, 
        Rent:{}, 
        Miscelleneous:{}
    }
]
