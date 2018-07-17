'use strict';

angular.module('standard').controller('ctrl.pagetable', function ($scope,$http,$rootScope) {

  function getPagingData(){
    $scope.pageingData = [{"name":"111","id":1},{"name":"222","id":2},{"name":"333","id":3},{"name":"444","id":4},{"name":"555","id":5}];
 
  }
  //获取前端分页的后台数据
  getPagingData();


  //ajax请求分页数据
  function getList(info){
    var r={"status":0,"statusinfo":"","data":{"total":10,"pages":10,"current":1,"data":[{"name":"111","id":1},{"name":"222","id":2},{"name":"333","id":3},{"name":"444","id":4},{"name":"555","id":5}]}}

    if(info.current){
      r.data.current = info.current;
    }
    angular.forEach(r.data.data,function(value,key){
      value.id=info.current+'-'+key;
    })
    $scope.pageModelData = r.data;

    $scope.list = r.data.data;
   
  }

  $scope.init=function(){
    var info={}
    info.current = 1;
    getList(info);
  }
  $scope.init();


  //回车时搜索
  $scope.pageDown=function(e,num,panel) {
    var ev= window.event||e;
    if (ev.keyCode == 13) {
     $scope.queryByPage(num);
    }
  }

  //分页查询
  $scope.queryByPage=function(num,panel){
    var info={};
    info.current = num;
    info.oper = 'page';
    getList(info);
  
  }

  

});
