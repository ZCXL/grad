$(function(){
    var halfH = document.body.scrollHeight / 2;
    var oneThirdH = document.body.scrollHeight / 3;
    var H = document.body.scrollHeight;
    var W = document.body.scrollWidth;
    console.log(H);
    //设定初始变化值
    var translate=1000000;
    //文档添加鼠标滚轮事件，demo没写兼容，不支持火狐



    /*
    document.addEventListener("mousewheel",function(e){  //缩放
        var distance=50 //每次滚轮缩放变化值
        if(e.wheelDelta>0){      //方向
           clearInterval(play)
           translate+=distance    //perspective值变化              
           $("div.pic").css({
                    transform:'perspective('+translate+'px) rotateX('+toX+'deg)  rotateY('+toY+'deg)'
           });  //css3变化
             
        }else if(e.wheelDelta<0){
            clearInterval(play)
           translate-=distance                
           $("div.pic").css({
                    transform:'perspective('+translate+'px) rotateX('+toX+'deg)  rotateY('+toY+'deg)'
           });
        }
    })*/

    //var video1 = document.getElementById("video1");
    //var video2 = document.getElementById("video2");
   /*
   $("body").css({
        'background-image' : "url(static/img/bkground2.jpg)",
    'filter':"progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale')",
   '-moz-background-size': "cover",
   'background-size': "cover"
    })
    */
    
    console.log($("#video1").children()[0]);
    //$("#container_show1").append($("#video1").children()[0])

    var containerShowHeight = H/5*2;
    var containerShowWidth = containerShowHeight *8/5;
    $("div.container_show").css({
        top: H*2/7 + 'px',
        'height': containerShowHeight + 'px',
        'width': containerShowWidth + 'px',
        'background-size': "100% 100%"
        //'background-size' : imgWidth*multiple+"px "+imgHieght*multiple+"px"
    })

    $("#container_show1").css({
        left: W/70 + 'px',
        //'background-image' : "url(" + $("#video1").children()[0].src + ")",
    })
    $("#container_show2").css({
        left: W - containerShowWidth - W/100 + 'px',
        //'background-image' : "url(" + $("#video2").children()[0].src + ")",
    })


    $("#list1").css({
        position: 'absolute',
        top: H*2/7 + 'px',
        left: W/27 + W/200 + containerShowWidth + 'px'
    })
    $("#list2").css({
        position: 'absolute',
        top: H*2/7 + 'px',
        left:W - containerShowWidth-containerShowWidth/4+ 'px'
    })

    $("#button_container").css({     //中间的按钮位置
        position: 'absolute',
        top: H*2/7 + 'px',
        //height: containerShowHeight / 10 + 'px',
        //width: containerShowWidth / 10 + 'px',
        left: (W-containerShowWidth*2-W/13)/2+containerShowWidth +  'px'
        //'background-size' : imgWidth*multiple+"px "+imgHieght*multiple+"px"
    })
    
    $("#button_container").children().css({
        height: containerShowHeight / 8 + 'px',
        width: containerShowWidth / 4 + 'px',
        'background-size': "100% 100%"
    })
    $(".state.button").css({
        margin: H/100 +'px 0',
        width: containerShowWidth / 8 + 'px'
    })
    
    $(".green.button").css({
        margin: H/250 +'px 0 ' + H/30 + 'px 0'
    })
    $(".magenta.button").css({
        margin: H/10 +'px 0 ' + H/100 + 'px 0'
    })


    $("#video2").css({
        top: H/4*3 - H/100 + 'px'
    });
    var all_vedio = [$("#video1"), $("#video2")];
    //console.log($("#video1").children().length);
    //var img1 = $("#video1").children().length;
    var imgL = 10000; //[$("#video1").children().length, $("#video2").children().length];// $("div.pic img").size();  //img数量
//            alert(imgL);
    var deg =  360 / imgL;  //[360 / imgL[0], 360 / imgL[1]];   //角度
    var toY = [0, 0], toX = [0, 0];
    var xN = [0, 0], yN = [0, 0];
    var play = null;
/*
    $("div.pic img").each(function(i){
        $(this).css({
            'transform':'rotateY('+i*deg+'deg) translateZ(350px)'  //css设置，分别设定变化角度，同样的z轴变化，形成一个圆
        });
        $(this).attr("ondragstart","return false");
        //浏览器禁止拖拽功能
    });
*/
    var picHeight = H/7;

    console.log(picHeight);
    //console.log(translate/picHeight*5/8);
    var temp = picHeight/3.7;
    console.log(temp);
    all_vedio.forEach(function(vedio, N) {
        //console.log(vedio.children());
        vedio.children().each(function(i) {
            $(this).css({
                'height': picHeight + 'px',
                'width': picHeight *8/5 + 'px',
                'left': picHeight *8/5 + 'px',
                'transform':'rotateY('+i*deg+'deg) translateZ(' + imgL*temp + 'px)'  
                //css设置，分别设定变化角度，同样的z轴变化，形成一个圆
            });
            $(this).attr("ondragstart","return false");
            //浏览器禁止拖拽功能
        });
    });

    //console.log($("#video1").children()[0]);

    var containerHeight = $("#container_show2")[0].clientHeight;
    var containerTop = $("#container_show2")[0].offsetTop;
    var N = 0;
    $(document).mousedown(function(event) {
        var e = event || window.event;
        //var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
        var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
        //var cx = e.pageX || e.clientX + scrollX;
        var cy = e.pageY || e.clientY + scrollY;
        //alert(cy + ' ' + window.screen.availHeight);
        //if (cy >= halfH - 100 && cy <= halfH + 100) break; 
        //alert(cy + ' ' + halfH);
        N = 0;
        if (cy > halfH) N = 1;         
        vedio = all_vedio[N];
    
        /*console.log("shu biao an xia le !");*/
        var x_ = event.clientX;
        var y_ = event.clientY;
        clearInterval(play);
        //console.log(this);

        //console.log(containerTop);
        //console.log(cy);

        if (cy < containerTop - 10 || cy > containerTop + containerHeight + 10)
        $(document).bind("mousemove",(function(ev){
          /* console.log('yi dong !');*/
            var x = ev.clientX;
            var y = ev.clientY;
            xN[N] = x - x_;
            yN[N] = y - y_;
            toY[N] += xN[N] * 0.0002;
            //toX[N] -= yN[N] * 0.1;

            //$("body").append('<div style="width:5px;height:5px;background:#f00;position:absolute;top:"+y+"px;left:"+x+"px;"></div>')/*打点计数器*/
            vedio.css({
               transform:'perspective('+translate+'px) rotateY('+toY[N]+'deg)' //rotateX('+ -5 +'deg)  
            });
            x_ = ev.clientX;
            y_ = ev.clientY;
        }));
    }).mouseup(function(){
            //console.log("remove");  
            $(this).unbind("mousemove");
            var play = setInterval(function(){
                xN[N] *= 0.0008;
                yN[N] *= 0.0008;
                if ( Math.abs(xN[N]) < 0.001 && Math.abs(yN[N]) < 0.001 ) //Math绝对值
                    clearInterval(play);
                toY[N] += xN[N]*0.2;
                toX[N] -= yN[N]*0.1;
                vedio.css({
                    transform:'perspective('+translate+'px) rotateY('+toY[N]+'deg)' //rotateX('+ -5 +'deg)  
                });
            },30);
            //return play
    });     

    $(".state.button").hide()
    //$($(".state.button")[0]).hide()
    //$($(".state.button")[2]).hide()
});