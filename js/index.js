document.addEventListener("DOMContentLoaded", function(){
    // 섹션전체!
    const sec=document.querySelectorAll(".sec")
    let sec_o_top=sections_init("o_top");
    let sec_o_bot=sections_init("o_bot");
    let s_limit_boundery=100
    let sec_chk_in=sections_init("chk_in");
    // let sections_limit=sections_init("s_limit"); 보류
    function sections_init(getThis){
        let result=[];
        for(let i=0; i<sec.length; i++){
            if(getThis=="o_top"){
                result.push(sec[i].offsetTop)
            }
            else if(getThis=="o_bot"){
                result.push(sec_o_top[i] + sec[i].clientHeight)
            }
            else if(getThis=="s_limit"){
                result.push(
                    `s_top >= sec_o_top[${i}] - ${s_limit_boundery} && s_bot < sec_o_bot[${i}]`
                ) // eval()?
            }
            else if(getThis=="chk_in"){
                result.push(false)
            }
        }
        return result;
    }
    let sec_on_chk=false;
    section_on();
    function section_on(){
        if(!sec_on_chk){
            sec_on_chk=true;
            setTimeout(() => {
                sec_on_chk=false;
            }, 500);
            for(let i=0; i<sec.length; i++){
                if(i!==3){
                    if(s_top >= sec_o_top[i] - (win_h/5) && s_bot <= sec_o_bot[i] + (win_h/5)){
                        if(!sec[i].classList.contains("on")){
                            setTimeout(() => {
                                sec[i].classList.add("on")
                            }, 100);
                        }
                    }
                    else {
                        if(sec[i].classList.contains("on")){  
                            setTimeout(() => {
                                sec[i].classList.remove("on")
                            }, 100);
                        }
                    }
                }
            }
        }
    };
    // 확인용: console.log(sec_o_top, sec_o_bot)
    // 섹션1, sec[0], video(재생종료 후 fadeOut)
    let sec1_video=document.querySelector(".sec1_video")
    document.querySelector(".sec1").style.opacity="1";
    sec1_video_start();
    function sec1_video_start(){
        setTimeout(function(){
            document.querySelector(".sec1 .grad").style.opacity="0";
        }, 2550)
        sec1_video.addEventListener('loadedmetadata', function(){
            let sec1_duration=(sec1_video.duration * 1000).toFixed()
            setTimeout(function(){
                sec1_video.style.opacity="0";
                document.querySelector(".sec1_video_bg").style.opacity="0";
            }, Number(sec1_duration)+500)
        });
    }
    // 섹션2, sec[1]
    let fr_row=document.querySelectorAll(".title_fr.row");
    let sec2_w_x=new Array;
    let sec2_text_oTop=new Array;
    for(let i=0; i<fr_row.length; i++){
        sec2_w_x.push(0)
        sec2_text_oTop.push(sec_o_top[1] + ( fr_row[0].clientHeight * i ))
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
    // 섹션3, sec[2], canvas 캔버스
    let sec3_scroll;
    let tmptmp_sec3;
    const sec3_canvas=document.querySelector("#sec3_canvas");
    const context = sec3_canvas.getContext('2d');
    const sec3_imgs = [];
    // 00000 000 console.log(canvas.getContext)
    if(!sec3_canvas.getContext){
        console.log("캔버스 기능을 제공하지 않는 브라우저입니다.")
    }
    let canvas_height=sec3_canvas.parentElement.clientHeight;
    let canvas_offset=(win_h/2)-(canvas_height/2); //중간
    let sec3_image_count=717;
    let progress;
    let current_frame;
    set_img();
    loop();
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
        if(win_size > 1000){
            progress = (s_top - sec_o_top[2]) / (sec[2].clientHeight + canvas_height - win_h - (win_h/2));
        }
        else {
            progress = (s_top - sec_o_top[2]) / (sec[2].clientHeight + canvas_height - win_h);
        }
        // console.log("s_top: "+s_top, "\no_top: "+Number(sec_o_top[2]), "\n0부터 785: "+(s_top - sec_o_top[2] + 50),"\n진행:"+ progress)
        if(progress < 0) progress = 0;
        else if(progress > 1) progress = 1;
        current_frame = Math.round((sec3_image_count - 1) * progress)
        context.drawImage(sec3_imgs[current_frame], 0, 0, 1200, 1200);
    }
    // 네비 섹션이동
    let nav_li=document.querySelectorAll(".nav_section ul li");
    let nav_title=document.querySelectorAll(".nav_title");
    for(let i=0; i<nav_li.length; i++){
        nav_title[i].innerText=nav_li[i].children[1].innerText;
        nav_li[i].addEventListener('mouseenter', function(){
            nav_li[i].children[0].classList.toggle('active')
        })
        nav_li[i].addEventListener('mouseleave', function(){
            nav_li[i].children[0].classList.toggle('active')
        })
        nav_li[i].addEventListener('click', function(){
            event.preventDefault();
            let tmp_y;
            let tmp_el;
            for(let j=0; j<nav_title.length; j++){
                if(nav_title[j].innerText == nav_li[i].children[1].innerText){
                    tmp_el=nav_title[j]
                    while(!tmp_el.classList.contains("sec")){
                        tmp_el=tmp_el.parentElement;
                    }
                    tmp_y=tmp_el.getBoundingClientRect().top + s_top;
                    setTimeout(() => {
                        document.querySelector('html').scrollTop = tmp_y - 50
                    }, 200);
                }
            }
        })
        
    }
    // 섹션4, sec[3], positions, 섹션 파트 나눔
    let sec4_c_name=document.querySelectorAll(".sec4 .color_name")
    let sec4_c_box=document.querySelectorAll(".sec4 .color_box")
    let sec4_img=document.querySelectorAll(".sec4 img")
    let sec4_heights=document.querySelectorAll(".sec4 > div")[0].clientHeight
    // init
    sec4_c_name[0].style.opacity="1"
    sec4_img[0].style.opacity="1"
    let sec4_stone=[]
    let color_placed=null;
    for(let i=0; i<sec4_c_name.length; i++){
        sec4_stone.push((win_h) * i)
    }
    let sec4_title_top;
    sec4_title_init(0, win_size)
    function sec4_title_init(index, window){
        window>768?sec4_title_top=160:sec4_title_top=140
        window<360?sec4_title_top=130:""
        sec4_c_box[index].children[2].style.top=sec4_title_top+"px"
    }
    // 섹션5, sec[4], 함수 만들기
    let sec5_chk_in=false;
    let sec5_el_move=document.querySelector(".sec5 .right img")
    // 섹션6
    let sec6_bot_img=document.querySelector(".sec6 .img_box .bot")
    // 섹션8, sec[7]
    let sec8_el=document.querySelector(".sec8 .img_box .flip")
    let sec8_el_2=document.querySelector(".sec8 .img_box .water")
    // 섹션9, sec[8]
    let sec9_el=document.querySelector(".sec9 .img_box")
    let sec9_li=document.querySelectorAll(".sec9 li")
    // 섹션10, sec[9]
    let sec10_li=document.querySelectorAll(".sec10 li")
    for(let i=0; i<sec10_li.length; i++){
        sec10_li[i].addEventListener('mouseenter', function(){
            sec10_li[i].children[1].children[0].classList.toggle('active')
        })
        sec10_li[i].addEventListener('mouseleave', function(){
            sec10_li[i].children[1].children[0].classList.toggle('active')
        })
    }
    // 이벤트: 스크롤
    document.addEventListener('scroll', function(){
        win_h=window.innerHeight
        section_on();
        // 네비
        if(s_top >= document.querySelector(".nav_section").offsetTop){
            document.querySelector(".nav_section").classList.add("fixed")
        }
        else {
            document.querySelector(".nav_section").classList.remove("fixed")
        }
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
        // 섹션3, sec[2]
        // sec3_top_point=sec_o_top[2] - 50;
        sec3_scroll=s_top - sec_o_top[2];
        canvas_height=sec3_canvas.parentElement.clientHeight;
        canvas_offset=(win_h/2)-(canvas_height/2); //(doc)50% - (el)50%: top
        loop();
        // (섹션3:on)
        if(s_top + canvas_offset > sec_o_top[2] + 0 && s_bot < sec_o_bot[2] + canvas_offset){
            sec[2].classList.add("on")
            // (섹션3:fixed영역)
            if(s_top + (win_h/2) - (canvas_height / 2) >= canvas_offset){
                sec3_canvas.parentElement.classList.add("fixed")
                sec3_canvas.parentElement.classList.remove("bot")
            }
            if(s_bot > sec_o_bot[2]){
                sec4_title_init(0, win_size)
            }
        }
        else{
            if(sec[2].classList.contains("on")){
                sec[2].classList.remove("on")
                sec3_canvas.parentElement.classList.remove("fixed")
                if(s_bot > sec_o_bot[2]){
                    sec3_canvas.parentElement.classList.add("bot")
                }
            }
        }
        // 섹션4, sec[3]
        sec4_heights=document.querySelectorAll(".sec4 > div")[0].clientHeight
        let sec4_point=(s_top - sec_o_top[3]).toFixed()
        // if(섹션4영역)
        if(s_top >= sec_o_top[3] - 50 && s_bot < sec_o_bot[3] + (sec4_heights / 2.5)){
            sec[3].classList.add("on")
            sec[3].classList.remove("bot")
            //컬러박스 체크
            for(let i=sec4_stone.length; i>=0; i--){
                if(sec4_point > (sec4_heights * i) - 200){
                    if(color_placed!==i){
                        color_placed=i;
                        for(let j=0; j<sec4_stone.length; j++){
                            if(i!==j){
                                sec4_c_box[j].children[2].style.top="-500%" // == .color_name
                                setTimeout(() => {
                                    sec4_c_box[j].classList.remove("on")
                                }, 500);
                            }
                        }
                        sec4_c_box[i].classList.add("on")
                        sec4_title_init(i, win_size)
                        // 컬러박스 바꿈
                        break;
                    }
                    break;
                }
            }
        }
        else {
            sec[3].classList.remove("on")
            color_placed=null
            if(s_bot >= sec_o_top[3] + ((sec4_heights * sec4_c_name.length)) + 200){
                sec[3].classList.add("bot")
                color_placed=sec4_c_name.length-1
                sec4_c_box[color_placed].classList.add("on")
            }
            else {
                sec[3].classList.remove("bot")
            }
        }
        // 섹션5, sec[4]
        if(sec[4].classList.contains("on")){
            if(!sec5_chk_in){
                sec5_chk_in=true;
                if(win_size<=768){
                    sec5_el_move.style.transform="translateY(0)"
                    sec5_el_move.style.opacity="1"
                }
                else if(win_size<=960){
                    pos_y(sec5_el_move, "down", 2)
                }
                else {
                    pos_y(sec5_el_move, "up", 1)
                }
            }
        }
        else {
            if(sec5_chk_in){
                sec5_chk_in=false;
            }
        }
        // 섹션6, sec[5]
        let sec6_point=(s_top - sec_o_top[5] + 0).toFixed()
        if(sec6_point > 0 && sec6_point < 100){
            sec6_bot_img.style.opacity="0.5"+((sec6_point / 200))
        }
        if(sec[5].classList.contains("on")){
            if(!sec_chk_in[5]){
                document.querySelector(".noclock").style.opacity="0"
                sec_chk_in[5]=true;
            }
            if(s_top > sec_o_top[5] - 100){
                setTimeout(() => {
                    sec[5].classList.add("active")
                }, 100);
                setTimeout(() => {
                    document.querySelector(".sec6 .txt").classList.add("active")
                }, 800);
            }
        }
        else {
            if(sec_chk_in[5]){
                setTimeout(() => {
                    sec[5].classList.remove("active")
                }, 200);
                document.querySelector(".sec6 .txt").classList.remove("active")
                if(s_bot > sec_o_bot[5] - (win_h/5)){
                    sec[5].classList.add("bot")
                    document.querySelector(".noclock").style.opacity="1"
                }
                else{
                    sec[5].classList.remove("bot")
                }
                sec_chk_in[5]=false;
            }
            if(s_top < sec_o_top[5]){
                document.querySelector(".sec6 .txt").classList.remove("active")
                document.querySelector(".noclock").style.opacity="1"
            }
        }
        // 섹션7, sec[6]
        if(sec[6].classList.contains("on")){
            if(!sec_chk_in[6]){
                sec_chk_in[6]=true;
                pos_y(document.querySelector(".sec7 .bg"), "up", .5)
                sec[6].classList.add("active")
            }
        }
        else {
            sec[6].classList.remove("active")
            sec_chk_in[6]=false;
        }
        // 섹션8, sec[7]
        let sec8_point=(s_top - sec_o_top[7] + 200).toFixed()
        if(sec[7].classList.contains("on")){
            if(!sec_chk_in[7]){
                sec_chk_in[7]=true;
            }
        }
        else {
            if(sec_chk_in){
                sec_chk_in[7]=false;
            }
        }
        if(sec8_point > 0 && sec8_point < 500){
            sec8_el.style.transform="translateX(calc(-50%)) rotate("+(-25 - (sec8_point / 100))+"deg)"
            sec8_el_2.style.transform="translateY(-"+sec8_point/2+"px)"
            sec8_el_2.style.opacity=(1-(sec8_point / 1000));
        }
        // 섹션9, sec[8], 갤럭시제품
        let sec9_point=(s_top - sec_o_top[8] + 200).toFixed()
        if(sec[8].classList.contains("on")){
            if(!sec_chk_in[8]){
                sec_chk_in[8]=true;
            }
            else {
                sec_chk_in[8]=false;
            }
        }
        if(sec9_point > 0 && sec9_point < 500){
            sec9_el.style.transform="translateY("+(sec9_point / 50)+"%)"
            for(let i=0; i<sec9_el.children.length; i++){
                if(i==1 || i==3){
                    sec9_point= -1 * sec9_point
                }
                sec9_el.children[i].children[0].style.transform="rotate("+((sec9_point / 100))+"deg)"
                document.querySelector(".sec9 .bg").style.opacity=0.5+(sec9_point / 1000);
            }
            for(let i=0; i<sec9_li.length; i++){
                if(sec9_point>(120*(i))){
                    sec9_li[i].classList.add("event")
                }
                else {
                    sec9_li[i].classList.remove("event")
                }
            }
        }
        else {
            for(let i=0; i<sec9_li.length; i++){
                sec9_li[i].classList.remove("event")
            }
        }
        // 섹션10, sec[9]
        if(sec[9].classList.contains("on")){
            if(!sec_chk_in[9]){
                sec_chk_in[9]=true;
            }
            else {
                sec_chk_in[9]=false;
            }
        }
    })
    // 스크롤이벤트 끝
    window.addEventListener("resize", function(){
        sec_o_top=sections_init("o_top");
        sec_o_bot=sections_init("o_bot");
        sec_chk_in=sections_init("chk_in");
        loop()
        sec4_title_init(color_placed, win_size)
    });
});
