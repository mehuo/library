'use strict';

var module = angular.module('app.directives');
module.directive('leftMenu', function() {
    return {
        restrict: 'EA',
        templateUrl: '/source/index/partials/leftMenu.html',
        replace: true,
        scope: {
            menus: '=',
            currep: '@'
        },
        controller: function($scope, $element) {
            console.log($scope.currep);
            $scope.select = $scope.menus[0].sign;
            angular.forEach($scope.menus, function(value, key) {
                angular.forEach(value.subs, function(v, k) {
                    if (v.sign == $scope.currep) {
                        $scope.select = value.sign;
                    }
                })

            })

            $scope.clickFirstMenu = function(e, sigh) {
                if ($($element).find("#report" + e).children("div.menu_body").hasClass("show")) {
                    $('div.menu_body').removeClass('show');
                    return
                }
                if ($($element).find("#report" + e).find("div.menu_body").is(":hidden")) {
                    $($element).find("#report" + e).find('img.icon-down').attr('src', '/img/nav/up.png');
                    $($element).find("#report" + e).children("h3.menu_head").addClass("current");
                    $($element).find("#report" + e).find("div.menu_body").slideToggle(300).siblings("div.menu_body").slideUp("slow");
                    $($element).find("#report" + e).children("h3.menu_head").siblings().removeClass("current");
                } else {
                    $($element).find("#report" + e).find('img.icon-down').attr('src', '/img/nav/down.png');
                    $($element).find("#report" + e).children("h3.menu_head").removeClass("current")
                    $($element).find("#report" + e).find("div.menu_body").slideToggle(300).siblings("div.menu_body").slideUp("slow");
                };
            };
        }
    }
})