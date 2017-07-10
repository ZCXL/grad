$(function(){

var random_color = function() {
  return '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).substr(-6); 
}

function sel_state_button(num) {
  if (num == 1) return 0;
  return 2;
}

//no show
function add_list(num, rectID) {
  console.log(rectID)
  console.log('here   '+$("#"+rectID)[0].personID)
  $("#list"+num).append("<li class=\"rounded-list li\"><a href=\"javascript:void(0)\">" + 
    "人物" + $("#"+rectID)[0].personID + "</a><span class=\"tick\"></span></li>")
  lastlist = $("#list"+num+" li:last-Child")
  //lastlist.append("<span class=\"tick\"></span>")
  lastlist.children('span').hide()
  //console.log($('li span'))
  lastlist.css({
    width: W / 24,
    height: W / 90
  })
  lastlist.attr('rectID', rectID)
  
  $('#'+rectID).prop('li',lastlist)
  //console.log($('#'+rectID).prop('li'))
  lastlist.prop('num', num)
    lastlist.hover(
      function(){
        //console.log($(this).attr("left"));
        $('#'+$(this).attr("rectID")).addClass("retcHighlight");
      },
      function(){
        $('#'+$(this).attr("rectID")).removeClass("retcHighlight");
      }
     )
    lastlist.click(function(){
      console.log($(this).attr("rectID"))
      $('#'+$(this).attr("rectID")).addClass("retcSelLight");
      var n = $(this).prop("num")
      var recID = selected.rSel
      if (n == 1) recID = selected.lSel;
      if (recID == $(this).attr("rectID")) return;
      $('#'+recID).removeClass("retcSelLight");
      if (n == 1) selected.lSel = $(this).attr("rectID");
      else selected.rSel = $(this).attr("rectID");

      $(this).children('span').show()
      $('#'+$(this).attr("rectID")).children('span').eq(1).show()
      $($('#'+recID).prop('li')).children('span').hide()
      $('#'+recID).children('span').eq(1).hide()
      /*
      var cancelButton
      if (n == 1) cancelButton = $(".state.button")[1];
      else cancelButton = $(".state.button")[3];
      $(cancelButton).addClass("state button active");
      */
    $(".green.button").removeClass("green button active").addClass("green button")
    $(".magenta.button").removeClass("magenta button active").addClass("magenta button")

      if (selected.lSel !='' && selected.rSel !='' && 
          getID(selected.rSel).personID != getID(selected.lSel).personID) {
        $(".green.button").addClass("green button active")
      }
      if (selected.lSel !='' && selected.rSel !='' && 
          getID(selected.rSel).personID == getID(selected.lSel).personID) {
        $(".magenta.button").addClass("magenta button active")
      }

      

    })

}

function in_container_show(startX, startY) {
  for (var i = 1; i <= 2; ++i) {
    var id = "#container_show" + i;
    var x = $(id).offset().left,
        y = $(id).offset().top,
        height = $(id).height(),
        width = $(id).width();
    //console.log(x + ' ' + y)
    //console.log(startX + ' ' + startY)
    if (x <= startX && startX <= x + width && y <= startY && startY <= y + height) return i;
  }
  return 0;
}

function rect_position(num, rectID) {
  var id = "#container_show" + num;
  console.log(id)
  var x = $(id).offsetLeft,
       y = $(id).offsetTop,
       height = $(id).height(),
       width = $(id).width();

  var divRec = $('#'+rectID)
  console.log()

  return {'left':(divRec.offset().left-x)/width, 'width':divRec.width()/width,
          'top':(divRec.offset().top-y)/height, 'height':divRec.height()/height}
}

function add_rect_event(divRec, num) {
    $(divRec).hover(
      function(){
        //console.log($(this).attr("left"));
        $(this).addClass("retcHighlight");
        $(this).children('span').eq(0).show()
      },
      function(){
        $(this).removeClass("retcHighlight");
        $(this).children('span').eq(0).hide()
      }
     )

    //$(divRec).unbind('click').click(function(){
     //   alert("this")
     //})
     $(divRec).resizable({ handles: 'n, e, s, w, ne, se, sw, nw', autoHide: true });
     $('#'+divRec.id).resize(function(){
        resi_id = $(this).prop('id')
     })  
      $(window).resize(function() {
          rtime = new Date();
          resizing = true
          if (timeout === false) {
              timeout = true;
              setTimeout(resizeend, delta);
          }
      });

    $(divRec).click(function(){
      $(divRec).prop('li').click()
    })

    $(divRec).append("<span class=\"close\"></span>")
    $(divRec).append("<span class=\"tick\"></span>")
    $(divRec).append("<span class=\"number\">"+divRec.personID+"</span>")
    $(divRec).children('span').eq(1).css({
      'top': 0,
      'background': '#eee'
    })
    $(divRec).children('span').eq(2).css({
      'color': divRec.style.borderColor
    })
    //console.log($(divRec).prop('li'))
    //console.log($("#list"+num).children().index($(divRec).prop('li')))
    $(divRec).children('span').hide()
    $(divRec).children('span').eq(2).show()
    $(divRec).children('span').eq(0).click(function(){
      $(divRec).prop('li').click()

      var options = {
       content: "是否确认删除人物", //提示内容
       cancel_btn_click: function (e){ //取消按钮点击事件
        $.myconfirm("getDialog").mydialog("hide");
       },
       confirm_btn_click: function (e){ //确认按钮点击事件
          $.myconfirm("getDialog").mydialog("hide");
          $($(".state.button")[sel_state_button(num)+1]).click()
       }
      };
      $.myconfirm(options)
      //
    })
    //$(divRec).children('span').eq(1).click(function(){
      //$(divRec).prop('li').click()
    //})
}

function draw_rect(num, rect) {
  var id = "#container_show" + num;
  var x = $(id).offset().left,
       y = $(id).offset().top,
       height = $(id).height(),
      width = $(id).width();

     var divRec = document.createElement("div");
     index+=1;
     divRec.id = 'w' + index;
     divRec.num = num;
     divRec.personID = rect.personID
     divRec.className = "retc";
     divRec.style.marginLeft = x + width*rect.left + 'px';
     divRec.style.marginTop = y + height*rect.top +"px";//retcTop;
     divRec.style.width = width*rect.width + 'px';
     divRec.style.height = height*rect.height +"px";
     //console.log(divRec.style);
     divRec.style.borderColor = random_color();
     $(".retc").each(function(){
      if ($(this).prop('personID') == rect.personID) {
        divRec.style.borderColor = $(this)[0].style.borderColor
        return;
      }
     })
     
    document.body.appendChild(divRec);
    add_list(num, divRec.id)
    console.log(rect)

    add_rect_event(divRec,num)

  return 0;
}

function resizeend() {
    if (new Date() - rtime < delta) {
        setTimeout(resizeend, delta);
    } else {
        timeout = false;
        resizing = false
        console.log('ttttt')
        var request = rect_position(container_click_num, resi_id)
        request['video'] = container_click_num
        request['frameNum'] = $($(".state.button")[sel_state_button(container_click_num)]).prop('frame')
        request['personID'] = $('#'+resi_id).prop('personID')
        console.log(request)
 
        $.post('/update_position/',request, function(ret){
            console.log('start Update')
            console.log(ret)
            //alert("已添加人物")
        })


    }               
}

//-----------------------------------init-----------------------------------------
var rtime;
var timeout = false;
var delta = 200;
var resizing = false;
var container_click_num
var resi_id
//var a = in_container_show(1, 2);
document.body.lastChild.num = 0;
//console.log(document.body.lastChild.num)
console.log("df0")

var W = document.body.scrollWidth;
 var wId = "w";
 var index = 0;
 var startX = 0, startY = 0;
 var flag = {down: false, moving:false};
 var retcLeft = "0px", retcTop = "0px", retcHeight = "0px", retcWidth = "0px";
 var selected = {cnt:0, drawn: new Array(false,false,false), lSel:"", rSel:""};


//console.log($($("#video1").children()[0]))
for (var k = 1; k <= 2; ++k) {
  $("#video"+k).children().unbind('click').bind('click',{num:k}, init)
}

function init(evt){
  $(".green.button").removeClass("green button active").addClass("green button")
  $(".magenta.button").removeClass("magenta button active").addClass("magenta button")

  var th = evt.currentTarget
  var imgsrc = th.src;
  var num = evt.data.num;
  console.log(num)
  frame = $("#video"+num).children().index(th);
  //console.log(imgsrc);
  $("#container_show"+num).css({
      'background-image' : "url(" + imgsrc + ")"
  })

  $(".retc").each(function(){
    if ($(this).prop('num') == num) $(this).remove()
  })
  $("#list"+num).children().remove();

  var qButton_insert = $(".state.button")[sel_state_button(num)]
  $(qButton_insert).prop('frame', frame)
  $(qButton_insert).removeClass("state button active").addClass("state button")
  var qButton_del = $(".state.button")[sel_state_button(num)+1]
  $(qButton_del).prop('frame', frame)
  $(qButton_del).removeClass("state button active").addClass("state button")
  //console.log('num  ' + index)

  $.post('/person_in_frame/',{'video':num,'frameNum':frame}, function(ret){
      console.log('startPOst')
      console.log(ret.length)
      for (var i = 0; i < ret.length; ++i) {
        draw_rect(num, ret[i])
      }
  })

  if (num == 1) selected.lSel = '';
  else selected.rSel = '';
}


  $($("#video1").children()[0]).click()
  $($("#video2").children()[0]).click()




//-----------------------------------mouse-----------------------------------------


 $(document).mousedown(function(e){
  try{
   var evt = window.event || e;
   var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
   var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
   startX = evt.clientX + scrollLeft;
   startY = evt.clientY + scrollTop;  

   console.log("start");
   var num = in_container_show(startX, startY);
   container_click_num = num
   console.log(num);
   if (num == 0) return;
   if (selected.drawn[num]) {
    //alert("已框选人物,请先处理已框选的人物")
    return;
   }
   index++;
   var divRec = document.createElement("div");
   divRec.id = wId + index;
   divRec.num = num;
   divRec.className = "divRect";
   divRec.style.marginLeft = startX + "px";
   divRec.style.marginTop = startY + "px";
   divRec.style.borderColor = random_color();
   document.body.appendChild(divRec);
//console.log(document.body.lastChild)
    flag['down'] = true
   $(document).bind("mousemove", function(e){ 
      if (resizing) return;
        flag['moving'] = true
       var evt = window.event || e;
       var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
       var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
       retcLeft = (startX - evt.clientX - scrollLeft > 0 ? evt.clientX + scrollLeft : startX) + "px";
       retcTop = (startY - evt.clientY - scrollTop > 0 ? evt.clientY + scrollTop : startY) + "px";
       retcHeight = Math.abs(startY - evt.clientY - scrollTop) + "px";
       retcWidth = Math.abs(startX - evt.clientX - scrollLeft) + "px";
       getID(wId + index).style.marginLeft = retcLeft;
       getID(wId + index).style.marginTop = retcTop;
       getID(wId + index).style.width = retcWidth;
       getID(wId + index).style.height = retcHeight;
     }); 
  }catch(e){
  //alert(e);
  }
  //console.log(flag);
 });
 
 $(document).mouseup(function(e){
    if (flag['down']) {
      try{
        var evt = window.event || e;
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
        //console.log(retcTop);
        var ID = wId + index;
        var num = $("#"+ID)[0].num;
        var color = $("#"+ID)[0].style.borderColor;
        //console.log(num)
        $("#"+ID).remove();
        if (!flag['moving']) {
          flag['down'] = false
          return
        }
       //document.body.removeChild(ID);
       //console.log(document.body.lastChild.num)
       //flag = false;
       //$(document).unbind("mousemove");
       //if (selected.cnt == 2) return;
       
       var divRec = document.createElement("div");
       divRec.id = ID;
       divRec.num = num;
       divRec.className = "retc";
       //divRec.personID = 0;
       divRec.style.marginLeft = retcLeft;
       divRec.style.marginTop = (startY - evt.clientY - scrollTop > 0 ? evt.clientY + scrollTop : startY) +"px";//retcTop;
       //console.log("hhh   "+divRec.style.marginTop)
       divRec.style.width = retcWidth;
       divRec.style.height = retcHeight;
       //console.log(divRec.style);
       divRec.style.borderColor = color;

       if (parseInt(retcWidth)*parseInt(retcHeight)<100) {
         flag['down'] = false
         flag['moving'] = false
         $(document).unbind("mousemove");
         return;
       }

       //console.log(divRec.style.marginTop);
       //selected.cnt += 1;
       selected.drawn[num] = true
       document.body.appendChild(divRec);

       var qButton = $(".state.button")[sel_state_button(num)]
       $(qButton).addClass("state button active");
       $(qButton).attr('rectID', ID)
       
       
       //console.log($(".state.button"));
       //if (startX - evt.clientX - scrollLeft > 0 ? evt.clientX + scrollLeft : startX > halfW) {
        $($(".state.button")[2*(num-1)]).click()
        
        //alert("123312")
        console.log(selected.cnt);

      }catch(e){
       console.log(e);
      }
    }
   flag['down'] = false
   flag['moving'] = false
  $(document).unbind("mousemove");

 });





//-----------------------------------State Button-----------------------------------------

$(".state.button").unbind('click').click(function(){

  var video = $(".state.button").index(this)
  if (video == 1 || video == 3) {
    if (video == 3) video =2;

    $(this).removeClass("state button active").addClass("state button")
    
    var sel_rec = '#'+selected.lSel;
    if (video == 2) sel_rec = '#'+selected.rSel;
    if (sel_rec == '#') {
        sele = '左'
        if (video == 2) sele = '右' 
        $.myalert({
          content: "请先在"+sele+'边的列表中选择人物',
          confirm_btn_click: function (e){  //确认按钮点击事件
            $.myalert("getDialog").mydialog("hide");
          }
        });
        return
    }

    var request = {'video': video, 'frameNum': $(this).prop('frame')}
    request['personID'] = $(sel_rec).prop('personID')

    console.log(request)

    $.post('/del_person/',request, function(ret){
        console.log('startPOst3')
        console.log(ret)
        if (video == 1) selected.lSel = '';
        else selected.rSel = '';
        $('.rounded-list.li').each(function(){
          console.log($(this).text())
          if ($(this).attr('rectID') == $(sel_rec).prop('id')) $(this).remove()
        })
        $(sel_rec).remove()
        $.myalert({
          content: "已删除人物",
          confirm_btn_click: function (e){  //确认按钮点击事件
            $.myalert("getDialog").mydialog("hide");
          }
        });
    })

  }
  else {

    if (video == 0) video = 1
      if (selected.drawn[video]==false) {
        $.myalert({
          content: "请先框选人物",
          confirm_btn_click: function (e){  //确认按钮点击事件
            $.myalert("getDialog").mydialog("hide");
          }
        });
        return;
      }
    var rectID = $(this).attr('rectID')
    console.log(rectID)
    var qButton_insert = this;

    var options = {
     //width: width+"px",  //默认为页面宽度的80%
     //title: "提示",    //标题默认为提示
     content: "是否添加框选人物，若确定添加请点击确定，否则请点击取消重新框选", //提示内容
     //cancel_btn_title: "取消",  //取消按钮的文本
     //confirm_btn_title: "确认", //确认按钮的文本
     cancel_btn_click: function (e){ //取消按钮点击事件
      $.myconfirm("getDialog").mydialog("hide");
      $('#'+rectID).remove()
      $(qButton_insert).removeClass("state button active").addClass("state button")
       selected.drawn[video] = false; 
     },
     confirm_btn_click: function (e){ //确认按钮点击事件
        $.myconfirm("getDialog").mydialog("hide");
        //alert("confirm");
        //console.log(rectID)
        var request = rect_position(video, rectID)
        request['video'] = video
        request['frameNum'] = $(qButton_insert).prop('frame')

        //console.log(request)
        //console.log(typeof request.vi)
        $.post('/insert_person/',request, function(ret){
            console.log('startPOst2')
            console.log(ret)
            console.log(rectID)
            $('#'+rectID).prop('personID', ret.personID)

            add_list(video, rectID)
            add_rect_event(getID(rectID))
            //alert("已添加人物")
        })
        $(qButton_insert).removeClass("state button active").addClass("state button")
         selected.drawn[video] = false; 
     }

    };


    $.myconfirm(options)
    

  }

    //
    //alert("添加成功")

})


//-----------------------------------button-----------------------------------------

 $(".green.button").unbind('click').click(function(){
    //alert("dffsd")
    //if (selected.cnt != 2) return;
    //selected.cnt = 0;
    if (selected.lSel == '' || selected.rSel =='') {
        $.myalert({
          content: "请先在两边的列表中选择人物",
          confirm_btn_click: function (e){  //确认按钮点击事件
            $.myalert("getDialog").mydialog("hide");
          }
        });
      return;
    }
    var personID = new Array($('#'+selected.lSel).prop('personID'),
                             $('#'+selected.rSel).prop('personID'));
    if (personID[0] == personID[1]) {
        $.myalert({
          content: "两个人物的ID已经相同",
          confirm_btn_click: function (e){  //确认按钮点击事件
            $.myalert("getDialog").mydialog("hide");
          }
        });
        return
    }
    var request = {'personID1': personID[0], 'personID2': personID[1]}
    request['frameNum1'] = $($(".state.button")[0]).prop('frame')
    request['frameNum2'] = $($(".state.button")[2]).prop('frame')
    //alert(request['frameNum1'] + ' '+request['frameNum2'])
    $.post('/union_person/',request, function(ret){
        console.log('startPOST union')
        console.log(ret)
        //$('#'+rectID).prop('personID', ret.personID)
        frame_changed = 0
        if (ret.deleted == 1) frame_changed = 2;
        frame_changed = $($('.state.button')[frame_changed]).prop('frame')
        console.log("frame  "+ frame_changed)
        //console.log('#video'+(del_num+1))
        //console.log($('#video'+del_num+1).children().eq(frame_changed))
        $('#video'+(ret.deleted+1)).children().eq(frame_changed).click()
        //$($("#video1").children()[0]).click()
        
        $.myalert({
          content: "已将人物"+personID[ret.deleted]+"所在集合合并到人物"+personID[ret.deleted^1]+"所在集合中" ,
          confirm_btn_click: function (e){  //确认按钮点击事件
            $.myalert("getDialog").mydialog("hide");
          }
        });
    })

    //$(".state.button").removeClass("state button active").addClass("state button");
    
    //$("#list1 li:last-Child").attr("left", selected.left);
    //$("#list1 li:last-Child").attr("right", selected.right);
    
    //console.log($("#list1 li:last-Child"))

 });

 $(".magenta.button").unbind('click').click(function(){
  if (selected.lSel == '' || selected.rSel == '') {
    $.myalert({
      content: "请先在"+'列表中选择人物',
      confirm_btn_click: function (e){  //确认按钮点击事件
        $.myalert("getDialog").mydialog("hide");
      }
    });
    return;
  }
  var personID = new Array($('#'+selected.lSel).prop('personID'),
                           $('#'+selected.rSel).prop('personID'));
  if (personID[0] != personID[1]) {
      $.myalert({
        content: "两个人物还未关联",
        confirm_btn_click: function (e){  //确认按钮点击事件
          $.myalert("getDialog").mydialog("hide");
        }
      });
      return
  }
    var request = {}
    request['frameNum1'] = $($(".state.button")[0]).prop('frame')
    request['frameNum2'] = $($(".state.button")[2]).prop('frame')
    request['personID1'] = personID[0]
    request['personID2'] = personID[1]

        $.post('/breakdown_person/',request, function(ret){
            console.log('startPOST break')
            console.log(ret)
            $('#video2').children().eq(request['frameNum2']).click()
            $.myalert({
              content: "已将取消人物间关联，新ID为"+ret.newID ,
              confirm_btn_click: function (e){  //确认按钮点击事件
                $.myalert("getDialog").mydialog("hide");
              }
            });

            /*
            $('#'+rectID).prop('personID', ret.newID)
            $("#list"+video+" li").each(function(){
              if ($(this).attr('rectID') == rectID) {
                $(this).children().text('人物'+ret.newID)
              }
            })

            $('#'+rectID).css('borderColor', random_color())
            */

        })
  //var divRec = $(document.body.lastChild);
 });

 

 var getID = function(id){
  return document.getElementById(id);
 }

});