let logdUserDetails = JSON.parse(sessionStorage.getItem('logdUserDetails'))
     == null ? []:JSON.parse(sessionStorage.getItem('logdUserDetails'))[0];
     
const body = document.body;
const container = body.getElementsByClassName('container')[0];
const sideBar = container.children[0];
const rightBar = container.children[1];

const btn_putData = sideBar.lastElementChild.children["putData"];
const btn_clrData = sideBar.lastElementChild.children["clear"];

const txt_comp_name = document.getElementById('txt_comp_name')
const txt_access_num = document.getElementById('txt_access_num')
const txt_location = document.getElementById('txt_location')
const txt_desc = document.getElementById('txt_desc')

const tableBody = document.getElementsByTagName('table')[0].children[1];

/*---------------------------------------------------------------*/

let allActions = () =>{
    btn_clrData.addEventListener('click',()=>{
       txt_comp_name.value = ""
       txt_access_num.value = ""
       txt_location.value = ""
       txt_desc.value = ""
    });
    btn_putData.addEventListener('click',()=>{
        let row = document.createElement('tr');
            row.className = 'tr-step-in'  
            // row.setAttribute('onClick','removeRow(this)')          
            row.innerHTML = `
            <td>${txt_comp_name.value}</td>
            <td>${txt_access_num.value}</td>
            <td>${txt_location.value}</td>
            <td>${txt_desc.value}</td>
            <td class="row-delete-btn" style="color: white;" onClick=removeRow(this)> 
                <i class="far fa-window-close"></i> 
            </td>
            <td class="row-view-btn" style="color: white;" onClick=viewRow(this)> 
                <i class="far fa-eye"></i> 
            </td>
         `
         tableBody.appendChild(row)     
         checkUser(txt_comp_name.value,txt_access_num.value,txt_location.value,txt_desc.value)     
    })
}

let removeRow = (row) =>{
    row.parentElement.classList.add('tr-step-out')
    row.parentElement.classList.remove('tr-step-in')
    remeRow(row.parentElement,tableBody);
    row.setAttribute('style','pointer-events:none;')
    console.log(row.parentElement);   
    console.dir(row)
}

function remeRow(row,body){
    $("tbody").animate({
        opacity: 0.1,
        opacity:1
        }, {
        duration: 1200,
        complete: function(){
            row.style.pointer-event 
            body.deleteRow(row.rowIndex-1)
        }
    });
}

checkUser = (comp_name,access_num,location,desc)=>{   
   let companiesData = localStorage.getItem('companiesData') === null ? [] :  JSON.parse(localStorage.getItem('users'));
    if(comp_name.trim().length >0 && access_num.trim().length >0 
            && location.trim().length >0 && desc.trim().length >0){
        outData = {
            'company':comp_name,
            'access_num':access_num,
            'location':location,
            'desc':desc,
            'owner':logdUserDetails.uname
        }               
        companiesData.push(outData);
        localStorage.setItem('companiesData',JSON.stringify(companiesData))       
        // return outData;
     }else {
         return
     }    
}

allActions();