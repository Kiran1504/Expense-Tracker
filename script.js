var category = document.getElementById('dropdown').innerText;
var selected = document.getElementsByClassName('options');
var accBalance = 0;
function drop(){
    document.getElementById('dropcontent').classList.toggle("show")
}
function createtr(){
    for(i=0;i<1100;i++){
    var pixel=document.createElement('div')
    pixel.classList.add('grid_item')
    document.getElementById('gridtr').appendChild(pixel)    
    }
}
createtr();
function checkin_or_out(){
    if (document.getElementById("amount").value && document.getElementById('dropdown').innerText !== "Categories"){
        if (document.getElementById('expense-toggle').classList.contains('highlighted')){
            getexpense();
        }else{
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
    document.getElementById('cat').value = selected[v-1].innerHTML
}


function getexpense(){
    var amt = document.getElementById("amount").value;
    category = document.getElementById('dropdown').innerText
    const date = new Date()
    let dot = date.getDate()+ "/" +date.getMonth() + "/" +date.getFullYear()
    if(localStorage.getItem("itemsJson")==null)
    {
        itemJsonArray=[]
        itemJsonArray.push([dot,category.slice(13,),amt])
        localStorage.setItem('itemsJson',JSON.stringify(itemJsonArray))
    }
    else{
        itemstr=localStorage.getItem("itemsJson")
        itemJsonArray = JSON.parse(itemstr)
        itemJsonArray.push([dot,category.slice(13,),amt])
        localStorage.setItem('itemsJson',JSON.stringify(itemJsonArray))
    }
    save();
}
function getincome(){
    var amt = document.getElementById("amount").value;
    category = 'Income Credited';
    const date = new Date()
    let dot = date.getDate()+ "/" +date.getMonth() + "/" +date.getFullYear()
    if(localStorage.getItem("itemsJson")==null)
    {
        itemJsonArray=[]
        itemJsonArray.push([dot,category,amt])
        localStorage.setItem('itemsJson',JSON.stringify(itemJsonArray))
    }
    else{
        itemstr=localStorage.getItem("itemsJson")
        itemJsonArray = JSON.parse(itemstr)
        itemJsonArray.push([dot,category,amt])
        localStorage.setItem('itemsJson',JSON.stringify(itemJsonArray))
    }
    var arrlen = itemJsonArray.length
    window.accBalance += Number(itemJsonArray[arrlen-1][2])
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
    let tablebody = document.getElementById("listr");
    let str = '';
    
    for (ferrari=0;ferrari<itemJsonArray.length;ferrari++){
        let inORout="showred"
        let trans="transred"
        if (itemJsonArray[ferrari][1]=='Income Credited'){inORout="showgreen";trans="transgreen"}
        
        
        
        // str += '<tr><td class="'+inORout+'">'+itemJsonArray[ferrari][0]+' </td><td class="'+inORout+'">'+  itemJsonArray[ferrari][1] + ' </td><td class="'+inORout+'">' + itemJsonArray[ferrari][2] + ' </td><td><button class="delete-button" onclick="deleting('+ferrari+')">Delete</button></td></tr>';

        str += '<li class="item"><div class="'+trans+'"><div class="up"><span class="cat">'+itemJsonArray[ferrari][1]+'</span><span class="'+inORout+'"><b>' + itemJsonArray[ferrari][2] +'</b></span></div><div class="dow"><span class="date">'+itemJsonArray[ferrari][0]+'</span><button class="delete-button" onclick="deleting('+ferrari+')">Delete</button></div></div></li>'
    }


    tablebody.innerHTML = str;
    CheckLimit()

    let finalbalance=document.getElementById("finalbalance").innerText;
    finalbalance=Number(finalbalance)
    updateFinalBalance(itemJsonArray,finalbalance,use)  
}

function updateFinalBalance(itemJsonArray,finalbalance,use){
    if (use) {
        
        let accbalance=document.getElementById("accbalance").innerText;
        accbalance=Number(accbalance)
        let expense=0
        let income=0
        itemJsonArray.forEach((element) => {
           
            
            if (element[1]=="Income Credited"){
                income+=Number(element[2])
                finalbalance=accbalance+income-expense
            }
            else {
                expense+=Number(element[2])
                finalbalance=accbalance-expense+income
            }
        })
    }
    else{
        finalbalance=document.getElementById("finalbalance").innerText
        finalbalance =Number(finalbalance)
        let accbalance=document.getElementById("accbalance").innerText;
        accbalance=Number(accbalance)
        if (itemJsonArray.length > 0){
            let expense=0
            let income=0
            itemJsonArray.forEach((element) => {
            
                
                if (element[1]=="Income Credited"){
                    income+=Number(element[2])
                    finalbalance=accbalance+income-expense
                }
                else {
                    expense+=Number(element[2])
                    finalbalance=accbalance-expense+income
                    }
                })
                // console.log("IF is running");
                // console.log(itemJsonArray.length);
        }

        else{
            let accbalance=document.getElementById("accbalance").innerText;
            
            finalbalance = accbalance
            // console.log(finalbalance);
            // console.log("ELSE is running");
            document.getElementById("finalbalance").innerHTML="<h3>"+accbalance+"</h3>";
        }
    }
    document.getElementById("finalbalance").innerHTML="<h3>"+finalbalance+"</h3>";  
}



function clearing(){
    if (confirm("You are claring all data???")){
        localStorage.clear();
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

}
save();


function CheckLimit(){
    analysisE=JSON.parse(localStorage.getItem("Analysis"));
    Budget=JSON.parse(localStorage.getItem("Budget"));
    
    if (Number(analysisE[0]["GroceryE"])>=Number(Budget[0]["GroceryB"]) && Number(Budget[0]["GroceryB"])!=0){
        alert("You have exceeded your spending limit on grocery");
    }
    if (Number(analysisE[0]["RentE"])>=Number(Budget[0]["RentB"]) && Number(Budget[0]["RentB"])!=0){
        alert("You have exceeded your spending limit on rent");
    }
    if (Number(analysisE[0]["StationaryE"])>=Number(Budget[0]["StationaryB"]) && Number(Budget[0]["StationaryB"])!=0){
        alert("You have exceeded your spending limit on stationary");
    }
    if (Number(analysisE[0]["PetrolE"])>=Number(Budget[0]["PetrolB"]) && Number(Budget[0]["PetrolB"])!=0){
        alert("You have exceeded your spending limit on petrol");
    }
    if (Number(analysisE[0]["MiscellaneousE"])>=Number(Budget[0]["MiscellaneousB"]) && Number(Budget[0]["MiscellaneousB"])!=0){
        alert("You have exceeded your spending limit on miscellaneous");
    }
    if (Number(analysisE[0]["MedicalE"])>=Number(Budget[0]["MedicalB"]) && Number(Budget[0]["MedicalB"])!=0){
        alert("You have exceeded your spending limit on medical");
    }
    
}





//* A little table redesigning

// function focustet(){
//     this.style.scale="1.05"
//     this.style.transition="scale 3s ease"
// }

// console.log('this')

// let altet=document.getElementsByClassName('transred')
// Object.values(altet).forEach(tet => {
//     // this.addEventListener("mouseleave",focustet())
//     // this.addEventListener("mouseleave",unfocustet())
//     console.log(this)
//     console.log('this')

// });
