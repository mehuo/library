(function($){


  $.fyn={
    /*
    params：
      str:需要转化的字符串
      type:操作类型
    return : 转化后的字符串
    */
    strCase:function (str,type){
      switch(type){
        case 1:
          return str.toLowerCase().replace(/\b([\w|']+)\b/g, function(word) {  
              return word.replace(word.charAt(0), word.charAt(0).toUpperCase());  
          });  
          break;

      }
        
      return str;
    },

    
    
  }

  /*
  全局替换
    params
      s1:准备替换
      s2:要替换成
  */
  String.prototype.replaceAll  = function(s1,s2){    
      return this.replace(new RegExp(s1,"gm"),s2);    
  }



})(jQuery)