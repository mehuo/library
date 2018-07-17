'use strict';

var module = angular.module('app.controllers');

module.controller('analysisMain', function(chart, $scope, $element, $http) {
    $scope.menus = nav;

    $scope.reportMenus = [{
            'name': '常用报告',
            'sign': 'main',
            'imgpath': '/img/nav/theme-report.png',
            'subs': [
                { 'name': '柱状图', 'sign': 'bar', 'url': 'bar' },
                { 'name': '趋势图', 'sign': 'trend', 'url': 'trend' },
                { 'name': '饼图', 'sign': 'pie', 'url': 'pie' },
                { 'name': '地图', 'sign': 'area', 'url': 'area' },
                { 'name': '单轴散点图', 'sign': 'scatter', 'url': 'scatter' }
            ]
        },
        {
            'name': '渠道分析',
            'sign': 'channel',
            'imgpath': '/img/nav/channel-analysis.png',
            'subs': [
                { 'name': '渠道报告', 'sign': 'channel', 'imgpath': '/img/nav/icon-channel.png', 'url': '/app/nav/report/channel' },
            ]
        }
    ];

})