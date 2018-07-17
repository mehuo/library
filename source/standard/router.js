angular.module('standard').config(function($stateProvider, $urlRouterProvider, NavData) {
  $urlRouterProvider.when('', '/home');
  $urlRouterProvider.when('/', '/home');
  var states = {};
  // 把多级state弄成单级的，并自动补充父级路由，方便后续处理
  NavData.forEach(function(group) {
    group.items.forEach(function(item) {
      // 处理多级state，自动添加各个父级state
      var paths = item.state.split(/\./g);
      var currentPath = '';
      paths.forEach(function(path) {
        currentPath += path;
        states[currentPath] = item;
        currentPath += '.'
      });
    });
  });
  
  // 遵循约定优于配置的原则自动批量注册路由
  for(var state in states){
      var item = states[state];
      var path = state.replace(/\./g, '/');
      var lastState = state.match(/(\w+)$/)[0];
      $stateProvider.state(state, {
        url: '/' + lastState,
        controller: 'ctrl.' + state,
        templateUrl: '/source/standard/views/' + path + '.html',
        label: item.label,
        files: item.files,
        description: item.description,
        authors: item.authors
      });
  }
});
