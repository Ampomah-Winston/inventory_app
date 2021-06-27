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

//**************** current card *******************/
let current_card_data ;
let current_card;

//**************** Left-side buttons *****************//
let btn_startAdd  = document.getElementById('start_add')
let btn_loadData = btn_startAdd.nextElementSibling;
let btn_truncate = btn_loadData.nextElementSibling;

let backdrop = document.getElementById('backdrop');
let tag_ops = document.getElementById('tag_ops');

let screen_body =  document.getElementById('screen-body');
let screen_banners = screen_body.firstElementChild.firstElementChild.children;

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


let load_multiple_data = ()=>{
  let target = document.getElementById('table-wrapper')
  target.innerHTML = '';
  for(item of getAllData('#233-009-21')){
     target.append(single_row(item))    
  }
  lbl_tot_categ.innerText = getNumberOfCat('#233-009-21');
lbl_tot_stock.innerText = getNumberOf_items('#233-009-21');
lbl_items_stocked.innerText = getNumberOf_StockedItems('#233-009-21');
}

//************** end of statics logic ************************/
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

let updateCard = (card)=>{//will be called by the update ui (which is a pen icone)
  open_addForm(1);
  current_card = card;
  let parent = card.parentElement.parentElement.parentElement.parentElement;
  let flip_front_containmt = parent.firstElementChild.firstElementChild;
  let flip_back_containmt = parent.lastElementChild.firstElementChild;
  
  let item_id=flip_front_containmt.children['data_id'];
  let item_name =flip_front_containmt.children['data_name'];
  let item_qty=flip_front_containmt.children['data_qty'];
  
  let item_cate = flip_back_containmt.children[1].lastElementChild
  let item_desc= flip_back_containmt.children[2].lastElementChild
  // console.log(item_desc)
  current_card_data = {
    id:item_id.innerText.trim(),
    name:item_name.innerText.trim(),
    qty:item_qty.innerText.trim(),
    categ:item_cate.innerText.trim(),
    desc:item_desc.innerText.trim(),
    access_key:'#233-009-21'
  }  
  
  input_name.value = current_card_data.name;
  input_qty.value =current_card_data.qty;
  input_cate = current_card_data.categ
  input_desc = current_card_data.desc
    console.log(current_card_data)
}

let deleteObject=(delBtn)=>{
  let target = delBtn.parentElement.parentElement.parentElement.parentElement
  target.style.display = 'none'
  deleteSingleData(delBtn);
  console.log(delBtn);
}

let colorPicker = (int) =>{
  return int == 0 ? 'rgb(228, 41, 97);' : (int >= 1 && int < 21) ? 'rgb(228, 141, 41);' : '#63fc70';
}

let single_row = (data) =>{  
  let item = document.createElement('div')
  item.className = 'flip-card' 
  item.innerHTML =  `
  <div class="flip-card-inner">
      <div class="flip-card-front" >
        <div class="containment"style="background-color: ${colorPicker(data.qty)};margin-top:2px;">
        <span id="data_id" style="display:none"> ${data.id} </span>    
        <h3 id="data_name">${data.name}</h3>
            <i style="position: absolute; top: 30%; left: 15px; font-size:10px;" class="fas fa-balance-scale"></i>
            <p id="data_qty" style="font-size: 3em; margin-top: 12%;">
              ${data.qty}
            </p>
            <div class="ico_rims" style="margin-top: 5%;">
                 <i class="fas fa-exchange-alt" onclick="flipCard(this)"></i>
                <i class="fas fa-pen-alt update-icon" onclick="updateCard(this)"></i>
            </div>                               
            <i class="far fa-trash-alt dlt-icon" style="color:black;" onclick="deleteObject(this)"></i> 
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
                 <div id="data_desc" style="
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
                 <div id="data_categ" style="
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

let updateData = () =>{//will be called by the universal ops button
  //********** get current input ********/
   input_name = app_form.children[0].firstElementChild
 input_qty = app_form.children[1].firstElementChild
 input_cate = app_form.children[2].firstElementChild
 input_desc = app_form.children[3].firstElementChild

  let parent = current_card.parentElement.parentElement.parentElement.parentElement;
  let flip_front_containmt = parent.firstElementChild.firstElementChild;
  
  let item_id=flip_front_containmt.children['data_id'];
  
  current_card_data = {
    id:item_id.innerText.trim(),
    name:input_name.value.trim(),
    qty:input_qty.value.trim(),
    categ:input_cate.value.trim(),
    desc:input_desc.value.trim(),
    access_key:'#233-009-21'
  }  
  console.log(current_card_data.access_key)
  
  input_name.value = current_card_data.name;
  input_qty.value =current_card_data.qty;
  input_cate = current_card_data.categ
  input_desc = current_card_data.desc

  let avbleData = localStorage.getItem('mashedInvenData') == null? [] : 
  JSON.parse( localStorage.getItem('mashedInvenData'));
  for(item of avbleData){
    if(current_card_data.id.trim() === item.id){
       avbleData.find((value,index)=>{       
         if(value.id.trim() == current_card_data.id.trim()){  
           console.log(avbleData[index] = current_card_data);
         }else{
           console.log('no update')
         }
       })
    }
  }
  localStorage.setItem('mashedInvenData',JSON.stringify(avbleData))
  load_multiple_data();
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

let deleteSingleData = (card) =>{
  let parent = card.parentElement.parentElement.parentElement.parentElement;
  let flip_front_containmt = parent.firstElementChild.firstElementChild;
  console.log(flip_front_containmt.children[0].children['data_id'])  

  let item_id=flip_front_containmt.children[0].children['data_id'];  
  current_card_data = {
    id:item_id.innerText.trim(),
    access_key:'#233-009-21'
  }  

  let avbleData = localStorage.getItem('mashedInvenData') == null? [] : 
  JSON.parse( localStorage.getItem('mashedInvenData'));
  for(item of avbleData){
    if(current_card_data.id.trim() === item.id){
       avbleData.find((value,index)=>{       
         if(value.id.trim() == current_card_data.id.trim()){  
           avbleData.pop(index);
         }else{
           console.log('no update')
         }
       })
    }
  }
  localStorage.setItem('mashedInvenData',JSON.stringify(avbleData))
  load_multiple_data();  
}

let truncateData = (access_key) =>{
  let avbleData = localStorage.getItem('mashedInvenData') == null? [] : JSON.parse( localStorage.getItem('mashedInvenData'));
  if(!(avbleData).length <= 0){
      avbleData.map((value,index)=>{
          if(value.access_key === access_key){
            avbleData.splice(0,)
          }
      })
   }
   localStorage.setItem('mashedInvenData',JSON.stringify(avbleData))
   lbl_tot_categ.innerText = getNumberOfCat('#233-009-21');
   lbl_tot_stock.innerText = getNumberOf_items('#233-009-21');
   lbl_items_stocked.innerText = getNumberOf_StockedItems('#233-009-21');
   load_multiple_data();
}

/***************** end of activity *************/

btn_clear.addEventListener('click',()=>{
  clear(input_name,input_qty,input_cate,input_desc);
})

btn_add.addEventListener('click',()=>{
  if(btn_add.innerText == 'CREATE'){
    saveData(getInputs('#233-009-21',input_name,input_qty,input_cate,input_desc))
  }else{
    updateData(current_card_data);
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
//************* open form for editing **************/
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

load_multiple_data();