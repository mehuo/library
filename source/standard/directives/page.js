  'use strict';

/* Directives */


var module = angular.module('standard');
  
module.directive('page', function() {
    return {
        restrict: 'EA',
        scope: { 
           pageData:'=',
           data:'=',
           sign:'@',
           pageSize:'=',
           search:'=' ,
        },
        template: '<div class="text-center" ng-show="pageData.length>0">'+
                  '<div class="pagination">'+
                  '<ul style="display:inline-block">'+
                  '<li class="previous"  ng-if="pageN>1"  ng-click="pageN<=1||queryToBefore(pageN-1);">'+
                  ' <a class="page-prev" href=""><img id="prevpage" class="p-prev-img"  src="/img/page-left.png" /></a>'+
                  '</li>'+
                  '<li ng-if="number_of_pages>5 && pageN>3" class="previous" ng-click="queryByPage(1);">'+
                  ' <a class="page-prev" href="">1</a></li>'+
                  '</li>'+
                  '<li ng-if="number_of_pages>5 && pageN>3" class="previous">'+
                  ' <a class="page-prev" href=""><span>&middot;&middot;&middot;</span></a></li>'+
                  '</li>'+
                  '<li ng-repeat="page in pageArr"> '+
                  '   <a ng-if="number_of_pages!=1 && number_of_pages>=5" class="page-num" id="{{sign}}{{page}}" ng-class={"on":pageN==page,"page-radius-l":$index==0,"page-radius-r":$index==4} ng-click="queryByPage(page)"  href="">{{page}}</a>'+  
                  '   <a ng-if="number_of_pages!=1 && number_of_pages<5" class="page-num" id="{{sign}}{{page}}" ng-class={"on":pageN==page,"page-radius-l":$index==0,"page-radius-r":$index==number_of_pages-1} ng-click="queryByPage(page)"  href="">{{page}}</a>'+              
                  ' </li>'+
                  '<li ng-if="number_of_pages>5 && pageN<(number_of_pages-2)" class="next">'+
                  '  <a class="page-next" style="border-radius: 4px;" href=""><span>&middot;&middot;&middot;</span></a></li>'+
                  '</li>'+
                  '<li ng-if="number_of_pages>5 && pageN<(number_of_pages-2)" class="next" ng-click="queryByPage(number_of_pages);">'+
                  '  <a class="page-next"  href="">{{number_of_pages}}</a></li>'+
                  '</li>'+
                  '<li class="next" ng-if="pageN<number_of_pages" ng-click="pageN>=number_of_pages||queryToNext(pageN+1)" >'+ 
                  ' <a  class="page-next" href=""><img id="nextpage" class="p-next-img" src="/img/page-right.png"/></a>'+
                  '</li>'+
                  '</ul>'+
                  '<div ng-if="number_of_pages>5" style="display:inline-block">'+
                  '  <span class="page-goto">前往</span>'+
                  '  <a class="page-goto-num" href="" >页</a>'+
                  '  <input id="sel-page" class="form-control-min btn-32 page-input" style="width:70px;" type="text" ng-model="pageN" ng-keypress="pageDown($event,pageN);">'+
                  '</div>'+
                  '</div>'+
                  '</div>',

        replace: true,
        controller: function($scope,$element,$rootScope) {            
            $scope.data=[];
            $scope.pageN==1;
            function setList(pageSize){
              $scope.pageN==1;
              $scope.show_per_page = pageSize; 
              $scope.number_of_items = $scope.totalData.length
              $scope.number_of_pages = Math.ceil($scope.number_of_items/$scope.show_per_page);
              $scope.pageArr=[];
              $scope.add_all=[];
              $scope.pageList=[];
              $scope.page_all_arr=[]
              //构造数组
              for (var i = 0; i < $scope.number_of_pages; i++) {
                  var item=[]
                  angular.forEach($scope.totalData,function(value,key){
                    if (key>=i*$scope.show_per_page && key<(i+1)*$scope.show_per_page) {
                      item.push(value)
                    };
                  })
                  $scope.add_all.push(item)
              };
              
              for (var i = 0; i < $scope.number_of_pages; i++) {  
                  $scope.pageN=parseInt($scope.pageN);     
                  if ($scope.number_of_pages>5) {
                      if ($scope.pageN>3) {
                        if ($scope.number_of_pages>=$scope.pageN+2) {
                          $scope.pageArr=[];
                          $scope.pageArr.push($scope.pageN-2)
                          $scope.pageArr.push($scope.pageN-1)
                          $scope.pageArr.push($scope.pageN)
                          $scope.pageArr.push($scope.pageN+1)
                          $scope.pageArr.push($scope.pageN+2)
                        }else{
                          $scope.pageArr=[];
                          for (var j = 4; j >= 0; j--) {
                            $scope.pageArr.push($scope.number_of_pages-j)
                          };
                        }   
                      }else{
                        for (var i = 0; i < $scope.number_of_pages; i++) {
                          if (i<5) {
                           $scope.pageArr.push(i+1)
                          };
                        };
                      };
                  }else{
                    for (var i = 0; i < $scope.number_of_pages; i++) {
                      $scope.pageArr.push(i+1)
                    };
                  };
              };
              //页面加载完成时默认显示第一页
              $scope.data=$scope.add_all[0];
              $rootScope.pageA = parseInt($scope.pageN)
            }


            $scope.$watch('pageData',function(newData,oldData){
              $scope.data=[];
              if(newData){
                if (newData.length>0) {
                  $scope.pageN=1;
                  $scope.totalData=newData;
                  $scope.totalDataLen=$scope.totalData.length;
                  //分页初始化
                  setList($scope.pageSize);
                };
              }
            })

            if ($scope.data) {
              if ($scope.data.length>0) {
                $scope.totalData=$scope.data
                $scope.totalDataLen=$scope.totalData.length;
                //分页初始化
                setList($scope.pageSize);
              };
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
            var i=0;
            $scope.pageNarr={}
            $scope.queryByPage=function(num){ 
              if(!isNaN(num)){
                if(num<1||num>$scope.number_of_pages){
                  alert(pageAlert)
                  $("#sel-page").val($scope.pageN);
                }else{
                  $scope.pageN=parseInt(num);
                  $("#sel-page").val($scope.pageN);
                  setList($scope.pageSize);
                  $scope.isAlert=false
                  if (num>=1&&num<=$scope.number_of_pages) {
                    $scope.pageNarr[i]=num;      
                    $scope.oldPageN=$scope.pageNarr[i-1];
                    i++;
                    $scope.data=$scope.add_all[num-1];
                    $scope.pageN=parseInt(num);
                  }else{
                    $scope.isAlert=true
                  }
                  $rootScope.pageA = $scope.pageN;
                }
              }else{
                alert(isNumAlert);
                $("#sel-page").val($scope.pageN);
              }
            }


            $scope.queryToBefore=function(num){
              $scope.pageN=parseInt(num);
              $("#sel-page").val($scope.pageN);
              setList($scope.pageSize);
              $scope.pageNarr[i]=num;      
              $scope.oldPageN=$scope.pageNarr[i-1];
              i++;
              $scope.pageN=parseInt(num);
              $scope.data=$scope.add_all[num-1];
              $rootScope.pageA = $scope.pageN;
            }

            $scope.queryToNext=function(num){
              $scope.pageN=parseInt(num);
              $("#sel-page").val($scope.pageN);
              setList($scope.pageSize);
              $scope.pageNarr[i]=num;      
              $scope.oldPageN=$scope.pageNarr[i-1];
              i++;
              $scope.pageN=parseInt(num);
              $scope.data=$scope.add_all[num-1];  
              $rootScope.pageA = $scope.pageN;
            }


      }
    };
});



