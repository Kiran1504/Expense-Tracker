var category = document.getElementById('dropdown').innerText
var selected = document.getElementsByClassName('options')
function drop(){
    document.getElementById('dropcontent').classList.toggle("show")
}

function changecategory(v){
    let category = document.getElementById('Drop-head').innerText
    selected = document.getElementsByClassName('options')
    category = "Categories : " + selected[v-1].innerHTML
    document.getElementById('Drop-head').innerHTML =  category;
    var title = selected[v-1].innerHTML
    console.log(title);
}

function save(){
    var amt = document.getElementById("amount").value;
    category = document.getElementById('dropdown').innerText
    console.log(category,amt);
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


    let tablebody = document.getElementById("table-body");
    let str = '';
    itemJsonArray.forEach((element , i) => {
        str += '<tr><td> -- </td><td>'+  element[0] + ' </td><td>' + element[1] + ' </td></tr>';
    });
    tablebody.innerHTML = str;
}
