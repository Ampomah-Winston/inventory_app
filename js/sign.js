let uname;
let fname;
let pword;
let file;

  uname=   document.getElementById('uname');
  fname=  document.getElementById('fname');
  pword=  document.getElementById('pword');
  file=  document.getElementById('file');

document.getElementById('clear').addEventListener('click',()=>{
    uname.value = '';
    fname.value = '';
    pword.value = '';
    file.value = '';
});

document.getElementById('sign').addEventListener('click',()=>{
  let before_length = 0 
  let after_length = 0;

  let users = {
       'uname': uname.value,
       'fname': fname.value,
       'pword':pword.value,
       'file':file.value
   }

   let usersData = [];    
   usersData = localStorage.getItem('users') === null ? [] : JSON.parse(localStorage.getItem('users'));
   usersData = localStorage.getItem('users') === null ? [] : JSON.parse(localStorage.getItem('users'));
  
   usersData.push(users);
   localStorage.setItem('users',JSON.stringify(usersData))
  //  console.log(usersData)
   
});