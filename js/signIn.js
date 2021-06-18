let uname=   document.getElementById('uname');
let fname=  '';
let pword=  document.getElementById('pword');
let outData = {}; 

document.getElementById('clear').addEventListener('click',()=>{
    uname.value = '';   
    pword.value = '';    
});

checkUser = (uname,pword)=>{
    let usersData = []; 
    usersData = localStorage.getItem('users') === null ? [] : 
        JSON.parse(localStorage.getItem('users'));
        for(user of usersData){
            console.log(user.uname + " <> -- <> " + user.pword)
            if(uname == user.uname && pword == user.pword){
               {}
            }else {
                
            }
            
        }
}