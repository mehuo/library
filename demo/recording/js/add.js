var app = new Vue({
	el:'#add',
	data:{
		incomes:[
			{desc:'工资',value:'20000'},
			{desc:'公积金',value:'2000'}
		],
		add_item:{desc:'',value:0},
		in_edit_index:'',
		in_edit:false,
		expends:[
			{desc:'房贷',value:'4000'},
			{desc:'房租',value:'2000'},
			{desc:'买衣服',value:'1000'},
			{desc:'超市',value:'500'},
			{desc:'吃饭',value:'500'},
			{desc:'零花',value:'400'},
		],
		out_add_item:{desc:'',value:0},
		out_edit_index:'',
		out_edit:false,
		in_value:0,
		out_value:0,
		gap:0
	},
	methods:{
		setPanel:function(type){
			if(type == 'in'){
				$('.income').show();
				$('.expend').hide();
			}else{
				$('.income').hide();
				$('.expend').show();
			}
		},
		add:function(type){
			if(type == 'in'){
				this.incomes.push(this.add_item);
				this.add_item = {desc:'',value:0};
			}else{
				this.expends.push(this.out_add_item);
				this.out_add_item = {desc:'',value:0};
			}
		},
		edit:function(type,item,index){
			if(type == 'in'){
				this.in_edit_index = index;
				this.add_item = item;
				this.in_edit = true;
			}else{
				this.out_edit_index = index;
				this.out_add_item = item;
				this.out_edit = true;
			}
		},
		doEdit:function(type){
			if(type == 'in'){
				this.incomes[this.in_edit_index] = this.add_item;
				this.in_edit_index = '';
				this.in_edit = false;
				this.add_item = {desc:'',value:0};
			}else{
				this.expends[this.out_edit_index] = this.out_add_item;
				this.out_edit_index = '';
				this.out_edit = false;
				this.out_add_item = {desc:'',value:0};
			}
		},
		deleteI:function(type,index){
			if(type == 'in'){
				this.incomes.splice(index,1);
			}else{
				this.expends.splice(index,1);
			}
		},
		emptyValue:function(event){
			$(event.target).val('');
		},
		calculateFunc:function(){
			this.in_value = 0;
			this.out_value = 0;
			var that = this;
			$.each(this.incomes,function(k,v){
				that.in_value += parseInt(v.value);
			})
			$.each(this.expends,function(k,v){
				that.out_value += parseInt(v.value);
			})
			this.gap = this.in_value - this.out_value;
			$(".result").show();
			if(this.gap > 0){
				$('#result_num').addClass('z');
				$('#result_num').removeClass('f');
			}else{
				$('#result_num').addClass('f');
				$('#result_num').removeClass('z');
			}
		}
	}
})