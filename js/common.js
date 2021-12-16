// 공용
let s_top=document.querySelector('html').scrollTop;
let win_h=window.innerHeight;
let s_bot=s_top+win_h;
let win_size=window.innerWidth;
document.addEventListener("resize", function(){
    s_top=s_top=document.querySelector('html').scrollTop;
    win_h=window.innerHeight;
    s_bot=s_top+win_h;
    win_size=window.innerWidth;
});
document.addEventListener('scroll', function(){
    s_top=s_top=document.querySelector('html').scrollTop;
    s_bot=s_top+win_h;
});