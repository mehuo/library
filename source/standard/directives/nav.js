'use strict';

angular.module('standard').directive('appNav', function(NavData) {
  return {
    restrict: 'EA',
    scope: {},
    templateUrl: '/source/standard/views/nav.html',
    link: function(scope, element, attrs) {
      
      var sign = window.location.href.split('#/')[1];
      console.log(sign)
      if(!sign){
        vm.data[0].active = true;
      }
      var vm = scope.vm = {};
      vm.data = NavData;
      
      if(vm.data && vm.data.length>0){
        $.each(vm.data,function(i, el) {
          $.each(el.items,function(j, ele) {
            if(ele.state == sign){
              el.active = true;
            }
          });
        });
      }
      console.log(vm.data)
      
    }
  }
});