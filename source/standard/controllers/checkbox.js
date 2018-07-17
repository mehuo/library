'use strict';

angular.module('standard').controller('ctrl.checkbox', function ($scope) {
  $scope.fav=[
    {name:'篮球',id:0,checked:true},
    {name:'足球',id:1,checked:false},
    {name:'网球',id:2,checked:false},
  ]

  $scope.check=function(id){
    console.log(id)
    console.log($scope.fav);
  } 
});
