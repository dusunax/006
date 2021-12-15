document.addEventListener("DOMContentLoaded", function(){
    let sec1_video=document.querySelector(".sec1_video")
    document.querySelector(".sec1").style.opacity="1";
    sec1_video_start();
    function sec1_video_start(){
        setTimeout(function(){
            document.querySelector(".sec1 .grad").style.opacity="0";
        }, 2550)
        sec1_video.addEventListener('loadedmetadata', function(){
            let sec1_duration=(sec1_video.duration * 1000).toFixed() + 200
            setTimeout(function(){
                sec1_video.style.opacity="0";
                sec1_video.style.    transition="opacity 1s";
            }, sec1_duration)
        });
    }
    document.addEventListener("scroll", function(){
        // s_top <= header에 있음
    })
});