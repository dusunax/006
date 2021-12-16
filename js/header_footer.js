document.addEventListener("DOMContentLoaded", function(){
    let btn_nav=document.querySelector(".icon_nav")
    let header=document.querySelector("header")
    let nav=document.querySelector("nav")
    let h_bot_oTop=document.querySelector('.h_bot').offsetTop;

    btn_nav.addEventListener("click", function(){
        header.classList.toggle('nav_active')
        nav.classList.toggle('active')
    })
    document.addEventListener("scroll", function(){
        s_top=document.querySelector('html').scrollTop;
        if(s_top >= h_bot_oTop){
            header.classList.add('float')
        }
        else {
            header.classList.remove('float')
        }
    })
});