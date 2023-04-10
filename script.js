function drop(){
    document.getElementById('dropcontent').classList.toggle("show")
}
function changecategory(v){
    let cli = document.getElementById('Drop-head').innerText
    selected = document.getElementsByClassName('options')
    switch (v) {
        case 1:
            cli = "Categories : " + selected[v-1].innerHTML
            document.getElementById('Drop-head').innerHTML =  cli;
            break;
        case 2:
            cli = "Categories : " + selected[v-1].innerHTML
            document.getElementById('Drop-head').innerHTML =  cli;
            break;
        case 3:
            cli = "Categories : " + selected[v-1].innerHTML
            document.getElementById('Drop-head').innerHTML =  cli;
            break;
        case 4:
            cli = "Categories : " + selected[v-1].innerHTML
            document.getElementById('Drop-head').innerHTML =  cli;
            break;
        case 5:
            cli = "Categories : " + selected[v-1].innerHTML
            document.getElementById('Drop-head').innerHTML =  cli;
            break;
        case 6:
            cli = "Categories : " + selected[v-1].innerHTML
            document.getElementById('Drop-head').innerHTML =  cli;
            break;
        
        default:
            break;
    }
}