var category = document.getElementById('dropdown').innerText
var selected = document.getElementsByClassName('options')






function income_mode(){
    document.getElementById('income-toggle').style.color='blue';
    document.getElementById('Drop-head').style.display='none';
    document.getElementById('dropcontent').style.display='none';
    document.getElementById('expense-toggle').style.color='black';

}

function expense_mode(){
    document.getElementById('income-toggle').style.color='black';
    document.getElementById('Drop-head').style.display='block';
    
    document.getElementById('expense-toggle').style.color='blue';

}
function drop(){
    document.getElementById('dropcontent').classList.toggle("show")
}







function toggle_hide_show() {
    var x = document.getElementById("dropcontent");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }


function changecategory(v){
    let category = document.getElementById('Drop-head').innerText
    selected = document.getElementsByClassName('options')
    category = "Categories : " + selected[v-1].innerHTML
    document.getElementById('Drop-head').innerHTML =  category;
    var title = selected[v-1].innerHTML
    toggle_hide_show();
    console.log(title);
}

function getandupdate(){
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

function save(){
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
}

function clearing(){
    localStorage.clear();
    save()
    
}
function deleting(i){
    // console.log(i);
    itemstr=localStorage.getItem("itemsJson");
    itemJsonArray = JSON.parse(itemstr);
    itemJsonArray.splice(i,1)
    localStorage.setItem('itemsJson',JSON.stringify(itemJsonArray));
    save();
}
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
