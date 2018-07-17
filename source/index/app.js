'use strict';

angular.module('app.directives', []);
angular.module('app.services', []);
angular.module('app.filters', []);
angular.module('app.controllers', []);
angular.module('app', [
    'app.directives',
    'app.services',
    'app.filters',
    'app.controllers',
    'ngRoute'
]).config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/bar', {
            templateUrl: '/views/case/report/bar.html',
            // controller:'analysisCtrl'
        })
        .when('/trend', {
            templateUrl: '/views/case/report/trend.html',
        })
        .when('/pie', {
            templateUrl: '/views/case/report/pie.html',
        })
        .when('/area', {
            templateUrl: '/views/case/report/area.html',
        })
        .when('/scatter', {
            templateUrl: '/views/case/report/scatter.html',
        })
        .otherwise({
            redirectTo: "/index"
        });
}])