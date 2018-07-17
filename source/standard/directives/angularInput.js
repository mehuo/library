'use strict';

var module = angular.module('standard');
  
module.directive('angularInput', function() {
    return {
        restrict: 'EA',
        scope: {
            modelval:'=', // 输入框内显示的内容
            modelkey:'=', // 隐藏传回的内容 多用于id
            isexist:'=',
            listdata:'=', //全部的列表数据
            valkey:'@', //列表中的唯一标识
            showkey:'@', //列表中要显示的信息
            placeholder:'@', //输入框的提示信息
            searchFunc:'&' //方法参数
        },
        template: `<div class="input-select">
                        <input class="form-control" ng-model="modelval" type="text" placeholder="{{placeholder}}"  ng-change="filterByValue()"
                        ng-keypress="keyDown($event);">
                        <input class="form-control" ng-model="modelkey" type="hidden">
                        <input class="form-control" ng-model="isexist" type="hidden">
                        <div ng-show="result_list.length>0 && show_ul" class="arrow"></div>
                        <ul ng-show="result_list.length>0 && show_ul" class="result">
                            <li ng-repeat="item in result_list" ng-click="setInputValue(item);">{{item[showkey]}}</li>
                        </ul>
                    </div>`,
        replace: true,
        controller: function($scope, $element, $rootScope,$timeout) {
            $scope.show_ul = true;
            $scope.$watch('listdata',function(newData,oldData){
                if(newData instanceof Array){
                    $scope.listdata = newData;
                }else{
                    $scope.listdata = [];
                }
            })


            $scope.result_list = []; //按名称筛选
            $scope.filterByValue = function(){
                $scope.isexist = false; //验证名称是否存在
                $scope.result_list = [];
                if($scope.modelval!=''){
                    angular.forEach($scope.listdata,function(value,key){
                        if(value[$scope.showkey].indexOf($scope.modelval)>=0){
                            $scope.result_list.push(value);
                        }
                        if(value[$scope.showkey] == $scope.modelval){
                            $scope.isexist = true;
                            return false;
                        }
                    })
                    $scope.show_ul = true;
                }
            }

            $scope.keyDown=function(e) {
                var ev= window.event||e;
                if (ev.keyCode == 13) {
                    $scope.filterByValue();
                }
            }

            $scope.setInputValue = function(item){
                $scope.modelval = item[$scope.showkey];
                $scope.modelkey = item[$scope.valkey];
                $scope.show_ul = false;
                $scope.result_list = [];
                $scope.validatorName();
            }

            //验证名称是否存在
            $scope.validatorName = function(){
                $scope.isexist = false; //验证名称是否存在
                if($scope.modelval!=''){
                    angular.forEach($scope.listdata,function(value,key){
                        if(value[$scope.showkey] == $scope.modelval){
                            $scope.isexist = true;
                            return false;
                        }
                    })
                }
            }


            $(document).click(function(e){
                if($(e.target).parents(".input-select")[0] != $element[0]){
                    $scope.show_ul = false;
                    $scope.result_list = [];
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                }
            })

            

        }
    };
});