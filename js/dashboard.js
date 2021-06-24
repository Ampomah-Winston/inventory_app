$(document).ready(function(){  
   $(".fa-caret-square-down").css("transition","1s");
    toggle($("#btn_dash"),$("#dash_container"),$(".dash_ico"));
    toggle($(".t1"),$(".tb1"),$(".ico1"));
    toggle($(".t2"),$(".tb2"),$(".ico2"));
    toggle($(".t3"),$(".tb3"),$(".ico3"));
    // deleteObject($('dlt-icon'),$('dlt-icon').parent())
    backdrop.classList.add('visible')
});

let btn_startAdd  = document.getElementById('start_add')
let backdrop = document.getElementById('backdrop');

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
            <p style="font-size: 3em; margin-top: 12%;">
              ${data.qty}
            </p>
            <div class="ico_rims" style="margin-top: 5%;">
                 <i class="fas fa-exchange-alt" onclick="flipCard(this)"></i>
                <i class="fas fa-pen-alt update-icon"></i>
            </div>                               
            <i class="far fa-trash-alt dlt-icon" onclick="deleteObject(this)"></i>                                
            <span style="position: absolute; top: 15%; left: 15px;"><i class="fas fa-balance-scale"></i></span>                                
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
                    Heloo Winston is here
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
                    Heloo Winston is here
                 </div>
            </div>                               
            <i class="far fa-eye view-icon" onclick="flipCard_back(this)" aria-hidden="true"></i>                                
        </div>
      </div>
    </div>
    </div> 

  `

  return item;
}

let appItem = () =>{
  let target = document.getElementById('table-wrapper')
   target.append(single_row({
     name:'Wrist-watch',
     qty:(Math.floor(Math.random()*40)+0)+''
    }));
}

btn_startAdd.addEventListener('click',()=>{
  appItem();
  // backdrop.classList.add('visible')
})