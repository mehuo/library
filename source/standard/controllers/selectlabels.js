'use strict';

angular.module('standard').controller('ctrl.selectlabels', function ($scope) {
  $scope.planInfo={
    link:'',
    area_type:'1',
    sex_type:'0',
    age_type:'0',
    fav_type:'0',
    platform:'0',
    app_directional:'0',
    quota:'',
    quota_num:1,
    show_type:'0',
    area_is_all:'false',
    fav_is_all:'false',
    app_is_all:'false',
    cate_is_all:'false',
  }

  //获取常量数据
  $.getJSON("/source/standard/configs/labels.json", function(json) {
    console.log(json)
    //年龄段选择数据
    $scope.age_periods = json.age_periods;
    //地域
    $scope.locations = json.locations;
    angular.forEach($scope.locations,function(value,key){
      if(value.cities){
        var cities=[];
        angular.forEach(value.cities,function(v,k){
          var item={};
          item.name = v;
          item.parent = value.name;
          cities.push(item);
        })
        value.child = angular.copy(cities);
      }
    })
    //兴趣爱好数据
    $scope.fav_list = json.fav;
    //按app选择的数据
    $scope.app_list = json.app;
    //按分类选择的数据
    $scope.cate_list = json.cate;
    angular.forEach($scope.cate_list,function(value,key){
      if(value.child){
        var child=[];
        angular.forEach(value.child,function(v,k){
          var item={};
          item.name = v.value;
          item.parent = value.name;
          child.push(item);
        })
        value.child = angular.copy(child);
      }
    })
  })


  //全选
  $scope.selectItems={area:{},fav:{},app:{},age:{},cate:{}};
  $scope.selectArray = {area:[],fav:[],app:[],age:[],cate:[]};
  $scope.itemIds = {area:[],fav:[],app:[],age:[],cate:[]};
  $scope.selectAll=function(type){
    if(type=='area'){
      allAreas(type,'all',$scope.locations);
    }else if(type=='cate'){
      allAreas(type,'all',$scope.cate_list);
    }else if(type=='fav'){
      allItems(type,'all',$scope.fav_list);
    }else if(type=='app'){
      allItems(type,'all',$scope.app_list);
    }

  }

  //选中某一个特定的
  $scope.selectThis=function(type,item){
    if(type=='area'){
      allAreas(type,item,$scope.locations);
    }else if(type=='cate'){
      allAreas(type,item,$scope.cate_list);
    }else if(type=='fav'){
      allItems(type,item,$scope.fav_list);
    }else if(type=='app'){
      allItems(type,item,$scope.app_list);
    }else if(type=='age'){
      allItems(type,item,$scope.age_periods);
    }
  }


  //预处理选择的条目
  $scope.buildItems=function(type,selects){
    $scope.selectArray[type] = [];
    $scope.itemIds[type] = [];
    angular.forEach(selects,function(value,key){
      $scope.itemIds[type].push(key);
      $scope.selectArray[type].push(value);
    })
    console.log($scope.itemIds);
    console.log($scope.selectArray);
  }

  //选择地域子目录
  $scope.selectSubThis=function(type,sel){
    sel.ischeck = false;
    delete $scope.selectItems[type][sel.name];
    angular.forEach(sel.child,function(value,key){
      if(value.ischeck){
        $scope.selectItems[type][value.name]=value;
        sel.ischeck = true;
        $scope.selectItems[type][sel.name]=sel;
      }else{
        delete $scope.selectItems[type][value.name];
      }
    })
    console.log($scope.selectItems[type])
    $scope.buildItems(type,$scope.selectItems[type]);
  }

  //地域选择
  function allAreas(type,sel,list){
    console.log(sel);
    var is_all= type+'_is_all';
    if(sel=='all'){
      angular.forEach(list,function(value,key){
        if($scope.planInfo[is_all]){
          value.ischeck=true;
          $scope.selectItems[type][value.name]=value;
          angular.forEach(value.child,function(v,k){
            v.ischeck=true;
            $scope.selectItems[type][v.name]=v;
          })
        }else{
          value.ischeck=false;
          delete $scope.selectItems[type][value.name];
          angular.forEach(value.child,function(v,k){
            v.ischeck=false;
            delete $scope.selectItems[type][v.name]
          })
        }
      })
    }else{
      if(sel.ischeck){
        $scope.selectItems[type][sel.name]=sel;
        angular.forEach(sel.child,function(value,key){
          value.ischeck = true;
          $scope.selectItems[type][value.name]=value;
        })
      }else{
        delete $scope.selectItems[type][sel.name];
        angular.forEach(sel.child,function(value,key){
          value.ischeck = false;
          delete $scope.selectItems[type][value.name];
        })
      }
    }
    console.log($scope.selectItems[type])
    $scope.buildItems(type,$scope.selectItems[type]);
  }

  //其他复选框选择
  function allItems(type,sel,list){
    var is_all= type+'_is_all';
    angular.forEach(list,function(value,key){
      if(sel=='all'){
        if($scope.planInfo[is_all]){
          value.ischeck=true;
          $scope.selectItems[type][value.name]=value;
        }else{
          value.ischeck=false;
          delete $scope.selectItems[type][value.name];
        }
      }else{
        if(!sel.ischeck){
          if (sel.name==value.name) {
            value.ischeck=false;
            delete $scope.selectItems[type][value.name];
          }
        }else{
          if (sel.name==value.name) {
            value.ischeck=true;
            $scope.selectItems[type][value.name]=value;
          };
        }
      }
    })
    console.log($scope.selectItems[type])
    $scope.buildItems(type,$scope.selectItems[type]);
  }



  $scope.hidecitys = function($event) {
    $(".area-citys").hide();
  }

  $scope.showcitys = function($event) {
    $(".area-citys").hide();
    $($event.target).find(".area-citys").show();
  }

  $scope.shownext = function($event) {
    $event.stopPropagation();
    $event.preventDefault();
    $(".area-citys").hide();
    $($event.target).nextAll(".area-citys").show();
  }

  $scope.showown = function($event) {
    $event.stopPropagation();
    $event.preventDefault();
    $($event.target).show();
  }



});
