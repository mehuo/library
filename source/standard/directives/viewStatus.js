'use strict';

/**
 * 查看当前功能的作者和实现状态
 * 原理：
 * 拦截路由变化的事件，从状态参数中取作者和进度信息
 */
angular.module('standard').directive('appViewStatus', function($rootScope, $templateCache, $http, authors) {
  return {
    restrict: 'EA',
    scope: {},
    templateUrl: '/source/standard/partials/viewStatus.html',
    link: function(scope, element, attrs) {
      var vm = scope.vm = {};
      $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        vm.authors = toState.authors.map(function(author, index, array){
            return authors.filter(function(currentValue,index,arr){
                if (currentValue.name == author){
                    return currentValue;
                } 
            })[0];
        })
      });
    }
  }
});
