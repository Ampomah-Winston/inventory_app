let logdUserDetails = JSON.parse(sessionStorage.getItem('logdUserDetails'))[0];//cos its only 1
let body = document.body;
let nav = body.firstElementChild;
let container = body.getElementsByClassName('container')[0];

userDetal = nav.lastElementChild;
userDetal.innerHTML = logdUserDetails.uname;
userDetal.previousElementSibling.src = '../images/tree.jpg';

$('#btnCreate').click(()=>{
    alert('create')
    location.assign('../html/createCompany.html')
});

$('#btnViewData').click(()=>{
    alert('create')
});