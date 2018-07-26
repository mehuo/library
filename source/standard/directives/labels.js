  'use strict';

/* Directives */


var module = angular.module('standard');
  
module.directive('labels', function() {
    return {
        restrict: 'EA',
        scope: { 
          label:'@',
          labelColumn : '@',
          labelList : '=',
          labelModal : '=', 
          saveFunc :'&'
        },
        template: `<div class="form-group row">
                    <div class="col-sm-2"><div class="title">{{label}} : </div></div>
                    <div class="col-sm-10">
                      <div class="fyn-tabs">
                        <div class="nav">
                          <div ng-repeat="item in labelList" class="nav-tabs area-type" ng-class="{'active':labelModal[labelColumn_type]==item.type,'tabs-hide':labelModal[labelColumn_type]==item.type}" 
                          ng-click="setLabels(labelColumn_type,item);" style="width:{{labelWidth}}%">{{item.name}}</div>
                        </div>
                        <div class="tab-content" ng-class="{'hide-con':labelModal[labelColumn_type]==0}">
                          <div class="select-main" ng-repeat = "item in labelList" ng-show="labelModal[labelColumn_type]==item.type && item.name!= '不限制'">
                            <div class="area-box" ng-mouseleave="hidecitys($event)"> 
                              <div class="check-item">
                                <input type="checkbox" ng-model="item[labelColumn_all]" ng-click="selectAll(labelColumn)">
                                <span>全选</span>
                              </div>
                              <div class="check-item" ng-repeat="item in item.data" ng-mouseover="showcitys($event)" >
                                <input ng-mouseover="shownext($event)" type="checkbox" ng-model="item.ischeck" ng-click="selectThis(labelColumn,item)"/>
                                <span ng-mouseover="shownext($event)" >{{item.name}}</span>
                                <div class="subs-box {{labelColumn_dom}}" ng-mouseover="showown($event)" ng-show="item.child && item.child.length>0">
                                  <div class="city-item" ng-repeat="one in item.child">
                                    <input type="checkbox" ng-model="one.ischeck" ng-click="selectSubThis(labelColumn,item)"/>
                                    <span>{{one.name}}</span>
                                  </div>
                                </div>
                              </div>
                              <div class="clearfix"></div>
                            </div>
                            <div class="on-checkbox" ng-if="selectArray[labelColumn].length>0">
                              <div class="on-title">已选 : </div>
                              <div class="on-content">
                                <span ng-repeat="sel in selectArray[labelColumn]">{{sel.name}}<span ng-hide="$last"> , </span></span>
                              </div>
                              <div class="clearfix"></div>
                            </div>
                          </div>
                          <div class="oper-group" ng-if="labelModal[labelColumn_type]!=0">
                            <a href="" class="btn-min mbtn-primary" ng-click="save()">保存</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>`,

        replace: true,
        controller: function($scope,$element,$rootScope) {     
            
            $scope.labelColumn_type = $scope.labelColumn + '_type';
            $scope.labelColumn_all = $scope.labelColumn + '_is_all';
            $scope.labelColumn_dom = $scope.labelColumn + '-subs';


            $scope.$watch('labelList',function(newdata,olddata){
                if(newdata){
                  $scope.labelList = newdata;
                  if($scope.labelList && $scope.labelList.length>=0){
                    $scope.labelWidth = 100 / $scope.labelList.length;
                  }else{
                    $scope.labelWidth = 100;
                  }
                  $scope.selLabels = $scope.labelList[$scope.labelList.length-1];
                  $scope.labelModal={
                    [$scope.labelColumn_type]: $scope.selLabels.type,
                  }
                  angular.forEach($scope.labelList,function(value,key){
                    if(value.type == $scope.labelModal[$scope.labelColumn_type]){
                      value[$scope.labelColumn_all] = 'false'
                      $scope.data = value.data;
                    }
                  })
                }
            })

            //切换label类型
            $scope.setLabels = function(label,item){
              $scope.labelModal[label] = item.type;
              $scope.selLabels = item;
              $scope.data = item.data;
              $scope.buildItems($scope.labelColumn , $scope.selectItems[$scope.labelColumn]);
            }

            //全选
            $scope.selectItems = {[$scope.labelColumn] : {} };
            $scope.selectArray = {[$scope.labelColumn] : [] };
            $scope.itemIds = {[$scope.labelColumn] : [] };

            //全选
            $scope.selectAll=function(type){
              allAreas(type,'all',$scope.data);
            }

            //选中某一个特定的
            $scope.selectThis=function(type,item){
              allAreas(type,item,$scope.data);
            }

            //选择子目录
            $scope.selectSubThis=function(type,sel){
              sel.ischeck = false;
              delete $scope.selectItems[type][sel.name];
              angular.forEach(sel.child,function(value,key){
                if(value.ischeck){
                  $scope.selectItems[type][value.name]=value;
                  sel.ischeck = true;
                  sel.tag = $scope.labelModal[$scope.labelColumn_type];
                  $scope.selectItems[type][sel.name] = sel;
                }else{
                  delete $scope.selectItems[type][value.name];
                }
              })
              $scope.buildItems(type,$scope.selectItems[type]);
            }

            //地域选择
            function allAreas(type,sel,list){
              var is_all= type+'_is_all';
              if(sel=='all'){
                angular.forEach(list,function(value,key){
                  if($scope.selLabels[is_all]){
                    value.ischeck=true;
                    value.tag = $scope.labelModal[$scope.labelColumn_type];
                    $scope.selectItems[type][value.name]=value;
                    angular.forEach(value.child,function(v,k){
                      v.ischeck=true;
                      v.tag = $scope.labelModal[$scope.labelColumn_type];
                      $scope.selectItems[type][v.name]=v;
                    })
                  }else{
                    value.ischeck=false;
                    delete $scope.selectItems[type][value.name];
                    angular.forEach(value.child,function(v,k){
                      v.ischeck=false;
                      delete $scope.selectItems[type][v.name]
                    })
                  }
                })
              }else{
                if(sel.ischeck){
                  sel.tag = $scope.labelModal[$scope.labelColumn_type];
                  $scope.selectItems[type][sel.name] = sel;
                  angular.forEach(sel.child,function(value,key){
                    value.ischeck = true;
                    value.tag = $scope.labelModal[$scope.labelColumn_type];
                    $scope.selectItems[type][value.name]=value;
                  })
                }else{
                  delete $scope.selectItems[type][sel.name];
                  angular.forEach(sel.child,function(value,key){
                    value.ischeck = false;
                    delete $scope.selectItems[type][value.name];
                  })
                }
              }
              $scope.buildItems(type,$scope.selectItems[type]);
            }


            //预处理选择的条目
            $scope.buildItems=function(type,selects){
              console.log(selects);
              $scope.selectArray[type] = [];
              $scope.itemIds[type] = [];
              angular.forEach(selects,function(value,key){
                if(value.tag == $scope.labelModal[$scope.labelColumn_type]){
                  $scope.itemIds[type].push(key);
                  $scope.selectArray[type].push(value);
                }
              })
              console.log($scope.itemIds);
              console.log($scope.selectArray);
            }

            //保存已经选择的标签
            $scope.save = function(){
              // $scope.queryFunc({num:num,panel:$scope.sign});
              $scope.saveFunc({type:$scope.labelColumn,data:$scope.selectArray});
            }

            $scope.hidecitys = function($event) {
              $("."+$scope.labelColumn_dom).hide();
            }

            $scope.showcitys = function($event) {
              $("."+$scope.labelColumn_dom).hide();
              $($event.target).find("."+$scope.labelColumn_dom).show();
            }

            $scope.shownext = function($event) {
              $event.stopPropagation();
              $event.preventDefault();
              $("."+$scope.labelColumn_dom).hide();
              $($event.target).nextAll("."+$scope.labelColumn_dom).show();
            }

            $scope.showown = function($event) {
              $event.stopPropagation();
              $event.preventDefault();
              $($event.target).show();
            }



        }        

    }
});



