  'use strict';

/* Directives */


var module = angular.module('standard');
  
module.directive('page2', function() {
    return {
        restrict: 'EA',
        scope: { 
           pageData:'=',
           data:'=',
           sign:'@',
           pageSize:'=',
           search:'=' ,
           queryFunc :'&'
        },
        template: '<div class="text-center" ng-show="data.length>0">'+
                  '<div class="pagination">'+
                  '<ul style="display:inline-block">'+
                  '<li class="previous"  ng-if="pageModel[sign].pageN>1"  ng-click="pageModel[sign].pageN<=1||queryByPage(pageModel[sign].pageN-1);">'+
                  ' <a class="page-left" href=""></a>'+
                  '</li>'+
                  '<li ng-if="pageModel[sign].pages>5 && pageModel[sign].pageN>3" class="previous" ng-click="queryByPage(1);">'+
                  ' <a class="page-prev" href="">1</a></li>'+
                  '</li>'+
                  '<li ng-if="pageModel[sign].pages>5 && pageModel[sign].pageN>3" class="previous">'+
                  ' <a class="page-prev" href=""><span>&middot;&middot;&middot;</span></a></li>'+
                  '</li>'+
                  '<li ng-repeat="page in pageModel[sign].pageArr"> '+
                  '   <a ng-if="pageModel[sign].pages!=1 && pageModel[sign].pages>=5" class="page-num" id="{{sign}}{{page}}" ng-class={"on":pageModel[sign].pageN==page,"page-radius-l":$index==0,"page-radius-r":$index==4} ng-click="queryByPage(page)"  href="">{{page}}</a>'+  
                  '   <a ng-if="pageModel[sign].pages!=1 && pageModel[sign].pages<5" class="page-num" id="{{sign}}{{page}}" ng-class={"on":pageModel[sign].pageN==page,"page-radius-l":$index==0,"page-radius-r":$index==pageModel[sign].pages-1} ng-click="queryByPage(page)"  href="">{{page}}</a>'+              
                  ' </li>'+
                  '<li ng-if="pageModel[sign].pages>5 && pageModel[sign].pageN<(pageModel[sign].pages-2)" class="next">'+
                  '  <a class="page-next" href=""><span>&middot;&middot;&middot;</span></a></li>'+
                  '</li>'+
                  '<li ng-if="pageModel[sign].pages>5 && pageModel[sign].pageN<(pageModel[sign].pages-2)" class="next" ng-click="queryByPage(pageModel[sign].pages);">'+
                  '  <a class="page-next" href="">{{pageModel[sign].pages}}</a></li>'+
                  '</li>'+
                  '<li class="next" ng-if="pageModel[sign].pageN<pageModel[sign].pages" ng-click="pageModel[sign].pageN>=pageModel[sign].pages||queryByPage(pageModel[sign].pageN+1)" >'+ 
                  ' <a  class="page-right" href=""></a>'+
                  '</li>'+
                  '</ul>'+
                  '<div ng-if="pageModel[sign].pages>5" style="display:inline-block">'+
                  '  <span class="page-goto">前往</span>'+
                  '  <a class="page-goto-num" href="" >页</a>'+
                  '  <input id="sel-page" class="form-control-min btn-32 page-input" style="width:70px;" type="text" ng-model="pageModel[sign].pageN" ng-keypress="pageDown($event,pageModel[sign].pageN);">'+
                  '</div>'+
                  '</div>'+
                  '</div>',

        replace: true,
        controller: function($scope,$element,$rootScope) {            
            
            // 处理分页数据
            function setPageModel(pageData,table_name){  
              $scope.pageModel={};
              $scope.pageModel[table_name]=angular.copy(pageData);
              if (pageData.total<10) {
                $scope.showPage=false;
              }else{
                $scope.showPage=true;
              };
              $scope.pageModel[table_name].data=pageData.data;
              $scope.data = $scope.pageModel[table_name].data;
              $scope.pageModel[table_name].pageN=pageData.current; 
              $scope.pageModel[table_name].selPage=pageData.current;
              $scope.pageModel[table_name].pageArr=[];

              // $("#sel-page").val(pageData.current);

              for (var i = 0; i < pageData.pages; i++) {
                if (pageData.pages>5) {
                  // 控制显示位置
                  if ($scope.pageModel[table_name].pageN>3) {
                    if (pageData.pages>=$scope.pageModel[table_name].pageN+2) {
                      $scope.pageModel[table_name].pageArr=[];
                      $scope.pageModel[table_name].pageArr.push($scope.pageModel[table_name].pageN-2)
                      $scope.pageModel[table_name].pageArr.push($scope.pageModel[table_name].pageN-1)
                      $scope.pageModel[table_name].pageArr.push($scope.pageModel[table_name].pageN)
                      $scope.pageModel[table_name].pageArr.push($scope.pageModel[table_name].pageN+1)
                      $scope.pageModel[table_name].pageArr.push($scope.pageModel[table_name].pageN+2)
                    }else{
                      $scope.pageModel[table_name].pageArr=[];
                      for (var j = 4; j >= 0; j--) {
                        $scope.pageModel[table_name].pageArr.push(pageData.pages-j)
                      };
                    }   
                  }else{
                    for (var i = 0; i < pageData.pages; i++) {
                      if (i<5) {
                        $scope.pageModel[table_name].pageArr.push(i+1)
                      };
                    };
                  };
                }else{
                  for (var i = 0; i < pageData.pages; i++) {
                    $scope.pageModel[table_name].pageArr.push(i+1)
                  };
                };
              };
              if (!$rootScope.$$phase) {
                $rootScope.$apply();
              }
              console.log($scope.pageModel);
            }

            $scope.$watch('pageData',function(newData,oldData){
              console.log(newData);
              $scope.data=[];
              if(newData){
                if(newData.data){
                  if (newData.data.length>0) {
                    //分页初始化
                    setPageModel(newData,$scope.sign);
                  };
                }
                
              }
            })

            $scope.data=[];
            if ($scope.pageData) {
              if($scope.pageData.data){
                if ($scope.pageData.data.length>0) {
                  //分页初始化
                  setPageModel($scope.pageData,$scope.sign);
                };
              }
              
            };

            $scope.changePager=function(){
              setList($scope.show_per_page);
            }

            //回车时搜索
            $scope.pageDown=function(e,num) {
              var ev= window.event||e;
              if (ev.keyCode == 13) {
               $scope.queryByPage(parseInt(num));
              }
            }

            $scope.queryByPage=function(num){ 
              if(!isNaN(num)){
                num=parseInt(num);
                if(num<1||num>$scope.pageModel.pages){

                }else{
                  $scope.queryFunc({num:num,panel:$scope.sign});
                }
              }else{

              }
              
            }



    }        

  }
});



