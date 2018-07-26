'use strict';

//* 导航数据
angular.module('standard').constant('NavData', [
    {
        label: '首页',
        items: [
            {state: 'home',label: '首页',description: 'FE小组',authors: ['FE小组']}
        ]
    },
    {   label: '基本组件',
        items: [
            {state: 'buttons',authors: ['魅惑'],label: '按钮'},
            {state: 'switch',authors: ['魅惑'],label: '开关样式'},
            {state: 'radio',authors: ['魅惑'],label: '单选按钮'},
            {state: 'checkbox',authors: ['魅惑'],label: '复选框'},
            {state: 'searchbox',authors: ['魅惑'],label: '搜索框'},
            {state: 'table',authors: ['魅惑'],label: '表格样式'},
            {state: 'scrollbar',authors: ['媛媛'],label: '修改滚动条位置'},
            {state: 'layout',authors: ['媛媛'],label: '布局标准'},
        ]
    },
    {
        label:'扩展组件',
        items:[
            {state: 'breadcrumb',authors: ['魅惑'],label: '面包屑'},
            {state: 'filter',authors: ['魅惑'],label: '筛选条件'},
            {state: 'popup',authors: ['魅惑'],label: '弹出框'},
            {state: 'pagination',authors: ['魅惑'],label: '分页控件'},
            {state: 'complextable',authors: ['魅惑'],label: '复杂表格'},
            {state: 'pagetable',authors: ['魅惑'],label: '分页显示'},
            {state: 'selectlabels',authors: ['魅惑'],label: '标签选择'},
            {state: 'tab',authors: ['魅惑'],label: '标签tab'},
            {state: 'leftnav',authors: ['魅惑'],label: '左侧导航'},
            {state: 'daterangepicker',authors: ['魅惑'],label: '日期选择'},
            {state: 'customselect',authors: ['魅惑'],label: 'angular自定义的下拉框'},
            {state: 'words',authors: ['魅惑'],label: '添加词语'}
        ]
    },
    {
        label:'其他组件',
        items:[
            {state: 'password',authors: ['魅惑'],label: '验证密码强度'},
            {state: 'alert',authors: ['魅惑'],label: '自定义提示框'},
        ]
    }
]);