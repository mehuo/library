'use strict';

angular.module('standard').controller('ctrl.complextable', function ($scope,$http,$rootScope) {
  var deliveryInfo = {
    type:0,
  }
  $scope.deliveryInfo=deliveryInfo;


  //切换不同的页面显示;
  $scope.changeType=function(type){
    $scope.deliveryInfo.type=type;
    var info={};
    info.current = 1;
    info.type = $scope.deliveryInfo.type;
    $scope.pageIsAll={};
    $scope.selectItems={}  // 选择的条目
    $scope.selectArray =[]; //预处理
    $scope.itemIds =[];
    getList(info);

  }

  //获取数据
  function getList(info){
    console.log(info);
    var r={"status":0,"statusinfo":"","data":{"total":10,"pages":10,"current":1,"data":[{"name":"111","id":1},{"name":"222","id":2},{"name":"333","id":3},{"name":"444","id":4},{"name":"555","id":5}]}}
    if(info.current){
      r.data.current = info.current;
    }
    angular.forEach(r.data.data,function(value,key){
      value.type=info.type;
      value.id=info.type+"-"+info.current+'-'+key;
    })
    appPagePara(r.data);
    $scope.list = r.data.data;
    if(info.oper=="page"){
      //分页时选中之前已经选中的条目
      angular.forEach($scope.list,function(value,key){
        if($.inArray(value.id+'', $scope.itemIds)>=0){
          value.ischeck=true;
        }
      })
    }else{
      // 给每一页设置全选按钮，全选按钮仅对当前页生效
      $scope.pageIsAll={};
      for (var i = 1; i <= r.data.pages; i++) {
        $scope.pageIsAll[i]=false;
      };
    }
   
  }

  $scope.init=function(){
    var info={}
    info.type = $scope.deliveryInfo.type;
    info.current = 1;
    getList(info);
  }

  $scope.init();

  $scope.selectItems={}  // 选择的条目
  $scope.selectArray =[]; //预处理
  $scope.itemIds = [];

  //处理列表全选
  $scope.selectAll=function(isAll){
    $scope.isAll=isAll;
    if ($scope.pageIsAll[$rootScope.dataJson.current]) {
      angular.forEach($scope.list,function(value,key){
        value.ischeck=true;
        $scope.selectItems[value.id]=value;
      })
    }else{
      angular.forEach($scope.list,function(value,key){
        value.ischeck=false;
        delete $scope.selectItems[value.id];
      })
    };
    $scope.buildItems($scope.selectItems);
  }

  //列表中数据单独选择
  $scope.addtoIds=function(item){
    if (!item.ischeck) {
      angular.forEach($scope.list,function(value,key){
        if (item.id==value.id) {
          value.ischeck=false;
          delete $scope.selectItems[value.id];
        };
      })
    }else{
      angular.forEach($scope.list,function(value,key){
        if (item.id==value.id) {
          value.ischeck=true;
          $scope.selectItems[value.id]=value;
        };
      })
    };
    $scope.buildItems($scope.selectItems);
  }

  //预处理选择的条目
  $scope.buildItems=function(selects){
    $scope.selectArray = [];
    $scope.itemIds = [];
    angular.forEach(selects,function(value,key){
      $scope.itemIds.push(key);
      $scope.selectArray.push(value);
    })
    console.log($scope.itemIds);
    console.log($scope.selectArray);
  }

  //批量打开和关闭
  $scope.batchOper=function(oper){
    var url='';
    if(oper=='open'){
      url="/open";
    }else{
      url="/close";
    }
    if($scope.itemIds.length>0){
      alert($scope.itemIds);
    }else{
      alert('请至少选择一条记录进行操作');
    }
  }


  //回车时搜索
  $scope.pageDown=function(e,num) {
    var ev= window.event||e;
    if (ev.keyCode == 13) {
     $scope.queryByPage(num);
    }
  }

  //分页查询
  $scope.queryByPage=function(num){
    if(!isNaN(num)){
      num=parseInt(num);
      if(num<1||num>$rootScope.dataJson.pages){
        //alert(pageAlert)
      }else{
        var info={};
        info.current = num;
        info.type = $scope.deliveryInfo.type;
        info.oper = 'page';
        getList(info);
        $scope.cur_page = num;
      }
    }else{
      //alert(isNumAlert);
    }
  }

  //设置分页参数 处理分页数据
  function appPagePara(dataJson){
    $rootScope.dataJson=dataJson;
    if (dataJson.total<15) {
      $rootScope.showPage=false;
    }else{
      $rootScope.showPage=true;
    };
    $rootScope.columnData=dataJson.data;
    $rootScope.pageArr=[];
    $rootScope.pageN=dataJson.current; 
    $rootScope.selPage=dataJson.current;
    $("#sel-page").val(dataJson.current);
    for (var i = 0; i < dataJson.pages; i++) {
      if (dataJson.pages>5) {
        // 控制显示位置
        if ($rootScope.pageN>3) {
          if (dataJson.pages>=$rootScope.pageN+2) {
            $rootScope.pageArr=[];
            $rootScope.pageArr.push($rootScope.pageN-2)
            $rootScope.pageArr.push($rootScope.pageN-1)
            $rootScope.pageArr.push($rootScope.pageN)
            $rootScope.pageArr.push($rootScope.pageN+1)
            $rootScope.pageArr.push($rootScope.pageN+2)
          }else{
            $rootScope.pageArr=[];
            for (var j = 4; j >= 0; j--) {
              $rootScope.pageArr.push(dataJson.pages-j)
            };
          }   
        }else{
          for (var i = 0; i < dataJson.pages; i++) {
            if (i<5) {
              $rootScope.pageArr.push(i+1)
            };
          };
        };
      }else{
        for (var i = 0; i < dataJson.pages; i++) {
          $rootScope.pageArr.push(i+1)
        };
      };
    };
    if (!$rootScope.$$phase) {
      $rootScope.$apply();
    }
  }

});
