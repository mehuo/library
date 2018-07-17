'use strict';

angular.module('standard').controller('ctrl.daterangepicker', function ($scope) {

    $scope.date = {
        startDate: moment().subtract(1, "days"),
        endDate: moment()
    };
    $scope.opts = {
        language:'zn-ch',
        format : 'YYYY-MM-DD', //控件中from和to 显示的日期格式
        locale : {
            applyLabel : '确定',
            cancelLabel : '取消',
            fromLabel : '起始时间',
            toLabel : '结束时间',
            customRangeLabel : '自定义',
            daysOfWeek : [ '周日', '周一', '周二', '周三', '周四', '周五', '周六' ], 
            monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月' ]
        },
        ranges: {
            '今日': [moment().startOf('day'), moment()],
            '昨日': [moment().subtract('days', 1).startOf('day'), moment().subtract('days', 1).endOf('day')],
            '最近7日': [moment().subtract('days', 6), moment()],
            '最近30日': [moment().subtract('days', 29), moment()],
            '本月': [moment().startOf("month"),moment().endOf("month")],
            '上个月': [moment().subtract(1,"month").startOf("month"),moment().subtract(1,"month").endOf("month")]
        },
        opens : 'right',    // 日期选择框的弹出位置
        buttonImageOnly: true
    };

    $scope.date1 = {
        startDate: moment().subtract(1, "days"),
        endDate: moment()
    };

    $scope.opts_ranges = {
        language:'zn-ch',
        format : 'YYYY-MM-DD', //控件中from和to 显示的日期格式
        locale : {
            applyLabel : '确定',
            cancelLabel : '取消',
            daysOfWeek : [ '周日', '周一', '周二', '周三', '周四', '周五', '周六' ], 
            monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月' ]
        },
        buttonImageOnly: true
    };
    
    $scope.events = {
        'startDate': $scope.date.startDate,
        'endDate': $scope.date.endDate
    }
    $scope.opts_events = {
        language:'zn-ch',
        format : 'YYYY-MM-DD', //控件中from和to 显示的日期格式
        locale : {
            applyLabel : '确定',
            cancelLabel : '取消',
            daysOfWeek : [ '周日', '周一', '周二', '周三', '周四', '周五', '周六' ], 
            monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月' ]
        },
        eventHandlers : {'apply.daterangepicker': function(ev, picker) {
            $scope.events.endDate = ev.model.endDate.format(ev.opts.format);
            $scope.events.startDate = ev.model.startDate.format(ev.opts.format);
        }},
        buttonImageOnly: true
    };
    
    $scope.opts_increment = {
        language:'zn-ch',
        'timePicker': true,
        'timePicker24Hour': true,
        'timePickerIncrement': 30,
        format : 'YYYY-MM-DD', //控件中from和to 显示的日期格式
        locale : {
            applyLabel : '确定',
            cancelLabel : '取消',
            daysOfWeek : [ '周日', '周一', '周二', '周三', '周四', '周五', '周六' ], 
            monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月' ]
        },
        eventHandlers : {'apply.daterangepicker': function(ev, picker) {
            $scope.events.endDate = ev.model.endDate.format(ev.opts.format);
            $scope.events.startDate = ev.model.startDate.format(ev.opts.format);
        }},
        buttonImageOnly: true
    };
});
