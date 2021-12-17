document.addEventListener("DOMContentLoaded", function(){
    // 섹션1
    let sec1_video=document.querySelector(".sec1_video")
    document.querySelector(".sec1").style.opacity="1";
    sec1_video_start();
    function sec1_video_start(){
        setTimeout(function(){
            document.querySelector(".sec1 .grad").style.opacity="0";
            //
        }, 2550)
        sec1_video.addEventListener('loadedmetadata', function(){
            let sec1_duration=(sec1_video.duration * 1000).toFixed()
            setTimeout(function(){
                sec1_video.style.opacity="0";
                document.querySelector(".sec1_video_bg").style.opacity="0";
            }, Number(sec1_duration)+500)
        });
    }
    // 섹션2
    let sec2_o_top=document.querySelector(".sec2").offsetTop;
    let fr_row=document.querySelectorAll(".title_fr.row");
    let bg_row=document.querySelectorAll(".title_bg.row");
    let sec2_w_x=new Array;
    let sec2_text_oTop=new Array;
    for(let i=0; i<fr_row.length; i++){
        sec2_w_x.push(0)
        sec2_text_oTop.push(sec2_o_top + ( fr_row[0].clientHeight * i ))
    }
    let interv_chk=false;
    function sec2_W_X(row){
        interv_chk=true;
        fr_row[row].style.opacity = "1"
        let interval=setInterval(() => {
            fr_row[row].style.width = sec2_w_x[row]+"%"
            sec2_w_x[row]+=1;
            if(sec2_w_x[row] > 100){
                clearInterval(interval)
                interv_chk=false;
            }
        }, 5);
    };
    // 섹션3
    let sec3_o_top=document.querySelector(".sec3").offsetTop;
    let sec3_scroll;
    // Canvas: 이미지 스크롤링
    const sec3=document.querySelector(".sec3");
    const sec3_canvas=document.querySelector("#sec3_canvas");
    const context = sec3_canvas.getContext('2d');
    const sec3_imgs = [];
    // 00000 000console.log(canvas.getContext)
    if(!sec3_canvas.getContext){
        console.log("캔버스 기능을 제공하지 않는 브라우저입니다.")
    }
    let sec3_image_count=717;
    let progress;
    let current_frame;
    function set_img() {
        for(let i=0; i<sec3_image_count; i++) {
            let img_el = new Image();
            let tmp_count=i.toString();
            while(tmp_count.length < 3){
                tmp_count="0"+tmp_count
            }
            img_el.src="img/360/BSM-F711_360_4S/00000"+tmp_count+".jpg";
            sec3_imgs.push(img_el)
        }
    }
    function loop() {
        progress = (s_top - sec3_o_top) / (sec3.clientHeight - win_h + 400);
        // console.log("s_top: "+s_top, "\no_top: "+Number(sec3_o_top), "\n0부터 785: "+(s_top - sec3_o_top + 50),"\n진행:"+ progress)
        if(progress < 0) progress = 0;
        else if(progress > 1) progress = 1;
        current_frame = Math.round((sec3_image_count - 1) * progress)
        context.drawImage(sec3_imgs[current_frame], 0, 0, 1200, 1200);
    }
    set_img();
    loop();
    // 네비 섹션이동
    let nav_li=document.querySelectorAll(".nav_section ul li");
    for(let i=0; i<nav_li.length; i++){
        nav_li[i].addEventListener('mouseenter', function(){
            nav_li[i].children[0].classList.toggle('active')
        })
        nav_li[i].addEventListener('mouseleave', function(){
            nav_li[i].children[0].classList.toggle('active')
        })
    }
    // 섹션4
    const sec4=document.querySelector(".sec4")
    let sec4_o_top=document.querySelector(".sec4").offsetTop;
    let sec4_bot;
    let sec4_c_name=document.querySelectorAll(".sec4 .color_name")
    let sec4_c_box=document.querySelectorAll(".sec4 .color_box")
    let sec4_img=document.querySelectorAll(".sec4 img")
    // init
    sec4_c_name[0].style.opacity="1"
    sec4_img[0].style.opacity="1"
    let sec4_stone=[]
    let color_placed=null;
    for(let i=0; i<sec4_c_name.length; i++){
        sec4_stone.push((win_h) * i)
    }
    // 이벤트: 스크롤
    document.addEventListener('scroll', function(){
        win_h=window.innerHeight
        // 섹션2
        for(let i=0; i<fr_row.length; i++){
            if(s_top > sec2_text_oTop[i] - (win_h / 2) && s_top < sec2_text_oTop[i] - (win_h / 2) + 500){
                if(sec2_w_x[i]<100 && interv_chk==false){
                    sec2_W_X(i);
                }
            }
            else {
                if(sec2_w_x[i]>=100){
                    fr_row[i].style.opacity="0"
                    sec2_w_x[i]=0
                }
            }
        }
        // 섹션3
        if(s_top + 50 < sec3_o_top){
            sec3_canvas.parentElement.style.top="50px"
            sec4_c_box[0].classList.remove("on")
        }
        else if(s_bot > sec3_o_top + sec3.clientHeight+500){
            sec3_canvas.parentElement.style.opacity="0"
            sec4_c_box[0].classList.add("on")
        }
        else if(s_bot >= sec3_o_top && s_bot <= sec3_o_top + sec3.clientHeight+200){
            sec3_scroll=s_top - sec3_o_top
            if(s_top + 50 >= sec3_o_top){
                sec3_canvas.parentElement.style.top=(sec3_scroll + 100)+"px"
            }
            sec3_canvas.parentElement.style.opacity="1"
        }
        loop();
        // 섹션4
        sec4_bot=sec4_o_top + (win_h * sec4_c_name.length) + 300
        if(s_top >= sec4_o_top && s_bot < sec4_bot){
            sec4.classList.add("on")
            sec4.classList.remove("bot")
            //컬러박스 체크
            for(let i=sec4_stone.length; i>=0; i--){
                if(s_top - sec4_o_top > sec4_stone[i] - 150){
                    if(color_placed!==i){
                        color_placed=i;
                        for(let j=0; j<sec4_stone.length; j++){
                            if(i!==j){
                                sec4_c_box[j].children[2].style.top="-500%" // .color_name
                                setTimeout(() => {
                                    sec4_c_box[j].classList.remove("on")
                                }, 500);
                            }
                        }
                        sec4_c_box[i].classList.add("on")
                        sec4_c_box[i].children[2].style.top="190px"
                        // 컬러박스 바꿈
                        console.log(sec4_c_box[i].children[2])
                        break;
                    }
                    break;
                }
            }
        }
        else {
            sec4.classList.remove("on")
            color_placed=null
            if(s_bot >= sec4_o_top + (win_h * sec4_c_name.length)){
                sec4.classList.add("bot")
                color_placed=sec4_c_name.length-1
            }
            else {
                sec4.classList.remove("bot")
            }
        }
    })
});
