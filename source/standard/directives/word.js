  'use strict';

/* Directives */

var module = angular.module('standard');
  
module.directive('word', function() {
    return {
        restrict: 'EA',
        scope: { 
            words:'=', 
            sign:'@',
            'func':'&'           
        },
        template: '<div class="classify">'+
                  '  <div class="label-item" ng-repeat="item in words">'+
                  '    <div class="word">{{item}}</div>'+
                  '    <div class="img" ng-click="deleteWords($index)"></div>'+
                  '  </div>'+
                  '  <div ng-show="!is_add" class="add" ng-click="addWords()">+&nbsp;添加</div>'+
                  '  <div id="{{sign}}" ng-show="is_add" class="input">'+
                  '    <form id="form_{{sign}}">'+
                  '       <input type="text" class="add-input" data-rule="required;length[1~10];excludespecial3"  ng-model="word_name">'+
                  '    </form>'+
                  '    <a class="confirm" ng-click="confirmAdd(\'click\')">确认</a>'+
                  '    <a class="cancel" ng-click="closeAdd()">取消</a>'+
                  '  </div>'+
                  '</div>',

        replace: true,
        controller: function($scope,$rootScope,$element) {
          // $scope.words = [];
          $scope.$watch('words',function(newData,oldData){
            $scope.words = newData;
          })

          //弹出添加词语框
          $scope.addWords=function(type){
              $scope.word_name='';
              $scope.is_add=true;
              $("input.add-input").focus(); 
          }
          //确认添加词语
          $scope.confirmAdd=function(type,etype){
            if($scope.word_name == ''){
              alert('不能为空');
            }else{
              if($.inArray($scope.word_name, $scope.words)>=0){ 
                alert('请勿重复添加');
              }else{
                $scope.words.push($scope.word_name);
                console.log($scope.words)
                $scope.func && $scope.func();
                $scope.is_add = false;
              }
            }
            
          }

          $scope.closeAdd=function(){
            $scope.is_add = false;
          }

          //删除关键词
          $scope.deleteWords=function(index){
            $scope.words.splice(index,1); 
            $scope.func && $scope.func();            
          }
        }
    };
});



