'use strict';

var module = angular.module('app.controllers');

module.controller('analysisCtrl', function(chart, $scope, $element, $http) {

    $scope.panels = panels;
    //初始化报告
    $scope.init = function() {
        angular.forEach($scope.panels, function(config, panel) {
            $scope.initPanel(panel, config);
        });
    }

    //初始化面板
    $scope.initPanel = function(panel, config) {
        if (config.type == 'table' || config.type == 'circle' || config.type == 'wordcloud') {
            //绘制表格
            $scope.panels[panel].data = [];
        } else {
            //绘制图表
            $scope.panels[panel].chart = echarts.init(document.getElementById(panel));
            $scope.panels[panel].chart.setOption(chart.getOptions(config, {}));
            $(window).resize($scope.panels[panel].chart.resize);
        }
        $scope.refreshPanel(panel);
    }


    $scope.refreshPanel = function(panel) {
        //构造请求参数
        var config = $scope.panels[panel];
        $scope.panels[panel].nodata = false;
        $scope.panels[panel].showloading = true;
        var params = {};
        params.report = $scope.report;
        params.panel = panel;
        params.options = angular.copy($scope.panels[panel].cond);
        $http.get('/source/report/services/chart-data.json').success(function(data) {
            var r = data[panel];
            if (panel == 'area') {
                if (config.cond.map == 'world') {
                    r = data['world'];
                }
            }
            if (r.status == 0) {
                if (r.data.panels != '' && r.data.panels != undefined) {
                    var flag = true;
                    if (r.data.panels[panel]) {
                        if (r.data.panels[panel].length == 0) { flag = false; }
                        if (panel == "contentlist" && r.data.panels[panel].data && r.data.panels[panel].data.length == 0) {
                            flag = false;
                        }
                    } else {
                        flag = false;
                    }
                    if (flag) {
                        angular.forEach(r.data.panels, function(data, panel) {
                            $scope.render(panel, data);
                        });
                    } else {
                        showNoData(panel);
                    }
                } else {
                    showNoData(panel);
                }
            } else {
                showNoData(panel);
            }
        }).error(function() {
            showNoData(panel);
        });
    }


    function showNoData(panel) {

    }

    //绘制面板
    var word_list = [];
    $scope.render = function(panel, data) {
        var config = $scope.panels[panel];
        if (config.type === 'bar-hori') { //横向柱状图
            $scope.panels[panel].data = data;
        } else if (config.type === 'wordcloud') { //字符云
            getWordCloud(data, panel);
            $("#" + panel).css('background', '')
        } else if (config.type === 'circle') {
            $scope.panels[panel].data = data;
            chart.getCirclePie(panel, data.percent); //圆环
        } else if (config.type === 'table') { //直接显示类
            $scope.panels[panel].data = data;
        } else {

            setScatterHeight(panel, config, data);

            var options = chart.getOptions(config, data);
            $scope.panels[panel].chart.setOption(options);
            $(window).resize($scope.panels[panel].chart.resize);
        }
    }

    //特殊处理单轴散点图的高度
    function setScatterHeight(panel, config, data) {
        if (config.type == 'single-scatter') {
            //单轴散点图根据tags设置高度
            var sHeight = 60;
            var height;
            var length;
            if (data.tags) {
                length = data.tags.length;
            };
            height = parseInt(sHeight * length + parseInt(75));
            if (panel == 'scatter') {
                $("#scatter").attr('style', 'min-height:' + height + 'px');
            }
            $scope.panels[panel].chart = echarts.init(document.getElementById(panel));
        }
    }


    $scope.init();


    $scope.selectBtn = function(e) {
        var target = e.target;
        $(target).addClass('active');
        $(target).siblings().removeClass('active');
    }

    // 清除面板
    $scope.clearPanel = function(panel) {
        $("#" + panel).empty();
        $scope.panels[panel].chart = echarts.init(document.getElementById(panel));
        $scope.panels[panel].chart.setOption(chart.getOptions($scope.panels[panel], {}));
        $(window).resize($scope.panels[panel].chart.resize);
    };

})