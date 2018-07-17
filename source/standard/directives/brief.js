'use strict';

angular.module('standard').directive('appBrief', function($rootScope) {
  return {
    restrict: 'EA',
    templateUrl: '/source/standard/views/brief.html',
    scope: {},
    link: function(scope, element, attrs) {
      var vm = scope.vm = {};
      $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        vm.title = toState.label;
        vm.description = toState.description;
        vm.progress = toState.progress || 0;
      })
    }
  }
});