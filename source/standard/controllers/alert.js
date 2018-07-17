'use strict';

angular.module('standard').controller('ctrl.alert', function ($scope) {
    
    $scope.alert = function(){
      alert('你好呀，alert！');
    }

    $scope.confirm = function(){
      u_confirm('确认要去土耳其吗？',function(){
        alert('yes');
      },function(){
        alert('no');
      })
    }

});
