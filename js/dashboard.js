let act_main = document.getElementById('screen-body')
let act_main_left = act_main.firstElementChild;
let act_main_right = act_main.lastElementChild;

let app_form = act_main_right.firstElementChild;
//***************** form acts *******************//
let input_name = app_form.children[0].firstElementChild
let input_qty = app_form.children[1].firstElementChild
let input_cate = app_form.children[2].firstElementChild
let input_desc = app_form.children[3].firstElementChild

    //*************** buttons **************//
let input_buttons = app_form.lastElementChild;
let btn_clear = input_buttons.firstElementChild;
let btn_add = input_buttons.lastElementChild;

//******************* summary *************** */
let lbl_tot_stock = document.getElementById('lbl_tot_stock');
let lbl_tot_categ = document.getElementById('lbl_tot_categ');
let lbl_items_stocked = document.getElementById('lbl_items_stocked');

$(document).ready(function(){  
   $(".fa-caret-square-down").css("transition","1s");
    toggle($("#btn_dash"),$("#dash_container"),$(".dash_ico"));
    toggle($(".t1"),$(".tb1"),$(".ico1"));
    toggle($(".t2"),$(".tb2"),$(".ico2"));
    toggle($(".t3"),$(".tb3"),$(".ico3"));
});

//**************** Left-side buttons *****************//
let btn_startAdd  = document.getElementById('start_add')
let btn_loadData = btn_startAdd.nextElementSibling;

let backdrop = document.getElementById('backdrop');
let tag_ops = document.getElementById('tag_ops');

let screen_body =  document.getElementById('screen-body');
let screen_banners = screen_body.firstElementChild.firstElementChild.children;


let toggle =(btn,body,icon)=>{
  btn.click(()=>{
    body.slideToggle("2000");
    icon.css("transition","1s");
    if( icon[0].style.transform == 'rotateZ(90deg)'){
      icon.css("transform","rotateZ(0deg)");
    }else{
       icon.css("transform","rotateZ(90deg)");
    }
  });
}

let deleteObject=(delBtn)=>{
  let target = delBtn.parentElement.parentElement.parentElement.parentElement
  target.style.display = 'none'
}

let flipCard=(viewBtn)=>{
  console.log('hi')
  let flipCard_inner = viewBtn.parentElement.parentElement.parentElement.parentElement
  let flipCard = flipCard_inner.parentElement
  flipCard_inner.style.transform = 'rotateY(180deg)'
}

let flipCard_back=(viewBtn)=>{
  let flipCard_inner = viewBtn.parentElement.parentElement.parentElement
  console.dir(flipCard_inner)
  flipCard_inner.style.transform = 'rotateY(-0deg)'
}

let updateCard = (object)=>{
  let parent = object.parentElement.parentElement.parentElement.parentElement;
}

let colorPicker = (int) =>{
  return int == 0 ? '#fc8263' : (int > 1 && int < 21) ? '#faa23d' : '#63fc70';
}

let single_row = (data) =>{  
  let item = document.createElement('div')
  item.className = 'flip-card' 
  item.innerHTML =  `
  <div class="flip-card-inner">
      <div class="flip-card-front" >
        <div class="containment"style="background-color: ${colorPicker(data.qty)};margin-top:2px;">
            <h3>${data.name}</h3>
            <i style="position: absolute; top: 30%; left: 15px; font-size:10px;" class="fas fa-balance-scale"></i>
            <p style="font-size: 3em; margin-top: 12%;">
              ${data.qty}
            </p>
            <div class="ico_rims" style="margin-top: 5%;">
                 <i class="fas fa-exchange-alt" onclick="flipCard(this)"></i>
                <i class="fas fa-pen-alt update-icon" onclick="updateCard(this)"></i>
            </div>                               
            <i class="far fa-trash-alt dlt-icon" onclick="deleteObject(this)"></i>                                
                                        
        </div>
      </div>
      <div class="flip-card-back">
        <div class="containment">
            <h3>Extra</h3>
            <div class="">
                <p style=
                "padding: 1px;
                 margin: 0%; 
                 width: 40%;
                background-color: darkgrey;
                font-size: 10px;">Description</p>
                 <div style="
                    background-color: #15384f; 
                    font-size: 12px; height: 10vh;" class="desc_body">
                    ${data.desc}
                 </div>
            </div>  
            <div class="">
                <p style=
                "padding: 1px;
                 margin: 0%; 
                 width: 40%;
                background-color: darkgrey;
                font-size: 10px;">Catetory</p>
                 <div style="
                    background-color: #15384f; 
                    font-size: 12px; height: 5vh;" class="desc_body">
                    ${data.categ}
                 </div>
            </div>                               
            <i class="far fa-eye view-icon" onclick="flipCard_back(this)" aria-hidden="true"></i>                                
        </div>
      </div>
    </div>
    </div>  `
  return item;
}

/**************** activity ops *****************/
//*************** clear function ********************/
let clear=(...inputs)=>{
  for(input of inputs){
      input.value = ''
  }
}
//*************** get Input function ********************/
let getInputs=(access_key,...inputs)=>{
  let dataProp = {};
  if(!(inputs.length < 4)){
      dataProp = {
      id: (Math.floor(Math.random()*9999999)+0)+'',
      name:inputs[0].value,
      qty:inputs[1].value,
      categ:inputs[2].value,
      desc:inputs[3].value,
      access_key:access_key
      }
      return dataProp
  }else{
      alert('Some fields are empty')
  }     
}
//*************** DDL ****************/
let saveData = (dataObj) =>{
  let avbleData = localStorage.getItem('mashedInvenData') == null? [] : 
      JSON.parse( localStorage.getItem('mashedInvenData'));
  avbleData.push(dataObj);
  localStorage.setItem('mashedInvenData',JSON.stringify(avbleData))
}

