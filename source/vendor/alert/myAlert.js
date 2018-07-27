(function($) {  
    var close_btn = '/source/vendor/alert/mb-del.png';
    $.alerts = {      
        //普通提示框   
        alert: function(message,title) {   
            $.alerts.alert_show(message, title, 'alert');  
        },
        //带图标的提示框  
        icon_alert: function(param) {  
            $.alerts.icon_alert_show(param, 'icon_alert');  
        }, 
        //询问框 
        confirm: function(message, callback, closeCallback) {  
            $.alerts.confirm_show(message,function(result) {  
                callback && callback(result);  
            },function(){
                closeCallback && closeCallback();
            });  
        },  
        
        alert_show:function(msg,title,type){
            if(!title){
                title = "系统消息"
            }
            var _html = "";  
            _html += '<div id="mb_box" class="mb_box"></div><div id="mb_con" class="mb_con" style="width:400px">';
            _html += '<div id="alert_close" class="confirm_close"></div>'
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

        icon_alert_show:function(param,type){
            var title = param.title;
            var icon_type = param.icon;
            var msg = param.msg;
            if(!param.icon){
                icon_type = 'none';
            }
            if(!param.title){
                title = '系统消息';
            }
            var _html = "";  
            _html += '<div id="mb_box" class="mb_box"></div><div id="mb_con" class="mb_con" style="width:400px">';
            _html += '<div id="alert_close" class="confirm_close"></div>'
            _html += '<div class="alert_msg">';   
            _html += '<div class="alert_icon '+icon_type+'"></div>'
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

        
        confirm_show: function(msg,callback,closeCallback,other) {  
            var title = "系统消息"
            var _html = "";  
            _html += '<div id="mb_box" class="mb_box"></div><div id="mb_con" class="mb_con">';
            _html += '<div id="confirm_close" class="confirm_close"></div>'
            _html += '<div class="alert_msg">'
            _html += '<div id="mb_msg" class="confirm_mb_msg">' + msg + '</div><div id="mb_btnbox" class="mb_btnbox">';  
            _html += '<a class="btn mb_btn_ok" id="mb_btn_ok">确认</a>';  
            _html += '<a class="btn mb_btn_no" id="mb_btn_no">取消</a>';  
            _html += '</div></div></div>';  
           
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

    // 参数
    // msg : 提示信息
    // title : 显示标题
    alert = function(message, title) {
        $.alerts.alert(message, title);  
    }  

    // 参数 param
    // icon : warnning success message error none 默认为none
    // msg : 提示信息 
    // title : 显示标题 默认为 系统消息
    icon_alert = function(param) {  
        $.alerts.icon_alert(param);  
    }
    
    // 询问框
    // message 询问信息
    // callback 确认后的回调
    // closeCallback 取消后的回调
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