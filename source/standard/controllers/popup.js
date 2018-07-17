'use strict';

angular.module('standard').controller('ctrl.popup', function ($scope, $element) {
  $scope.showModal=function(id){
    $scope.modal=id;
    $($element).find('#'+id).modal('show');
  }
});
