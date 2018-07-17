'use strict';

angular.module('standard', [
    'ui.router',
    'hljs',
    'daterangepicker',
    'pascalprecht.translate',
    'chieffancypants.loadingBar'
])/*.config(['$translateProvider',function($translateProvider){
  var lang = window.localStorage.lang||'cn';
	$translateProvider.preferredLanguage(lang);
	$translateProvider.useStaticFilesLoader({
		prefix: '/js/i18n/',
		suffix: '.json'
	});
}]);
*/