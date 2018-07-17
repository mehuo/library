'use strict';
/* Controllers */

var module = angular.module('app.services');

module.service('chart', function($rootScope, $location, $http, $compile, $interval) {

    var self = this;


    /***以下为最新封装的获取echarts数据***/
    this.getOptions = function(config, data) {
        var type = config.type;
        var options = {};
        switch (type) {
            //柱状图
            case 'bar-single':
                options = this.getSingleBarOpt(data); //单个柱状图
                break;
            case 'bar-color':
                options = this.getSingleColorBarOpt(data); //带颜色的单条柱状图
                break;

                //折线图
            case 'area-simple':
                options = this.getAreaSimpleOpt(data); //单条趋势线
                break;
            case 'trend-lines':
                options = this.getTrendLinesOpt(data); //多条趋势线
                break;
            case 'legend-lines':
                options = this.getLegendLinesOpt(data); //处理相同图例的多条趋势线
                break;
            case 'dense-lines':
                options = this.getDenseTrendOpt(data); //密集趋势线
                break;
            case 'tooltip-lines':
                options = this.getTooltipLinesOpt(data); //自定义显示tooltip
                break;

                //地图
            case 'map':
                options = this.getMapOpt(config, data); //中国和世界地图
                break;

                //饼图
            case 'pie-single':
                options = this.getSinglePieOpt(data); //单个饼图-圆环形状
                break;
            case 'pie-solid':
                options = this.getSolidPieOpt(config, data); //实心饼图
                break;
            case 'pie-rose':
                options = this.getRosePieOpt(data); //南丁格尔玫瑰图
                break;
            case 'pie-nest':
                options = this.getNestPieOpt(config, data); //嵌套饼图
                break;
            case 'pie-schedule':
                options = this.getSchedulePieOpt(data); //单个饼图-圆环形状-两个数据.类似进度条那种
                break;

                //单轴散点图
            case 'single-scatter':
                options = this.getSingleScatterOpt(data);
                break;

                //自定义圆环
            case 'circle':
                options = this.getCirclePie();
                break;

        }
        return options;
    }

    this.getCirclePie = function(id, num) {
        $('.circle').each(function(index, el) {
            if (id === $(this).attr('id')) {
                num = num * 3.6;
                if (num == 0) {
                    $(this).find('.p-left').css('transform', "rotate(" + num + "deg)");
                    $(this).find('.p-right').css('transform', "rotate(" + num + "deg)");
                } else if (num > 0 && num <= 180) {
                    $(this).find('.p-right').css('transform', "rotate(" + num + "deg)");
                } else if (num > 360) {
                    $(this).find('.p-right').css('transform', "rotate(180deg)");
                    $(this).find('.p-left').css('transform', "rotate(180deg)");
                } else {
                    $(this).find('.p-right').css('transform', "rotate(180deg)");
                    $(this).find('.p-left').css('transform', "rotate(" + (num - 180) + "deg)");
                };
            }
        });
    }

    //绘制单轴散点图
    this.getSingleScatterOpt = function(opt) {
        var days = [];
        var tags = [];
        var data = [];
        var length = 7;
        if (opt.days) {
            angular.extend(days, opt.days);
        };
        if (opt.tags) {
            angular.extend(tags, opt.tags);
            if (opt.tags.length > 7) {
                length = opt.tags.length;
            } else {
                length = 7;
            }
        };
        if (opt.data) {
            angular.extend(data, opt.data);
        };
        var sHeight = 60;
        var options = {
            tooltip: {
                position: 'bottom',
                trigger: 'item',
                transitionDuration: 0,
                formatter: function(obj) {
                    var data = obj.data;
                    return '<div style=" font-size: 14px;padding-bottom: 2px;">' +
                        '日期：' + days[data[0]] + '</br>' +
                        '权重：' + data[1].toFixed(2) +
                        '</div>'
                }
            },
            title: [],
            singleAxis: [],
            series: []
        };
        var interval = 1;
        if (days) {
            if (days.length > 0) {
                if (days.length <= 7) {
                    interval = 0;
                } else if (days.length > 7 && days.length <= 14) {
                    interval = 1;
                } else {
                    interval = 2;
                };
            };
        };

        if (opt.tags instanceof Array) {
            echarts.util.each(tags, function(day, idx) {
                options.title.push({
                    textBaseline: 'middle',
                    top: idx * 60 + 55,
                    left: 20,
                    text: (function() {
                        var t = day.split('');
                        var a = t.map(function(d, i) {
                            if (i != 0 && i % 7 == 0) {
                                return d + '\n';
                            }
                            return d;
                        });
                        return a.join('');
                    })(),
                    textStyle: {
                        fontSize: 14
                    }
                });
                options.singleAxis.push({
                    left: 150,
                    type: 'category',
                    boundaryGap: false,
                    data: days,
                    top: idx * 60 + 50,
                    height: 10,
                    axisLabel: {
                        interval: interval,
                        rotate: 20
                    }
                });
                options.series.push({
                    singleAxisIndex: idx,
                    coordinateSystem: 'singleAxis',
                    type: 'scatter',
                    data: [],
                    symbolSize: function(dataItem) {
                        var size = dataItem[1] * 50;
                        if (size > 8) {
                            return dataItem[1] * 50;
                        } else {
                            return 8;
                        }
                    }
                });
            });
            echarts.util.each(data, function(dataItem) {
                options.series[dataItem[0]].data.push([dataItem[1], dataItem[2]]);
            });
        }
        return options;
    }

    this.getRosePieOpt = function(opt) {
        var options = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                x: 'center',
                y: 'top',
                data: []
            },
            calculable: true,
            series: [{
                name: '',
                type: 'pie',
                radius: [20, 80],
                center: ['50%', '50%'],
                roseType: 'area',
                data: []
            }]
        }
        angular.extend(options.series, opt.series);
        return options;
    }

    //实心饼图
    this.getSolidPieOpt = function(config, opt) {
        var toopFormat = "{a} <br/>{b} : {c} ({d}%)"
        if (config.hide_actual_num) {
            toopFormat = "占比 <br/>{b} : {d}% "
        }
        var options = {
            tooltip: {
                trigger: 'item',
                formatter: toopFormat
            },
            legend: {
                orient: 'vertical',
                left: '10px',
                data: []
            },
            series: [{
                name: '',
                type: 'pie',
                radius: '55%',
                center: ['55%', '50%'],
                label: {
                    normal: {
                        show: true,
                        formatter: "{b}:{d}%"
                    }
                },
                data: [],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };
        angular.extend(options.legend, opt.legend);
        angular.extend(options.series, opt.series);
        return options

    }

    this.getSchedulePieOpt = function(opt) {
        var options = {
            tooltip: {
                show: true,
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                itemGap: 12,
                data: []
            },
            series: [{
                name: '',
                type: 'pie',
                radius: [70, 85],
                startAngle: 270,
                avoidLabelOverlap: false,
                hoverAnimation: false,
                legendHoverLink: false,
                label: {
                    normal: {
                        show: true,
                        position: 'center',
                        formatter: function(d) {
                            var x = ''
                            if (d.dataIndex == 0) {
                                x = d.percent + "%";
                            }
                            return x;
                        },
                        textStyle: {
                            color: '#f87475',
                            fontFamily: '微软雅黑',
                            fontSize: 32,
                            fontWeight: 'bolder'
                        }
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: 32,
                            fontWeight: 'bolder'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        color: function(params) {
                            // build a color map as your need.
                            var colorList = [
                                '#f87475', '#CACACA'
                            ];
                            return colorList[params.dataIndex]
                        },
                        label: {
                            show: true,
                            formatter: function() {
                                return 'eee';

                            }

                        },
                        labelLine: { show: false }
                    }
                },
                data: []
            }]
        }
        angular.extend(options.legend, opt.legend);
        if (opt.series) {
            options.series[0].data = [];
            angular.forEach(opt.series, function(v, k) {
                options.series[0].data.push(v);
            })
        };
        return options;
    }



    this.getSinglePieOpt = function(opt) {
        var options = {
            tooltip: {
                trigger: 'item',
                formatter: "{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: '10px',
                data: []
            },
            series: [{
                name: '',
                type: 'pie',
                radius: ['40%', '55%'],
                center: ['50%', '45%'],
                avoidLabelOverlap: true,
                label: {
                    normal: {
                        show: false,
                        formatter: "{b}:{d}%",
                        position: "outOfRange"
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            fontSize: '10',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false,
                        length: 1
                    }
                },
                data: []
            }]
        };
        angular.extend(options.legend, opt.legend);
        angular.extend(options.series, opt.series);
        return options;
    }

    //嵌套饼图
    this.getNestPieOpt = function(config, opt) {
        var options = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data: []
            },
            series: [{
                    name: '访问来源',
                    type: 'pie',
                    selectedMode: 'single',
                    radius: [0, '30%'],
                    label: {
                        normal: {
                            position: 'inner'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [],
                    itemStyle: {
                        normal: {
                            label: {
                                position: 'inner',
                                formatter: function(params) {
                                    if ((params.percent - 0).toFixed(0) >= 30) {
                                        return params.name;
                                    } else {
                                        return '';
                                    };
                                }
                            },
                            labelLine: {
                                show: false
                            }
                        }
                    },
                },
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['40%', '55%'],
                    data: []
                }
            ]
        };
        if (config.cond.legend == false) {
            options.legend.show = false;
        }
        angular.extend(options.legend, opt.legend);
        options.series[0].data = opt.inner;
        options.series[1].data = opt.out;
        return options;
    }


    this.getAreaSimpleOpt = function(opt) {
        var options = {
            /*color : ['#ff8f91'],*/
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '7%',
                right: '7%'
            },
            xAxis: {
                type: 'category',
                nameGap: 1,
                nameRotate: 45,
                boundaryGap: false,
                splitLine: { show: false },
                data: []
            },
            yAxis: {
                name: '',
                nameGap: 8,
                nameRotate: 0,
                type: 'value',
                z: 10,
                splitLine: { show: false },
                axisTick: { show: false },
                axisLabel: {
                    formatter: '{value}'
                }
            },
            series: [{
                name: '',
                type: 'line',
                data: [],
                markPoint: {
                    symbol: 'circle',
                    symbolSize: [12, 5],
                    data: [
                        { type: 'max', name: '最大值' },
                        { type: 'min', name: '最小值' }
                    ],
                    itemStyle: {
                        normal: {
                            color: '#cc3131'
                        }
                    },
                    label: {
                        normal: {
                            position: [10, -10],
                            textStyle: {
                                fontWeight: 'bold',
                                color: '#cc3131'
                            }
                        },
                        emphasis: {
                            position: [10, -10],
                            textStyle: {
                                fontWeight: 'bold',
                                color: '#cc3131'
                            }
                        }
                    }
                },
                smooth: true,
                areaStyle: {
                    normal: {
                        /*color: '#ff8f91'*/
                    }
                }
            }]
        }
        angular.extend(options, opt);
        return options;
    }

    this.getTooltipLinesOpt = function(opt) {
        var name = []
        if (opt.series != undefined) {
            for (var x = 0; x < opt.series.length; x++) {
                name[x] = opt.series[x].name;
            }
        }
        var options = {
            tooltip: {
                trigger: 'axis',
                position: function(pt) {
                    return [pt[0], '10%'];
                },
                formatter: function(params) {
                    var res = '';
                    var tip = '';
                    if (params && (params.componentType == "markPoint" || params.componentType == "markLine")) {
                        return params.seriesName + params.name + ":" + params.value;
                    }
                    for (var i = 0; i < params.length; i++) {
                        var a = params[i].name;
                        var c = a.replace(/:00/, ":59");
                        var b = '-';
                        var abc = a + '' + b + '' + c;
                        res = "</br>" + "<span style='display:inline-block;margin-right:5px;border-radius:10px;height:9px;width:9px;background-color:" +
                            params[i].color + "'></span>" + name[i] + " : " + params[i].data;
                        tip = tip + res;
                    }
                    tip = abc + tip;
                    return tip;
                }
            },
            grid: {
                left: '7%',
                right: '7%'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                splitLine: { show: false },
                axisLabel: { interval: 0 },
                data: []
            },
            yAxis: {
                name: '',
                nameGap: 8,
                type: 'value',
                splitLine: { show: false },
                axisTick: { show: false },
                axisLabel: {
                    formatter: '{value}'
                }
            },
            series: [{
                name: '',
                type: 'line',
                data: [],
                markPoint: {
                    symbol: 'circle',
                    symbolSize: 10,
                    data: [
                        { type: 'max', name: '最大值' },
                        { type: 'min', name: '最小值' }
                    ],
                    itemStyle: {
                        normal: {
                            color: '#cc3131'
                        }
                    },
                    label: {
                        normal: {
                            position: [10, -10],
                            textStyle: {
                                fontWeight: 'bold',
                                color: '#cc3131'
                            }
                        },
                        emphasis: {
                            position: [10, -10],
                            textStyle: {
                                fontWeight: 'bold',
                                color: '#cc3131'
                            }
                        }
                    }
                },
                smooth: true,
                areaStyle: {
                    normal: {}
                }
            }]
        }
        options.series = [];
        angular.extend(options.xAxis, opt.xAxis);
        if (opt.yAxis) {
            angular.extend(options.yAxis, opt.yAxis);
        }
        if (opt.series) {
            var isMulti = false;
            if (opt.series.length > 1) {
                isMulti = true;
            }
            angular.forEach(opt.series, function(v, k) {
                var i = {
                    name: v.name,
                    type: 'line',
                    data: v.data
                };
                if (!isMulti) {
                    var i = {
                        name: v.name,
                        type: 'line',
                        data: v.data,
                        markPoint: {
                            symbol: 'circle',
                            symbolSize: [12, 5],
                            data: [
                                { type: 'max', name: '最大值' }
                            ],
                            itemStyle: {
                                normal: {
                                    color: '#cc3131'
                                }
                            },
                            label: {
                                normal: {
                                    position: [10, -10],
                                    textStyle: {
                                        fontWeight: 'bold',
                                        color: '#cc3131'
                                    }
                                },
                                emphasis: {
                                    position: [10, -10],
                                    textStyle: {
                                        fontWeight: 'bold',
                                        color: '#cc3131'
                                    }
                                }
                            }
                        },
                        markLine: {
                            data: [
                                { type: 'average', name: '平均值' }
                            ]
                        },
                        smooth: true,
                        areaStyle: {
                            normal: {}
                        }
                    };
                } else {
                    var i = {
                        name: v.name,
                        type: 'line',
                        data: v.data
                    };
                }
                options.series.push(i);
            })
        };
        return options;
    }

    this.getDenseTrendOpt = function(opt) {
        var name = ''
        if (opt.series != undefined) {
            var name = opt.series[0].name
        }
        var options = {
            tooltip: {
                trigger: 'axis',
                position: function(pt) {
                    return [pt[0], '10%'];
                },
                formatter: function(params) {
                    if (params && (params.componentType == "markPoint" || params.componentType == "markLine")) {
                        return params.seriesName + params.name + ":" + params.value;
                    }
                    var a = params[0].name;
                    var c = a.replace(/:00/, ":59");
                    var b = '-';
                    var abc = a + '' + b + '' + c;
                    return abc + "</br>" + "<span style='display:inline-block;margin-right:5px;border-radius:10px;height:9px;width:9px;background-color:" +
                        params[0].color + "'></span>" + name + ":" + params[0].data;
                }
            },
            legend: {
                top: 'bottom',
            },
            grid: {
                left: '7%',
                right: '10%',
                bottom: '15%',
                containLabel: true
            },
            xAxis: {
                nameGap: 7,
                nameRotate: 45,
                type: 'category',
                boundaryGap: false,
                splitLine: { show: false },
                axisLabel: {},
                data: []
            },
            yAxis: {
                type: 'value',
                nameRotate: 0,
                nameGap: 8,
                splitLine: { show: false },
                axisTick: { show: false },
                axisLabel: {
                    formatter: '{value}'
                }
            },
            dataZoom: [{
                type: 'inside',
                start: 0,
                end: 100
            }, {
                start: 0,
                end: 100
            }],
            series: [{
                name: '',
                type: 'line',
                smooth: true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    normal: {

                    }
                },
                markPoint: {
                    symbol: 'circle',
                    symbolSize: [12, 5],
                    data: [
                        { type: 'max', name: '最大值' },
                        { type: 'min', name: '最小值' }
                    ],
                    itemStyle: {
                        normal: {
                            color: '#cc3131'
                        }
                    },
                    label: {
                        normal: {
                            position: [10, -10],
                            textStyle: {
                                fontWeight: 'bold',
                                color: '#cc3131'
                            }
                        },
                        emphasis: {
                            position: [10, -10],
                            textStyle: {
                                fontWeight: 'bold',
                                color: '#cc3131'
                            }
                        }
                    }
                },
                areaStyle: {
                    normal: {}
                },
                data: []
            }]
        };
        angular.extend(options, opt);
        return options;
    }


    //相同图例的多条趋势线
    this.getLegendLinesOpt = function(opt) {
        var legendMap = {};
        if (opt) {
            if (opt.legendMap) {
                legendMap = opt.legendMap;
                angular.forEach(legendMap, function(value, key) {
                    if (value == 'default') {
                        legendMap[key] = '其他';
                    }
                })
            };
        }
        var options = {
            tooltip: {
                trigger: 'axis',
                formatter: function(params) {
                    var str = "";
                    if (params instanceof Array) {
                        str += params[0].name + '</br>';
                        for (var i = 0; i < params.length; i++) {
                            var colorTip = '<div style="width:9px;height:9px;border-radius:5px;display:inline-block;margin-right:4px;background-color:' + params[i].color + '"></div>';
                            if (typeof(params[i].data) == 'function' || params[i].data == '_') {
                                if (params[i].seriesName) {
                                    str += colorTip + legendMap[params[i].seriesName] + ' : ' + 0 + '</br>'
                                }
                            } else {
                                if (params[i].seriesName) {
                                    str += colorTip + legendMap[params[i].seriesName] + ' : ' + params[i].data + '</br>';
                                }
                            }
                        }
                    }
                    return str;
                }
            },
            legend: {
                x: 'center',
                y: 'left',
                formatter: function(name) {
                    return legendMap[name];
                },
                data: []
            },
            grid: {
                left: '3%',
                right: '7%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                name: '',
                nameRotate: 45,
                type: 'category',
                nameTextStyle: {
                    color: "#333",
                    fontSize: 12
                },
                boundaryGap: false,
                splitLine: { show: false },
                data: []
            },
            yAxis: {
                name: '',
                nameGap: 8,
                nameRotate: 0,
                nameTextStyle: {
                    color: "#333",
                    fontSize: 12
                },
                type: 'value',
                splitLine: { show: false },
                axisTick: { show: false },
                axisLabel: {
                    formatter: '{value}'
                }
            },
            series: [{
                name: '',
                type: 'line',
                data: [],
                markPoint: {
                    symbol: 'circle',
                    symbolSize: 10,
                    data: [
                        { type: 'max', name: '最大值' },
                        { type: 'min', name: '最小值' }
                    ],
                    itemStyle: {
                        normal: {
                            color: '#016eba'
                        }
                    },
                    label: {
                        normal: {
                            position: [10, -10],
                            textStyle: {
                                fontWeight: 'bold',
                                color: '#016eba'
                            }
                        },
                        emphasis: {
                            position: [10, -10],
                            textStyle: {
                                fontWeight: 'bold',
                                color: '#016eba'
                            }
                        }
                    }

                },
                markLine: {
                    data: [
                        { type: 'average', name: '平均值' }
                    ]
                },
                areaStyle: {
                    normal: {}
                }
            }]
        }
        options.series = [];
        angular.extend(options.legend, opt.legend);
        angular.extend(options.xAxis, opt.xAxis);
        if (opt.yAxis) {
            angular.extend(options.yAxis, opt.yAxis);
        }

        if (opt.series) {
            var isMulti = false;
            if (opt.series.length > 1) {
                isMulti = true;
            }
            angular.forEach(opt.series, function(v, k) {
                if (!isMulti) {
                    var i = {
                        name: v.name,
                        type: 'line',
                        data: v.data,
                        markPoint: {
                            symbol: 'circle',
                            symbolSize: 10,
                            data: [
                                { type: 'max', name: '最大值' }
                            ],
                            itemStyle: {
                                normal: {
                                    color: '#016eba'
                                }
                            },
                            label: {
                                normal: {
                                    position: [10, -10],
                                    textStyle: {
                                        fontWeight: 'bold',
                                        color: '#016eba'

                                    }
                                },
                                emphasis: {
                                    position: [10, -10],
                                    textStyle: {
                                        fontWeight: 'bold',
                                        color: '#016eba'
                                    }
                                }
                            }
                        },
                        markLine: {
                            data: [
                                { type: 'average', name: '平均值' }
                            ]
                        },
                        smooth: true,
                        areaStyle: {
                            normal: {}
                        }
                    };
                } else {
                    var i = {
                        name: v.name,
                        type: 'line',
                        data: v.data
                    };
                }
                options.series.push(i);
            })
        };
        return options;
    }

    //多条趋势线
    this.getTrendLinesOpt = function(opt) {
        var options = {
            tooltip: {
                trigger: 'axis'
                    /*formatter:function(params){
                      console.log(params);
                      var str="";
                      if(params instanceof Array){
                        str+=params[0].name+'</br>';
                        for (var i = 0; i < params.length; i++) {
                           if(typeof(params[i].data)=='function' || params[i].data=='_'){
                              if(params[i].seriesName){
                                str+=params[i].seriesName+' : '+ 0 +'</br>'
                              }
                           }else{
                              if(params[i].seriesName){
                                str+=params[i].seriesName+' : '+params[i].data +'</br>';
                              }
                           }
                        }
                      }
                      return str;
                    }*/
            },
            legend: {
                x: 'center',
                y: 'left',
                data: []
            },
            grid: {
                left: '3%',
                right: '7%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                name: '',
                nameRotate: 45,
                type: 'category',
                nameTextStyle: {
                    color: "#333",
                    fontSize: 12
                },
                boundaryGap: false,
                splitLine: { show: false },
                data: []
            },
            yAxis: {
                name: '',
                nameGap: 8,
                nameRotate: 0,
                nameTextStyle: {
                    color: "#333",
                    fontSize: 12
                },
                type: 'value',
                splitLine: { show: false },
                axisTick: { show: false },
                axisLabel: {
                    formatter: '{value}'
                }
            },
            series: [{
                name: '',
                type: 'line',
                data: [],
                markPoint: {
                    symbol: 'circle',
                    symbolSize: [12, 5],
                    data: [
                        { type: 'max', name: '最大值' },
                        { type: 'min', name: '最小值' }
                    ],
                    itemStyle: {
                        normal: {
                            color: '#cc3131'
                        }
                    },
                    label: {
                        normal: {
                            position: [10, -10],
                            textStyle: {
                                fontWeight: 'bold',
                                color: '#cc3131'
                            }
                        },
                        emphasis: {
                            position: [10, -10],
                            textStyle: {
                                fontWeight: 'bold',
                                color: '#cc3131'
                            }
                        }
                    }

                },
                markLine: {
                    data: [
                        { type: 'average', name: '平均值' }
                    ]
                },
                areaStyle: {
                    normal: {}
                }
            }]
        }
        options.series = [];
        angular.extend(options.legend, opt.legend);
        angular.extend(options.xAxis, opt.xAxis);
        if (opt.yAxis) {
            angular.extend(options.yAxis, opt.yAxis);
        }

        if (opt.series) {
            var isMulti = false;
            if (opt.series.length > 1) {
                isMulti = true;
            }
            angular.forEach(opt.series, function(v, k) {
                if (!isMulti) {
                    var i = {
                        name: v.name,
                        type: 'line',
                        data: v.data,
                        markPoint: {
                            symbol: 'circle',
                            symbolSize: [12, 5],
                            data: [
                                { type: 'max', name: '最大值' }
                            ],
                            itemStyle: {
                                normal: {
                                    color: '#cc3131'
                                }
                            },
                            label: {
                                normal: {
                                    position: [10, -10],
                                    textStyle: {
                                        fontWeight: 'bold',
                                        color: '#cc3131'

                                    }
                                },
                                emphasis: {
                                    position: [10, -10],
                                    textStyle: {
                                        fontWeight: 'bold',
                                        color: '#cc3131'
                                    }
                                }
                            }
                        },
                        markLine: {
                            data: [
                                { type: 'average', name: '平均值' }
                            ]
                        },
                        smooth: true,
                        areaStyle: {
                            normal: {}
                        }
                    };
                } else {
                    var i = {
                        name: v.name,
                        type: 'line',
                        data: v.data
                    };
                }
                options.series.push(i);
            })
        };
        return options;
    }

    this.getSingleColorBarOpt = function(opt) {
        var options = {
            tooltip: {
                trigger: 'item'
            },
            calculable: true,
            grid: {
                left: '3%',
                right: '7%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                nameGap: 7,
                nameRotate: 45,
                splitLine: { show: false },
                data: []
            }],
            yAxis: [{
                nameGap: 8,
                nameRotate: 0,
                splitLine: { show: false },
                type: 'value'
            }],
            series: [{
                name: '',
                itemStyle: {
                    normal: {
                        color: function(params) {
                            // build a color map as your need.
                            var colorList = [
                                '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                                '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                                '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                            ];
                            return colorList[params.dataIndex]
                        },
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{b}\n{c}'
                        }
                    }
                },
                barMaxWidth: 60,
                type: 'bar',
                data: [],
            }]
        }
        angular.extend(options, opt);
        return options;

    }
    this.getSingleBarOpt = function(opt) {
        var label = {
            normal: {
                show: true,
                position: 'top'
            }
        }
        var options = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: []
            },
            grid: {
                left: '5%',
                right: '10%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                nameGap: 1,
                nameRotate: 45,
                splitLine: { show: false },
                data: []
            }],
            yAxis: [{
                name: '',
                nameGap: 7,
                nameRotate: 0,
                type: 'value',
                splitLine: { show: false },
            }],
            series: [{
                name: '',
                type: 'bar',
                barMaxWidth: 35,
                barMinHeight: 1,
                data: [],
                label: {

                }
            }]
        };
        angular.extend(options, opt);
        if (opt.series) {
            if (opt.series instanceof Array) {
                angular.forEach(opt.series, function(value, key) {
                    if (value.data.length <= 6) {
                        options.series[key].label = label;
                    };
                })
            };
        };
        return options;
    }






    //地图
    this.getMapOpt = function(config, opt) {
        var nameMap = {
            'Afghanistan': '阿富汗',
            'Angola': '安哥拉',
            'Albania': '阿尔巴尼亚',
            'United Arab Emirates': '拉伯联合酋长国',
            'Argentina': '阿根廷',
            'Armenia': '亚美尼亚',
            'French Southern and Antarctic Lands': '法属南半球和南极领地',
            'Australia': '澳大利亚',
            'Austria': '奥地利',
            'Azerbaijan': '阿塞拜疆',
            'Burundi': '布隆迪',
            'Belgium': '比利时',
            'Benin': '贝宁',
            'Burkina Faso': '布基纳法索',
            'Bangladesh': '孟加拉国',
            'Bulgaria': '保加利亚',
            'The Bahamas': '巴哈马',
            'Bosnia and Herzegovina': '波斯尼亚和黑塞哥维那',
            'Belarus': '白俄罗斯',
            'Belize': '伯利兹',
            'Bermuda': '百慕大',
            'Bolivia': '玻利维亚',
            'Brazil': '巴西',
            'Brunei': '文莱达鲁萨兰国',
            'Bhutan': '不丹',
            'Botswana': '博茨瓦纳',
            'Central African Republic': '中非共和国',
            'Canada': '加拿大',
            'Switzerland': '瑞士',
            'Chile': '智利',
            'China': '中国',
            'Ivory Coast': '科特迪瓦',
            'Cameroon': '喀麦隆',
            'Democratic Republic of the Congo': '刚果民主共和国',
            'Republic of the Congo': '刚果民主共和国',
            'Colombia': '哥伦比亚',
            'Costa Rica': '哥斯达黎加',
            'Cuba': '古巴',
            'Northern Cyprus': '塞浦路斯',
            'Cyprus': '塞浦路斯',
            'Czech Republic': '捷克共和国',
            'Germany': '德国',
            'Djibouti': '吉布提',
            'Denmark': '丹麦',
            'Dominican Republic': '多米尼加共和国',
            'Algeria': '阿尔及利亚',
            'Ecuador': '厄瓜多尔',
            'Egypt': '埃及',
            'Eritrea': '厄立特里亚',
            'Spain': '西班牙',
            'Estonia': '爱沙尼亚',
            'Ethiopia': '埃塞俄比亚',
            'Finland': '芬兰',
            'Fiji': '斐济',
            'Falkland Islands': '福克兰群岛',
            'France': '法国',
            'Gabon': '加蓬',
            'United Kingdom': '英国',
            'Georgia': '格鲁吉亚',
            'Ghana': '加纳',
            'Guinea': '几内亚',
            'Gambia': '冈比亚',
            'Guinea Bissau': '几内亚',
            'Equatorial Guinea': '赤道几内亚',
            'Greece': '希腊',
            'Greenland': '格陵兰',
            'Guatemala': '危地马拉',
            'French Guiana': '法属圭亚那',
            'Guyana': '圭亚那',
            'Honduras': '洪都拉斯',
            'Croatia': '克罗地亚',
            'Haiti': '海地',
            'Hungary': '匈牙利',
            'Indonesia': '印度尼西亚',
            'India': '印度',
            'Ireland': '爱尔兰',
            'Iran': '伊朗',
            'Iraq': '伊拉克',
            'Iceland': '冰岛',
            'Israel': '以色列',
            'Italy': '意大利',
            'Jamaica': '牙买加',
            'Jordan': '约旦',
            'Japan': '日本',
            'Kazakhstan': '哈萨克斯坦',
            'Kenya': '肯尼亚',
            'Kyrgyzstan': '吉尔吉斯斯坦',
            'Cambodia': '柬埔寨',
            'South Korea': '韩国',
            'Kosovo': '科索沃',
            'Kuwait': '科威特',
            'Laos': '老挝人民民主共和国',
            'Lebanon': '黎巴嫩',
            'Liberia': '利比里亚',
            'Libya': '阿拉伯利比亚民众国',
            'Sri Lanka': '斯里兰卡',
            'Lesotho': '莱索托',
            'Lithuania': '立陶宛',
            'Luxembourg': '卢森堡',
            'Latvia': '拉脱维亚',
            'Morocco': '摩洛哥',
            'Moldova': '摩尔多瓦共和国',
            'Madagascar': '马达加斯加',
            'Mexico': '墨西哥',
            'Macedonia': '马斯顿',
            'Mali': '马里',
            'Myanmar': '缅甸',
            'Montenegro': '黑山共和国',
            'Mongolia': '蒙古国',
            'Mozambique': '莫桑比克',
            'Mauritania': '毛里塔尼亚',
            'Malawi': '马拉维',
            'Malaysia': '马来西亚',
            'Namibia': '纳米比亚',
            'New Caledonia': '新喀里多尼亚',
            'Niger': '尼日尔',
            'Nigeria': '尼日利亚',
            'Nicaragua': '尼加拉瓜',
            'Netherlands': '荷兰',
            'Norway': '挪威',
            'Nepal': '尼泊尔',
            'New Zealand': '新西兰',
            'Oman': '阿曼',
            'Pakistan': '巴基斯坦',
            'Panama': '巴拿马',
            'Peru': '秘鲁',
            'Philippines': '菲律宾',
            'Papua New Guinea': '巴布亚新几内亚',
            'Poland': '波兰',
            'Puerto Rico': '波多黎各',
            'North Korea': '朝鲜',
            'Portugal': '葡萄牙',
            'Paraguay': '巴拉圭',
            'Qatar': '卡塔尔',
            'Romania': '罗马尼亚',
            'Russia': '俄罗斯联邦',
            'Rwanda': '卢旺达',
            'Western Sahara': '西撒哈拉',
            'Saudi Arabia': '沙特阿拉伯',
            'Sudan': '苏丹',
            'South Sudan': '南苏丹共和国',
            'Senegal': '塞内加尔',
            'Solomon Islands': '所罗门群岛',
            'Sierra Leone': '塞拉利昂',
            'El Salvador': '萨尔瓦多',
            'Somaliland': '索马里',
            'Somalia': '索马里',
            'Republic of Serbia': '塞尔维亚',
            'Suriname': '苏里南',
            'Slovakia': '斯洛伐克',
            'Slovenia': '斯洛文尼亚',
            'Sweden': '瑞典',
            'Swaziland': '斯威士兰',
            'Syria': '阿拉伯叙利亚共和国',
            'Chad': '乍得',
            'Togo': '多哥',
            'Thailand': '泰国',
            'Tajikistan': '塔吉克斯坦',
            'Turkmenistan': '土库曼斯坦',
            'East Timor': '东帝汶',
            'Trinidad and Tobago': '特立尼达和多巴哥',
            'Tunisia': '突尼斯',
            'Turkey': '土耳其',
            'United Republic of Tanzania': '坦桑尼亚联合共和国',
            'Uganda': '乌干达',
            'Ukraine': '乌克兰',
            'Uruguay': '乌拉圭',
            'United States of America': '美国',
            'Uzbekistan': '乌兹别克斯坦',
            'Venezuela': '委内瑞拉',
            'Vietnam': '越南',
            'Vanuatu': '瓦努阿图',
            'West Bank': '西岸',
            'Yemen': '也门',
            'South Africa': '南非',
            'Zambia': '赞比亚',
            'Zimbabwe': '津巴布韦'
        };
        var map = 'china';
        if (config.cond) {
            if (config.cond.map) {
                map = config.cond.map
            }
        }
        var series
        if (map == 'china') {
            series = {
                name: '中国',
                type: 'map',
                mapType: 'china',
                roam: false,
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            fontSize: 12,
                            color: '#4e3f3f'
                        }
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: 12,
                            color: '#4e3f3f'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        borderWidth: 0,
                        areaColor: '#c0c0c0'
                    },
                    emphasis: {
                        borderWidth: 0,
                        areaColor: '#ccc'
                    }
                },
                markPoint: {
                    symbol: 'pin'
                },
                data: []
            }
        } else if (map == 'world') {
            series = [{
                name: '世界',
                type: 'map',
                mapType: 'world',
                scaleLimit: {
                    min: 1,
                    max: 1.5,
                },
                selectedMode: 'multiple',
                roam: true,
                itemStyle: {
                    normal: {
                        borderWidth: 0,
                        areaColor: '#c0c0c0',
                    },
                    emphasis: {
                        borderWidth: 0,
                        areaColor: '#df6e6e',
                    }
                },
                label: {
                    normal: {
                        formatter: function(params) {
                            return nameMap[params.name];
                        }
                    },
                    emphasis: {
                        formatter: function(params) {
                            return nameMap[params.name];
                        }
                    }
                },
                markPoint: {
                    symbol: 'pin'
                },
                /*nameMap:nameMap,*/
                data: []
            }]
        }
        var options = {
            tooltip: {
                trigger: 'item',
                formatter: function(params) {
                    var value = (params.value + '').split('.');
                    value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
                    if (value != 'NaN') {
                        if (map == 'china') {
                            return params.seriesName + '<br/>' + params.name + ' : ' + value;
                        } else {
                            return params.seriesName + '<br/>' + nameMap[params.name] + ' : ' + value;
                        }
                    } else {
                        if (map == 'china') {
                            return params.name;
                        } else {
                            return nameMap[params.name];
                        }
                    }
                }
            },
            visualMap: {
                show: true,
                min: 0,
                max: 2500,
                left: 'left',
                top: 'bottom',
                text: ['高', '低'], // 文本，默认为数值文本
                calculable: true,
                itemWidth: 20,
                inRange: {
                    color: ['#fcd3d1', '#fbb0ad', '#ec6c69'],
                    symbolSize: [200, 200]
                },
                formatter: function(value) {
                    if (isNaN(value)) {
                        return '';
                    } else {
                        return Math.ceil(value);
                    };
                }
            },
            series: series
        };
        if (map == 'china') {
            options.series.data = [];
            var maxValue = 1;
            angular.forEach(opt.data, function(value, key) {
                value.value = Number(value.value);
                if (value.value > maxValue) {
                    maxValue = Number(value.value);
                }
                options.series.data.push(value);
            })

        } else if (map == 'world') {
            options.series[0].data = [];
            var maxValue = 1;
            angular.forEach(opt.data, function(value, key) {
                value.value = Number(value.value);
                if (value.value > maxValue) {
                    maxValue = Number(value.value);
                }
                options.series[0].data.push(value);
            })
        }
        options.visualMap.max = maxValue;
        var curIndx = 0;
        var mapType = [
            'china',
            // 23个省
            '广东', '青海', '四川', '海南', '陕西',
            '甘肃', '云南', '湖南', '湖北', '黑龙江',
            '贵州', '山东', '江西', '河南', '河北',
            '山西', '安徽', '福建', '浙江', '江苏',
            '吉林', '辽宁', '台湾',
            // 5个自治区
            '新疆', '广西', '宁夏', '内蒙古', '西藏',
            // 4个直辖市
            '北京', '天津', '上海', '重庆',
            // 2个特别行政区
            '香港', '澳门'
        ];
        //省市切换
        /* myChart.on('click', function(event) {
           if (event.name!=='台湾') {
             var len = mapType.length;
                   var mt = mapType[curIndx % len];
                   if (mt == 'china') {
                       // 全国选择时指定到选中的省份
                       var selected = event.name;
                       mt=event.name;
                         while (len--) {
                             if (mapType[len] == mt) {
                                 curIndx = len;
                             }
                         }  
                   }
                   else {
                       curIndx = 0;
                       mt = 'china';
                      
                   }
                   option.series[0].mapType = mt;
                   myChart.setOption(option);  
           }else{
             alert("对不起,暂时没有台湾地图");
           };
           
         });*/
        return options;
    }
})