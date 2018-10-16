;(function(global,$){


	function buildTree(treeid,data){
		var treeDom = '<ul>';
		for (var i = 0; i < data.length; i++) {
			treeDom += '<li id="'+treeid+'_'+data[i].id+'">';
			treeDom += '<a>'+data[i].name+'</a>';
			console.log(data[i].children);
			if(data[i].children && data[i].children.length>0){
				treeDom += buildTree(treeid,data[i].children);
			}
			treeDom += '</li>'
		}
		treeDom += '</ul>';
		return treeDom;
	}

	$.fn.Ftree = {
		init:function(id,data){
			var html = buildTree(id,data);
			$("#"+id).append(html);
		}
	}

})(this,jQuery)