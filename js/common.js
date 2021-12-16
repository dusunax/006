// 공용
let win_size=window.innerWidth;
document.addEventListener("resize", function(){
    win_size=window.innerWidth;
});
let s_top=document.querySelector('html').scrollTop;
document.addEventListener("scroll", function(){
    s_top=document.querySelector('html').scrollTop;
});