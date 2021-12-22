// 공용
let s_top=document.querySelector('html').scrollTop;
let win_h=window.innerHeight;
let s_bot=s_top+win_h;
let win_size=window.innerWidth;
window.addEventListener("resize", function(){
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
let pos_2d_chk=false;
function pos_2d(el, direction, speed){
    if(!pos_2d_chk){
        let pos_direct;
        direction=="right"||direction=="left"?pos_direct="translateX":pos_direct="translateY"
        direction=="right"||direction=="up"?direction=1:direction=-1
        let tmp_pos=100 * direction;
        pos_2d_chk=true;
        let pos_2d_interval=setInterval(() => {
            tmp_pos+=(-1 * direction);
            el.style.transform = pos_direct+"("+tmp_pos+"%)"
            if(Math.abs(tmp_pos) == 0){
                clearInterval(pos_2d_interval)
                pos_x_chk=false;
            }
        }, speed);
    }
};