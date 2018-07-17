var rootPath = getRootPath();

document.write('<script src="'+rootPath+'app.js"></script>')
document.write('<script src="'+rootPath+'/lib/angular-ui-router.min.js"></script>')
document.write('<script src="'+rootPath+'/lib/highlight.pack.js"></script>')
document.write('<script src="'+rootPath+'/lib/angular-highlightjs.js"></script>')

document.write('<script src="'+rootPath+'/directives/nav.js"></script>')
document.write('<script src="'+rootPath+'/directives/brief.js"></script>')
document.write('<script src="'+rootPath+'/directives/viewSource.js"></script>')
document.write('<script src="'+rootPath+'/directives/viewStatus.js"></script>')
document.write('<script src="'+rootPath+'/directives/page.js"></script>')
document.write('<script src="'+rootPath+'/directives/page2.js"></script>')
document.write('<script src="'+rootPath+'/directives/angularSelect.js"></script>')
document.write('<script src="'+rootPath+'/directives/angularInput.js"></script>')
document.write('<script src="'+rootPath+'/directives/word.js"></script>')

document.write('<script src="'+rootPath+'/configs/nav-data.js"></script>')
document.write('<script src="'+rootPath+'/configs/authors.js"></script>')


document.write('<script src="'+rootPath+'/controllers/leftnav.js"></script>')
document.write('<script src="'+rootPath+'/controllers/home.js"></script>')
document.write('<script src="'+rootPath+'/controllers/buttons.js"></script>')
document.write('<script src="'+rootPath+'/controllers/switch.js"></script>')
document.write('<script src="'+rootPath+'/controllers/inputs.js"></script>')
document.write('<script src="'+rootPath+'/controllers/radio.js"></script>')
document.write('<script src="'+rootPath+'/controllers/checkbox.js"></script>')
document.write('<script src="'+rootPath+'/controllers/dropdown.js"></script>')
document.write('<script src="'+rootPath+'/controllers/searchbox.js"></script>')
document.write('<script src="'+rootPath+'/controllers/filter.js"></script>')
document.write('<script src="'+rootPath+'/controllers/popup.js"></script>')
document.write('<script src="'+rootPath+'/controllers/table.js"></script>')
document.write('<script src="'+rootPath+'/controllers/complextable.js"></script>')
document.write('<script src="'+rootPath+'/controllers/pagetable.js"></script>')
document.write('<script src="'+rootPath+'/controllers/pagination.js"></script>')
document.write('<script src="'+rootPath+'/controllers/breadcrumb.js"></script>')
document.write('<script src="'+rootPath+'/controllers/panel.js"></script>')
document.write('<script src="'+rootPath+'/controllers/tab.js"></script>')
document.write('<script src="'+rootPath+'/controllers/leftnav.js"></script>')
document.write('<script src="'+rootPath+'/controllers/daterangepicker.js"></script>')
document.write('<script src="'+rootPath+'/controllers/downtime.js"></script>')
document.write('<script src="'+rootPath+'/controllers/layout.js"></script>')
document.write('<script src="'+rootPath+'/controllers/fakedata.js"></script>')
document.write('<script src="'+rootPath+'/controllers/scrollbar.js"></script>')
document.write('<script src="'+rootPath+'/controllers/selectlabels.js"></script>')
document.write('<script src="'+rootPath+'/controllers/password.js"></script>')
document.write('<script src="'+rootPath+'/controllers/customselect.js"></script>')
document.write('<script src="'+rootPath+'/controllers/alert.js"></script>')
document.write('<script src="'+rootPath+'/controllers/words.js"></script>')


document.write('<script src="'+rootPath+'router.js"></script>')




function getRootPath() {
      var scripts = document.getElementsByTagName("script"); 
  __FILE__ = scripts[scripts.length - 1].getAttribute("src");
  return __FILE__.substr( 0, __FILE__.lastIndexOf('/') + 1 );
}