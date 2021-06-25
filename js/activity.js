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
//*************** clear function ********************/
let clear=(...inputs)=>{
    for(input of inputs){
        input.value = ''
    }
}
//*************** get Input function ********************/

let getInput=(access_key,...inputs)=>{
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

let saveData = (dataObj) =>{
    let avbleData = localStorage.getItem('mashedInvenData') == null? [] : 
        JSON.parse( localStorage.getItem('mashedInvenData'));
    avbleData.push(dataObj);
    localStorage.setItem('mashedInvenData',JSON.stringify(avbleData))
}

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

export {getInput,saveData,getAllData,getSingleData,deleteSingleData}