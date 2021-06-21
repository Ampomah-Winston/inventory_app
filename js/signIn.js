let input_uname =   document.getElementById('uname');
let fname=  '';
let input_pword =  document.getElementById('pword');
let outData = {}; 

document.getElementById('clear').addEventListener('click',()=>{
    uname.value = '';   
    pword.value = '';    
});

checkUser = (uname,pword)=>{
    let usersData = []; 
    let personalData = [];
    usersData = localStorage.getItem('users') === null ? [] : 
        JSON.parse(localStorage.getItem('users'));
        for(user of usersData){
            console.log(user.uname + " <> -- <> " + user.pword)
            if(uname == user.uname && pword == user.pword){
               outData = {
                   'uname':uname,
                   'pword':pword,
                   'fname':user.fname
               }               
               personalData.push(outData);
               sessionStorage.setItem('logdUserDetails',JSON.stringify(personalData))
               console.log('session stored')
               location.assign('../html/appManager.html')
               return outData;
            }else {
                return
            }
            
        }
}

document.getElementById('sign').addEventListener('click',()=>{
    alert('hello')
    checkUser(input_uname.value.trim(),input_pword.value.trim())
});
