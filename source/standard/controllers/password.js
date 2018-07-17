'use strict';

angular.module('standard').controller('ctrl.password', function ($scope) {

  console.log('app');
  $scope.AuthPasswd=function(string) {
    if(string.length >=6) {
      if(/[a-zA-Z]+/.test(string) && /[0-9]+/.test(string) && /\W+\D+/.test(string)) {
        noticeAssign(1);
      }else if(/[a-zA-Z]+/.test(string) || /[0-9]+/.test(string) || /\W+\D+/.test(string)) {
        if(/[a-zA-Z]+/.test(string) && /[0-9]+/.test(string)) {
          noticeAssign(-1);
        }else if(/[a-zA-Z]+/.test(string) && /\W+\D+/.test(string)) {
          noticeAssign(-1);
        }else if(/[0-9]+/.test(string) && /\W+\D+/.test(string)) {
          noticeAssign(-1);
        }else{
          noticeAssign(0);
        }
      }
    }else{
      noticeAssign(null); 
    }
  }
  function noticeAssign(num) {
    if(num == 1) {
      $('.weak').addClass('on');
      $('.medium').addClass('on');
      $('.strong').addClass('on');
    }else if(num == -1){
      $('.weak').addClass('on');
      $('.medium').addClass('on');
      $('.strong').removeClass('on');
    }else if(num ==0) {
      $('.weak').addClass('on');
      $('.medium').removeClass('on');
      $('.strong').removeClass('on');
    }else{
      alert('密码必须大于6位');
      $('.weak').removeClass('on');
      $('.medium').removeClass('on');
      $('.strong').removeClass('on');
    }
  }

});
