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
            if(sec2_w_x[row] >= 100){
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
    // 00000 000
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
        progress = (s_top - sec3_o_top + 50) / (sec3.clientHeight - window.innerHeight);
        // progress = pageYOffset / (document.body.offsetHeight - window.innerHeight); 

        console.log("s_top: "+s_top, "\no_top: "+Number(sec3_o_top), "\n0부터 785: "+(s_top - sec3_o_top + 50),"\n진행:"+ progress)
        // console.log(progress < 0, progress > 1)
        if(progress < 0) progress = 0;
        else if(progress > 1) progress = 1;
        current_frame = Math.round((sec3_image_count - 1) * progress)
        context.drawImage(sec3_imgs[current_frame], 0, 0, 200, 200);

        // requestAnimationFrame(loop);
    }
    set_img();
    loop();
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
        }
        else if(s_bot >= sec3_o_top && s_bot <= sec3_o_top + sec3.clientHeight){
            sec3_scroll=s_top - sec3_o_top
            if(s_top + 50 >= sec3_o_top){
                sec3_canvas.parentElement.style.top=(sec3_scroll + 100)+"px"
            }
            // progress = pageYOffset / (document.body.offsetHeight - window.innerHeight); 
        }
        loop();
    })
});