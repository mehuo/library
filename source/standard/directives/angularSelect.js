'use strict';

var module = angular.module('standard');
  
module.directive('angularSelect', function() {
  return {
    restrict: 'EA',
    scope: {
        listdata: '=',
        selectedop: '=',
        selectedmodel: '=',
        showkey: '=',
        valuekey: '=',
        changefunc: '=',
        ifselected:'=',
        disabled:'@',
        search:'='
    },
    template: `<div class="angularSelect">
              <p ng-show="!show && disabled != 'true'" ng-click="showinput($event,true)">
                <span ng-if="selectedopin[showkey]">{{selectedopin[showkey]}}</span>
                <span ng-if="!selectedopin[showkey]">--请选择--</span>
              </p>
              <p ng-show="!show && disabled == 'true'">
                <span ng-if="selectedopin[showkey]">{{selectedopin[showkey]}}</span>
                <span ng-if="!selectedopin[showkey]">--请选择--</span>
              </p>
              <div class="input" ng-show="show">
                <input type="text" ng-show="search!=false" placeholder="{{selectedopin[showkey]}}" ng-keyup="filterselect($event)" ng-model="searchkey" class="searchinput" ng-change="formatlist()">
                <input type="text" ng-show="search==false" disabled placeholder="{{selectedopin[showkey]}}"  ng-model="searchkey" class="searchinput">
              </div>
              <ul class="lis-box" ng-show="showul">
                <li ng-repeat="item in listdata track by $index" ng-click="changelist(item)" ng-show="!item.showselectfyy" ng-class="{'on':item==selectedopin}">{{item[showkey]}}</li>
              </ul>
            </div>`,
    replace: true,
    link: function(scope, element,timeout) {
        
    },
    controller: function($scope, $element, $rootScope,$timeout) {
        $scope.$watch("show", function(newValue, oldValue, scope) {
            if (newValue) {
                $timeout(function() {
                    $element[0].focus();
                    $($element).find(".searchinput").focus();
                });
            }
        }, true);

        $scope.show = false;
        $scope.showul = false;
        $scope.$watch("listdata", function(newValue, oldValue, scope) {
            if (newValue) {
                $scope.listdata = newValue;
                $scope.selectedopin = {};
                angular.forEach($scope.listdata,function(value,key){
                    if(value[$scope.valuekey] == $scope.selectedmodel){
                        $scope.selectedopin = value;
                    }
                })
            }
        }, true);
        angular.forEach($scope.listdata,function(value,key){
          if(value[$scope.valuekey] == $scope.selectedmodel){
            $scope.selectedopin = value;
          }
        })
        $scope.searchkey = '';
        $(document).click(function(e){
          if($(e.target).parents(".angularSelect")[0]!=$element[0]){
            $scope.show = false;
            $scope.showul = false;
            $scope.$apply();
          }
        })
        $scope.showinput = function(e,show) {
            $scope.show = show;
            
            // if($scope.search == false){
            //     if(show){
            //         $scope.show = false;
            //     }else{
            //         $scope.show = show;
            //     }
            // }else{
            //     $scope.show = show;
            // }
            $scope.showul = show;
            angular.forEach($scope.listdata,function(value,key){
              if(value[$scope.valuekey] == $scope.selectedmodel){
                $scope.selectNumber = key;
              }
            })
            window.setTimeout(function(){
                var top = parseInt(parseInt($scope.selectNumber) * 32);
                $($element).find("#selectul").animate({  
                    scrollTop: top
                }, 200); 
            },100)
        }
        $scope.changelist = function(item) {
            $scope.selectedopin = item;
            $scope.selectedmodel = item[$scope.valuekey];
            if($scope.changefunc){
              window.setTimeout(function(){
                  $scope.changefunc(item);
              },100)
            }
            $scope.showul = false;
            $scope.show = false;
            $scope.ifselected = false;
        }
        $scope.filterselect = function(e) {
            if (e.keyCode == 13) {
                $scope.formatlist();
            }
        }
        $scope.formatlist = function() {
            $scope.listdata = $.map($scope.listdata, function(ele) {
                ele.showselectfyy = true;
                if (!$scope.searchkey || $scope.searchkey == '' || ($scope.searchkey != '' && ele[$scope.showkey].indexOf($scope.searchkey) > -1)) {
                    ele.showselectfyy = false;
                }
                return ele;
            })
        }
        if($scope.listdata){
            $scope.formatlist();
        }
    }
};
});