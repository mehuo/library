'use strict';

angular.module('standard').controller('ctrl.filter', function ($scope) {
  $scope.webfields=[
      {"name":"pv","text":"浏览量"},
      {"name":"uv","text":"访客数"},
      {"name":"visit","text":"访问次数"},
      {"name":"visittime","text":"平均访问时长"},
      {"name":"bounce_rate","text":"跳出率"}
  ]
  
  $scope.selectBtn = function(e) {
    var target = e.target;
    $(target).addClass('active');
    $(target).siblings().removeClass('active');
  }
});
