var rootPath = getRootPath();
function getRootPath() {
      var scripts = document.getElementsByTagName("script"); 
  __FILE__ = scripts[scripts.length - 1].getAttribute("src");
  return __FILE__.substr( 0, __FILE__.lastIndexOf('/') + 1 );
}
document.write('<link rel="stylesheet" href="'+rootPath+'css/leftnav.css"></link rel="stylesheet">')
document.write('<link rel="stylesheet" href="'+rootPath+'css/home.css"></link rel="stylesheet">')
document.write('<link rel="stylesheet" href="'+rootPath+'css/buttons.css"></link rel="stylesheet">')
document.write('<link rel="stylesheet" href="'+rootPath+'css/switch.css"></link rel="stylesheet">')
document.write('<link rel="stylesheet" href="'+rootPath+'css/radio.css"></link rel="stylesheet">')
document.write('<link rel="stylesheet" href="'+rootPath+'css/checkbox.css"></link rel="stylesheet">')
document.write('<link rel="stylesheet" href="'+rootPath+'css/searchbox.css"></link rel="stylesheet">')
document.write('<link rel="stylesheet" href="'+rootPath+'css/filter.css"></link rel="stylesheet">')
document.write('<link rel="stylesheet" href="'+rootPath+'css/popup.css"></link rel="stylesheet">')
document.write('<link rel="stylesheet" href="'+rootPath+'css/table.css"></link rel="stylesheet">')
// document.write('<link rel="stylesheet" href="'+rootPath+'css/complextable.css"></link rel="stylesheet">')
// document.write('<link rel="stylesheet" href="'+rootPath+'css/pagetable.css"></link rel="stylesheet">')
document.write('<link rel="stylesheet" href="'+rootPath+'css/pagination.css"></link rel="stylesheet">')
document.write('<link rel="stylesheet" href="'+rootPath+'css/breadcrumb.css"></link rel="stylesheet">')
document.write('<link rel="stylesheet" href="'+rootPath+'css/tab.css"></link rel="stylesheet">')
document.write('<link rel="stylesheet" href="'+rootPath+'css/daterangepicker.css"></link rel="stylesheet">')
document.write('<link rel="stylesheet" href="'+rootPath+'css/downtime.css"></link rel="stylesheet">')
document.write('<link rel="stylesheet" href="'+rootPath+'css/layout.css"></link rel="stylesheet">')
document.write('<link rel="stylesheet" href="'+rootPath+'css/fakedata.css"></link rel="stylesheet">')
document.write('<link rel="stylesheet" href="'+rootPath+'css/scrollbar.css"></link rel="stylesheet">')
document.write('<link rel="stylesheet" href="'+rootPath+'css/selectlabels.css"></link rel="stylesheet">')
document.write('<link rel="stylesheet" href="'+rootPath+'css/password.css"></link rel="stylesheet">')
document.write('<link rel="stylesheet" href="'+rootPath+'css/customselect.css"></link rel="stylesheet">')
document.write('<link rel="stylesheet" href="'+rootPath+'css/alert.css"></link rel="stylesheet">')
document.write('<link rel="stylesheet" href="'+rootPath+'css/words.css"></link rel="stylesheet">')



