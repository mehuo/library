'use strict';

angular.module('standard').controller('ctrl.customselect', function ($scope) {

  $scope.dataSet = [
    {name:'北京',value:1},
    {name:'上海',value:2},
    {name:'天津',value:3},
    {name:'广州',value:4},
    {name:'广东',value:5},
    {name:'黑龙江',value:6},
    {name:'山西',value:7},
    {name:'内蒙古',value:8},
    {name:'河南',value:9},
    {name:'河北',value:10}
  ]

  $scope.sel_value = $scope.dataSet[2].value;

  $scope.selectOne = function(){

  }


  //代选输入框
  $scope.data = {
    input_name:'',
    input_value:'',
    name_exist:false
  };

});
