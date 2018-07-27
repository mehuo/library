'use strict';

angular.module('standard').controller('ctrl.sliderbox', function ($scope) {
    
  var startOffset = $('.line')[0].getBoundingClientRect().left;
  var lineWidth = $('.line').width();
  var dom = $('.line');
  var isDrag = false;
  
  dom.click(function(e){
    var pageX = e.pageX;
    var offsetX = 0;
    if(pageX && startOffset && lineWidth){
      offsetX = ((pageX - startOffset) / lineWidth) * 100;
    }
    setBar(offsetX);
  })

  dom.mousedown(function(e){
    isDrag = true;
  })
  $('body').mousemove(function(e){
    if(isDrag){
      var pageX = e.pageX;
      var offsetX = 0;
      if(pageX && startOffset && lineWidth){
        offsetX = ((pageX - startOffset) / lineWidth) * 100;
        if(pageX > startOffset + lineWidth){
          offsetX = 100;
        }else if(pageX < startOffset){
          offsetX = 0;
        }
      }
      setBar(offsetX);
    }
  })
  $('body').mouseup(function(e){
    isDrag = false;
  })

  //设置实际的长度
  function setBar(offsetX){
    $('.line .inline').css({
      width : offsetX.toFixed(2) +'%'
    })
    $('.line .box').css({
      left : offsetX.toFixed(2) +'%'
    })
    $('.line .box').html('<div class="msg">'+offsetX.toFixed(2)+'%</div>')
  }
});
