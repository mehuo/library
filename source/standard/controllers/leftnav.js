'use strict';

angular.module('standard').controller('ctrl.leftnav', function ($scope, $element) {
  $scope.appReportMenus = [
          {'name':'主题报告','sign':'themereport','imgpath':'/img/nav/theme-report.png','subs':[
            {'name':'实时分析','sign':'realtime','imgpath':'/img/nav/icon-realtime.png','url':'/app/nav/report/realtime'},
            {'name':'运营分析概况','sign':'summary','imgpath':'/img/nav/icon-summary.png','url':'/app/nav/report/summary'}
                                                                        ]},
        {'name':'用户分析','sign':'user','imgpath':'/img/nav/user-analysis.png','subs':[
            {'name':'新增用户','sign':'newuser','imgpath':'/img/nav/new-user.png','url':'/app/nav/report/newuser', 'report':'newuser'},
            {'name':'活跃用户','sign':'activeuser','imgpath':'/img/nav/active-use.png','url':'/app/nav/report/activeuser'},
            {'name':'用户留存','sign':'remainuser','imgpath':'/img/nav/user-retention.png','url':'/app/nav/report/remainuser'},
            {'name':'地域分布','sign':'area','imgpath':'/img/nav/area-distribution.png','url':'/app/nav/report/area'},
            {'name':'版本分布','sign':'version','imgpath':'/img/nav/version-analysis.png','url':'/app/nav/report/version'},
            {'name':'用户设备','sign':'device','imgpath':'/img/nav/user-device.png','url':'/app/nav/report/device'},
            {'name':'运营商','sign':'operator','imgpath':'/img/nav/icon-operator.png','url':'/app/nav/report/operator'},
            {'name':'网络','sign':'network','imgpath':'/img/nav/operator.png','url':'/app/nav/report/network'}
                                                                            ]},
        {'name':'渠道分析','sign':'channel','imgpath':'/img/nav/channel-analysis.png','subs':[
            {'name':'渠道报告','sign':'channel','imgpath':'/img/nav/icon-channel.png','url':'/app/nav/report/channel'},
                                                                        ]},
        {'name':'事件与转化','sign':'eventantrans','imgpath':'/img/nav/event-and-trans.png','subs':[
            {'name':'事件分析','sign':'event','imgpath':'/img/nav/icon-event.png','url':'/app/nav/report/event'},
                                                                        ]},
        {'name':'用户参与度','sign':'userpartin','imgpath':'/img/nav/participation.png','subs':[
            {'name':'启动次数','sign':'startcount','imgpath':'/img/nav/icon-start.png','url':'/app/nav/report/startcount'},                                                            ]}                                                                        
     ];

     $scope.clickFirstMenu = function(e,sigh){
      if ($($element).find("#report"+e).children("div.menu_body").hasClass("show")){
          $('div.menu_body').removeClass('show');
          return
      }
      if ($($element).find("#report"+e).find("div.menu_body").is(":hidden")){
          $($element).find("#report"+e).find('img.icon-down').attr('src','/img/nav/up.png');
        $($element).find("#report"+e).children("h3.menu_head").addClass("current");
        $($element).find("#report"+e).find("div.menu_body").slideToggle(300).siblings("div.menu_body").slideUp("slow");
        $($element).find("#report"+e).children("h3.menu_head").siblings().removeClass("current");
      }else{
          $($element).find("#report"+e).find('img.icon-down').attr('src','/img/nav/down.png');
          $($element).find("#report"+e).children("h3.menu_head").removeClass("current")
          $($element).find("#report"+e).find("div.menu_body").slideToggle(300).siblings("div.menu_body").slideUp("slow");
      };
  };
});
