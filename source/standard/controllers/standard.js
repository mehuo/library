'use strict';

var module=angular.module('standard',[]);

module.controller('standardCtrl',function($scope,$location,$http,$element,$compile,$rootScope){
  $scope.webfields=[
      {"name":"pv","text":"浏览量"},
      {"name":"uv","text":"访客数"},
      {"name":"visit","text":"访问次数"},
      {"name":"visittime","text":"平均访问时长"},
      {"name":"bounce_rate","text":"跳出率"}
  ]

  $scope.list=[
    {id:8,type:'url规则',kxd:'10',content:'female.people.com/*',updatetime:'2016-02-12 18:46:00'},
    {id:12,type:'词集',kxd:'10',content:'["化妆","艺术照","TFBoys",...]',updatetime:'2016-02-16 18:46:00'}
  ]

  $scope.listPage=[
    {id:1,type:'url规则',kxd:'10',content:'female.people.com/*',updatetime:'2016-02-12 18:46:00'},
    {id:2,type:'词集',kxd:'10',content:'["化妆","艺术照","TFBoys",...]',updatetime:'2016-02-16 18:46:00'},
    {id:3,type:'词集',kxd:'10',content:'["化妆","艺术照","TFBoys",...]',updatetime:'2016-02-16 18:46:00'},
    {id:4,type:'词集',kxd:'10',content:'["化妆","艺术照","TFBoys",...]',updatetime:'2016-02-16 18:46:00'},
    {id:5,type:'词集',kxd:'10',content:'["化妆","艺术照","TFBoys",...]',updatetime:'2016-02-16 18:46:00'},
    {id:6,type:'词集',kxd:'10',content:'["化妆","艺术照","TFBoys",...]',updatetime:'2016-02-16 18:46:00'},
    {id:7,type:'词集',kxd:'10',content:'["化妆","艺术照","TFBoys",...]',updatetime:'2016-02-16 18:46:00'}
  ]

  $scope.currep='realtime';
  $rootScope.appReportMenus = [
		  {'name':'主题报告','sign':'themereport','imgpath':'/analysis/img/theme-report.png','subs':[
			{'name':'实时分析','sign':'realtime','imgpath':'/analysis/img/icon-realtime.png','url':'/analysis/app/report/realtime'},
			{'name':'运营分析概况','sign':'summary','imgpath':'/analysis/img/icon-summary.png','url':'/analysis/app/report/summary'}
			/*{'name':'内容洞察','imgpath':'/analysis/img/icon-content.png','url':'/analysis/app/report/content'},
			{'name':'用户画像洞察','imgpath':'/analysis/img/icon-portrait.png','url':'/analysis/app/report/realtime/profile'}   */                                                             
		                                                                ]},
		{'name':'用户分析','sign':'user','imgpath':'/analysis/img/user-analysis.png','subs':[
			{'name':'新增用户','sign':'newuser','imgpath':'/analysis/img/new-user.png','url':'/analysis/app/report/newuser', 'report':'newuser'},
			{'name':'活跃用户','sign':'activeuser','imgpath':'/analysis/img/active-use.png','url':'/analysis/app/report/activeuser'},
			{'name':'用户留存','sign':'remainuser','imgpath':'/analysis/img/user-retention.png','url':'/analysis/app/report/remainuser'},
			/*{'name':'用户流失','imgpath':'/analysis/img/user-churn.png','url':'/analysis/app/report/loseuser'},
			{'name':'用户回访','imgpath':'/analysis/img/user-review.png','url':'/analysis/app/report/returnuser'},*/
			{'name':'地域分布','sign':'area','imgpath':'/analysis/img/area-distribution.png','url':'/analysis/app/report/area'},
			{'name':'版本分布','sign':'version','imgpath':'/analysis/img/version-analysis.png','url':'/analysis/app/report/version'},
			{'name':'用户设备','sign':'device','imgpath':'/analysis/img/user-device.png','url':'/analysis/app/report/device'},
			{'name':'运营商','sign':'operator','imgpath':'/analysis/img/icon-operator.png','url':'/analysis/app/report/operator'},
			{'name':'网络','sign':'network','imgpath':'/analysis/img/operator.png','url':'/analysis/app/report/network'}
			                                                                ]},
		{'name':'渠道分析','sign':'channel','imgpath':'/analysis/img/channel-analysis.png','subs':[
			{'name':'渠道报告','sign':'channel','imgpath':'/analysis/img/icon-channel.png','url':'/analysis/app/report/channel'},
			/*{'name':'渠道管理','imgpath':'/analysis/img/icon-channel-analysis.png'}*/
		                                                                ]},
		{'name':'事件与转化','sign':'eventantrans','imgpath':'/analysis/img/event-and-trans.png','subs':[
			{'name':'事件分析','sign':'event','imgpath':'/analysis/img/icon-event.png','url':'/analysis/app/report/event'},
			/*{'name':'漏斗分析','imgpath':'/analysis/img/icon-funnel.png'},
			{'name':'事件管理','imgpath':'/analysis/img/event-manage.png'}*/
		                                                                ]},
		{'name':'用户参与度','sign':'userpartin','imgpath':'/analysis/img/participation.png','subs':[
			{'name':'启动次数','sign':'startcount','imgpath':'/analysis/img/icon-start.png','url':'/analysis/app/report/startcount'},
			/*{'name':'使用间隔','imgpath':'/analysis/img/icon-interval.png'},
			{'name':'使用频率','imgpath':'/analysis/img/icon-hz.png'},
			{'name':'使用时长','imgpath':'/analysis/img/icon-time.png'}*/                                                                ]}		                                                                
	 ];
 
  $scope.selectBtn = function(e) {
    var target = e.target;
    $(target).addClass('btn-cur');
    $(target).siblings().removeClass('btn-cur');
  } 

  $scope.showModal=function(id){
  	console.log(id)
    $scope.modaltitle="审核理由";
    $scope.modal=id;
    $($element).find('#'+id).modal('show');
  }

  $scope.explain=function(obj){
		$("#"+$(obj.target).attr('id')).popover("show")
	}

	$scope.hideExplain=function(obj){
		$("#"+$(obj.target).attr('id')).popover("hide");
	}

	$scope.clickFirstMenu = function(e,sigh){
	  if ($($element).find("#report"+e).children("div.menu_body").hasClass("show")){
	  	$('div.menu_body').removeClass('show');
	  	return
	  }  	  
	  if ($($element).find("#report"+e).find("div.menu_body").is(":hidden")){
	  	$($element).find("#report"+e).find('img.icon-down').attr('src','/analysis/img/up.png');
	    $($element).find("#report"+e).children("h3.menu_head").addClass("current");
	    $($element).find("#report"+e).find("div.menu_body").slideToggle(300).siblings("div.menu_body").slideUp("slow");
	    $($element).find("#report"+e).children("h3.menu_head").siblings().removeClass("current");
	  }else{
	  	$($element).find("#report"+e).find('img.icon-down').attr('src','/analysis/img/down.png');
	  	$($element).find("#report"+e).children("h3.menu_head").removeClass("current")
	  	$($element).find("#report"+e).find("div.menu_body").slideToggle(300).siblings("div.menu_body").slideUp("slow");
	  };
  };

	var myChart= echarts.init(document.getElementById('chart'));
	var option = {
	    tooltip: {
	        trigger: 'item',
	        formatter: "{a} <br/>{b}: {c} ({d}%)"
	    },
	    legend: {
	        orient: 'vertical',
	        x: '8px',
	        data:['直达','营销广告','搜索引擎','邮件营销','联盟广告','视频广告','百度','谷歌','必应','其他']
	    },
	    series: [
	        {
	            name:'访问来源',
	            type:'pie',
	            selectedMode: 'single',
	            radius: [0, '30%'],

	            label: {
	                normal: {
	                    position: 'inner'
	                }
	            },
	            labelLine: {
	                normal: {
	                    show: false
	                }
	            },
	            data:[
	                {value:335, name:'直达', selected:true},
	                {value:679, name:'营销广告'},
	                {value:1548, name:'搜索引擎'}
	            ]
	        },
	        {
	            name:'访问来源',
	            type:'pie',
	            radius: ['40%', '55%'],

	            data:[
	                {value:335, name:'直达'},
	                {value:310, name:'邮件营销'},
	                {value:234, name:'联盟广告'},
	                {value:135, name:'视频广告'},
	                {value:1048, name:'百度'},
	                {value:251, name:'谷歌'},
	                {value:147, name:'必应'},
	                {value:102, name:'其他'}
	            ]
	        }
	    ]
	};
	myChart.setOption(option);

})