let updateData = (id,dataObj) =>{
  let avbleData = localStorage.getItem('mashedInvenData') == null? [] : 
      JSON.parse( localStorage.getItem('mashedInvenData'));
  avbleData.push(dataObj);
  localStorage.setItem('mashedInvenData',JSON.stringify(avbleData))
}
//**************** end of DDL ******************/

//****************** DML **********************/
let getAllData =(access_key)=>{
  let avbleData = localStorage.getItem('mashedInvenData') == null? [] : JSON.parse( localStorage.getItem('mashedInvenData'));
  let outData = [];
  if(!(avbleData).length <= 0){
     avbleData.map((value,index)=>{
         if(value.access_key == access_key){
           let  dataProp = {
               id:value.id,
              name:value.name,
              qty:value.qty,
              categ:value.categ,
              desc:value.desc,
              access_key:value.access_key
              }
              outData.push(dataProp)
         }
     })
  }
  return outData;
}

let getSingleData =(id,access_key)=>{
  let avbleData = localStorage.getItem('mashedInvenData') == null? [] : JSON.parse( localStorage.getItem('mashedInvenData'));
  let outData = {};
  if(!(avbleData).length <= 0){
     avbleData.map((value,index)=>{
         if(value.access_key == access_key){
           if(value.id == id){
              let  dataProp = {
                  id:value.id,
                  name:value.name,
                  qty:value.qty,
                  categ:value.categ,
                  desc:value.desc,
                  access_key:value.access_key
                  }
              outData=dataProp
           }
         }
     })
  }
  return outData;
}
//************** end of DML */

//************** statics logic ************************/
let getNumberOfCat = (access_key)=>{
  let avbleData = localStorage.getItem('mashedInvenData') == null? [] : JSON.parse( localStorage.getItem('mashedInvenData'));
  let catSet = new Set();
  avbleData.map((value,index)=>{
    catSet.add(value.categ)
  })
  return catSet.size
}

let getNumberOf_items = (access_key)=>{
  let avbleData = localStorage.getItem('mashedInvenData') == null? [] : JSON.parse( localStorage.getItem('mashedInvenData'));
  return avbleData.length
}

let getNumber_out_of_stock = (access_key)=>{
  let avbleData = localStorage.getItem('mashedInvenData') == null? [] : JSON.parse( localStorage.getItem('mashedInvenData'));
  let count = 0;
  avbleData.map((value,index)=>{
    if(value.qty == '0'){
      count ++;
    }
  })
  return count
}

let getNumberOf_StockedItems = (access_key)=>{
  let avbleData = localStorage.getItem('mashedInvenData') == null? [] : JSON.parse( localStorage.getItem('mashedInvenData'));
  let count = 0;
  avbleData.map((value,index)=>{
    if(value.qty > 0){
      count ++;
    }
  })
  return count
}

//************** end of statics logic ************************/
let deleteSingleData = (id,access_key) =>{
  let avbleData = localStorage.getItem('mashedInvenData') == null? [] : JSON.parse( localStorage.getItem('mashedInvenData'));
  console.log(avbleData.length)
  if(!(avbleData).length <= 0){
     avbleData.map((value,index)=>{
         if(value.access_key == access_key){
           if(value.id == id){
              avbleData.pop(Number(index));
           }
         }
     })
  }
  localStorage.setItem('mashedInvenData',JSON.stringify(avbleData))
  return access_key;
}

let truncateData = (access_key) =>{
  let avbleData = localStorage.getItem('mashedInvenData') == null? [] : JSON.parse( localStorage.getItem('mashedInvenData'));
  if(!(avbleData).length <= 0){
      avbleData.map((value,index)=>{
          if(value.access_key === access_key){
            console.log(value.id,index,value);
          }
      })
   }
  //  localStorage.setItem('mashedInvenData',JSON.stringify(avbleData))
}

/***************** end of activity *************/

btn_clear.addEventListener('click',()=>{
  clear(input_name,input_qty,input_cate,input_desc);
})

let load_multiple_data = ()=>{
  let target = document.getElementById('table-wrapper')
  target.innerHTML = '';
  for(item of getAllData('#233-009-21')){
     target.append(single_row(item))    
  }
}

btn_add.addEventListener('click',()=>{
  if(btn_add.innerText == 'CREATE'){
    saveData(getInputs('#233-009-21',input_name,input_qty,input_cate,input_desc))
  }else{
    updateData
  }  
  lbl_tot_categ.innerText = getNumberOfCat('#233-009-21');
  lbl_tot_stock.innerText = getNumberOf_items('#233-009-21');
  lbl_items_stocked.innerText = getNumberOf_StockedItems('#233-009-21');
  load_multiple_data();
})

let open_addForm = (which)=>{  
  if(which == 0){
    screen_banners[0].innerText = 'CREATE'
    screen_banners[1].innerText = 'ITEM'
    btn_add.innerText = "CREATE"
  }else{
    screen_banners[0].innerText = 'UPDATE'
    screen_banners[1].innerText = 'ITEM'
    btn_add.innerText = "UPDATE"
  }
  backdrop.classList.add('visible')
  tag_ops.style.display = 'block'
}

btn_startAdd.addEventListener('click',()=>{
  open_addForm(0)
})

btn_loadData.addEventListener('click',()=>{
  load_multiple_data();
})

backdrop.addEventListener('click',()=>{
 backdrop.classList.remove('visible')
 tag_ops.style.display = 'none'
})

lbl_tot_categ.innerText = getNumberOfCat('#233-009-21');
lbl_tot_stock.innerText = getNumberOf_items('#233-009-21');
lbl_items_stocked.innerText = getNumberOf_StockedItems('#233-009-21');
load_multiple_data();