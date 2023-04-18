var category = document.getElementById('dropdown').innerText
var selected = document.getElementsByClassName('options')
function drop(){
    document.getElementById('dropcontent').classList.toggle("show")
}
function changecategory(v){
    
    switch (v) {
        case 1:
            category = "Categories : " + selected[v-1].innerHTML
            document.getElementById('Drop-head').innerHTML =  category;
            break;
        case 2:
            category = "Categories : " + selected[v-1].innerHTML
            document.getElementById('Drop-head').innerHTML =  category;
            break;
        case 3:
            category = "Categories : " + selected[v-1].innerHTML
            document.getElementById('Drop-head').innerHTML =  category;
            break;
        case 4:
            category = "Categories : " + selected[v-1].innerHTML
            document.getElementById('Drop-head').innerHTML =  category;
            break;
        case 5:
            category = "Categories : " + selected[v-1].innerHTML
            document.getElementById('Drop-head').innerHTML =  category;
            break;
        case 6:
            category = "Categories : " + selected[v-1].innerHTML
            document.getElementById('Drop-head').innerHTML =  category;
            break;
        
        default:
            break;
    }
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


}