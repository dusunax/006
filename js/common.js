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
    s_top=document.querySelector('html').scrollTop;
    s_bot=s_top+win_h;
});

// 함수
// 함수 재활용하기
let pos_y_chk=false;
function pos_y(el, updown, speed){
    // el css=> transition=opacity 0 to 1
    // 중복 실행 막았고, updown에는 string 'up', 'down'
    if(!pos_y_chk){
        updown=="up"?updown=1:updown=-1
        let tmp_pos_y=100 * updown;
        pos_y_chk=true;
        el.style.opacity = "1"
        let pos_y_interval=setInterval(() => {
            el.style.transform = "translateY("+tmp_pos_y+"%)"
            tmp_pos_y+=-1 * updown;
            if(tmp_pos_y == 0){
                clearInterval(pos_y_interval)
                pos_y_chk=false;
            }
        }, speed);
    }
};