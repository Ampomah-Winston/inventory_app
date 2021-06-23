$(document).ready(function(){   
    // $(".fa-caret-square-down").css("transform","rotateZ(90deg)");
    $(".fa-caret-square-down").css("transition","1s");
    let isDashOpen = false; 
    toggle($("#btn_dash"),$("#dash_container"),$(".dash_ico"));
    toggle($(".t1"),$(".tb1"),$(".ico1"));
    toggle($(".t2"),$(".tb2"),$(".ico2"));
    toggle($(".t3"),$(".tb3"),$(".ico3"));
});

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