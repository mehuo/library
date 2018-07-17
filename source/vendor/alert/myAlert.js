(function($) {  
    var close_btn = '/source/vendor/alert/mb-del.png';
    $.alerts = {         
        alert: function(message) {   
            $.alerts.alert_show(message, null, 'alert');  
        },  
        icon_alert: function(param) {  
            console.log(param) 
            $.alerts.icon_alert_show(param, 'icon_alert');  
        },  
        confirm: function(message, callback, closeCallback) {  
            $.alerts.confirm_show(message,function(result) {  
                callback && callback(result);  
            },function(){
                closeCallback && closeCallback();
            });  
        },  
            
        icon_alert_show:function(param,type){
            var title = param.title;
            var icon_type = param.icon;
            var msg = param.msg;
            switch (icon_type){
                case 'success':
                    var icon_path = '/img/mb-success.png'
                    break;
                case 'alert':
                    var icon_path = '/img/mb-alert.png'
                    break;
                case 'error':
                    var icon_path = '/img/mb-error.png'
                    break;
                case 'message':
                    var icon_path = '/img/mb-message.png'
                    break;
                case '':
                    var icon_path = ''
                    break;
                default:
                    var icon_path=param.icon
            }
            var _html = "";  
            _html += '<div id="mb_box" class="mb_box"></div><div id="mb_con" class="mb_con" style="min-width:400px">';
            _html += '<div id="alert_close" class="confirm_close"><img src="'+close_btn+'"/></div>'
            _html += '<div class="alert_icon"><img src="'+icon_path+'"/></div>'
            _html += '<div class="alert_msg">';   
            _html += '<span class="alert_mb_tit" id="mb_tit">' + title + '</span>';
            _html += '<div id="mb_msg" class="alert_mb_msg">' + msg + '</div><div id="mb_btnbox" class="mb_btnbox">';  
            _html += '</div>';  
            _html += '</div></div>';  
            $("body").append(_html); GenerateCss();  

            $("#alert_close").click( function() {  
                $.alerts._hide();       
            }); 
            $("#alert_close").focus().keypress( function(e) {  
                if( e.keyCode == 13 || e.keyCode == 27 ) $("#alert_close").trigger('click');  
            }); 

            if(param.close){
                var timer = 1000;
                if(!param.close_time){
                    timer = param.close_time
                }
                setTimeout(function() {
                    $.alerts._hide();       
                }, timer);
            } 

        },   

        alert_show:function(msg, value, type){
            var title = "系统消息"
            var _html = "";  
            _html += '<div id="mb_box" class="mb_box"></div><div id="mb_con" class="mb_con" style="min-width:400px">';
            _html += '<div id="alert_close" class="confirm_close"><img src="'+close_btn+'"/></div>'
            _html += '<div class="alert_msg">';   
            _html += '<span class="alert_mb_tit" id="mb_tit">' + title + '</span>';
            _html += '<div id="mb_msg" class="alert_mb_msg">' + msg + '</div><div id="mb_btnbox" class="mb_btnbox">';  
            _html += '</div>';  
            _html += '</div></div>';  
            $("body").append(_html); GenerateCss();  

            $("#alert_close").click( function() {  
                $.alerts._hide();       
            }); 
            $("#alert_close").focus().keypress( function(e) {  
                if( e.keyCode == 13 || e.keyCode == 27 ) $("#alert_close").trigger('click');  
            });  

        },
        confirm_show: function(msg,callback,closeCallback,other) {  
            var title = "系统消息"
            var _html = "";  
            _html += '<div id="mb_box" class="mb_box"></div><div id="mb_con" class="mb_con">';
            _html += '<div id="confirm_close" class="confirm_close"><img src="'+close_btn+'"/></div>'
            _html += '<div id="mb_msg" class="confirm_mb_msg">' + msg + '</div><div id="mb_btnbox" class="mb_btnbox">';  
            _html += '<a class="btn mb_btn_ok" id="mb_btn_ok">确认</a>';  
            _html += '<a class="btn mb_btn_no" id="mb_btn_no">取消</a>';  
            
            _html += '</div></div>';  
           
            $("body").append(_html); GenerateCss();  

            //确认
            $("#mb_btn_ok").click( function() {  
                $.alerts._hide(); 
                callback && callback(true);  
            });  

            //取消
            $("#mb_btn_no").click( function() {  
                $.alerts._hide();  
                closeCallback && closeCallback(false);   
            }); 
            $("#confirm_close").click( function() {  
                $.alerts._hide();   
                closeCallback && closeCallback(false);    
            }); 
            
            $("#mb_btn_no").focus();  
            $("#mb_btn_ok, #mb_btn_no").keypress( function(e) {  
                if( e.keyCode == 13 ) $("#mb_btn_ok").trigger('click');  
                if( e.keyCode == 27 ) $("#mb_btn_no").trigger('click');  
            }); 
            
        },  

        _hide: function() {  
             $("#mb_box,#mb_con").remove();  
        }  
    }  


    alert = function(title, message, callback) {
        $.alerts.alert(title, message, callback);  
    }  

    icon_alert = function(param) {  
        $.alerts.icon_alert(param);  
    }
       
    u_confirm = function(message, callback , closeCallback) {  
        $.alerts.confirm(message, callback,closeCallback);  
    };  
           
   
    
  var GenerateCss = function () {     
    var _widht = document.documentElement.clientWidth; //ÆÁÄ»¿í  
    var _height = document.documentElement.clientHeight; //ÆÁÄ»¸ß  
   
    var boxWidth = $("#mb_con").width();  
    var boxHeight = $("#mb_con").height();  
   
    //ÈÃÌáÊ¾¿ò¾ÓÖÐ  
    $("#mb_con").css({ top: (_height - boxHeight) / 2 + "px", left: (_widht - boxWidth) / 2 + "px" });  
  }  
   
  
})(jQuery);  