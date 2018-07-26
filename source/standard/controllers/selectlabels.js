'use strict';

angular.module('standard').controller('ctrl.selectlabels', function ($scope) {
  
  $scope.areaLabels = [
    {name:'不限制',type : 0 , data : []},
    {name:'按省',type : 1, data : $scope.locations}
  ]
  $scope.ageLabels = [
    {name:'不限制',type : 0,data : []},
    {name:'年龄段',type : 1,data : $scope.age_periods}
  ]
  $scope.favLabels = [
    {name:'不限制',type : 0,data:[]},
    {name:'按兴趣分类',type : 1, data : $scope.fav_list}
  ]
  $scope.appLabels = [
    {name:'不限制',type : 0, data : []},
    {name:'按分类',type : 1, data : $scope.cate_list},
    {name:'按APP',type : 2, data : $scope.app_list},
  ]

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
    $scope.areaLabels = [
      {name:'不限制',type : 0 , data : []},
      {name:'按省',type : 1, data : $scope.locations}
    ]
    $scope.ageLabels = [
      {name:'不限制',type : 0,data : []},
      {name:'年龄段',type : 1,data : $scope.age_periods}
    ]
    $scope.favLabels = [
      {name:'不限制',type : 0,data:[]},
      {name:'按兴趣分类',type : 1, data : $scope.fav_list}
    ]
    $scope.appLabels = [
      {name:'不限制',type : 0, data : []},
      {name:'按分类',type : 1, data : $scope.cate_list},
      {name:'按APP',type : 2, data : $scope.app_list},
    ]
    
  })

  $scope.saveLabels = function(type,data){
    console.log(type,data);
  }



});
