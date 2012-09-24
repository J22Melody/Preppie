// JavaScript Document
//初始化一个元素的transform样式
function Preppie(opts){
	 this.configs = $.extend({
		parentSelector:'body',//看看能不能有更好的解决方法，body不太好
		stepSelector:'.step',
		curIndex:0
	},opts);
	
	this.styleProp = ('translate-x,translate-y,translate-z,'
					  + 'rotate-x,rotate-y,rotate-z,'
					  + 'scale-x,scale-y,scale-z,'
					  + 'scale,rotate,skew,'
					  + 'skew-x,skew-y').split(',');
	
	this.updateTransform = function(element){
		if(typeof element == 'number')
			element = $(this.configs.parentSelector).find(this.configs.stepSelector).eq(element);
		var style = new Array();
		for(var prop in this.styleProp){
			 prop = this.styleProp[prop];
			 if(element.data(prop) == undefined) 
				continue;
			 var value = element.data(prop);
			 if(prop.split('-')[0] == "translate"){
				 style.push(escapeProp(prop) + '(' + value + 'px)');
			 }else if(prop.split('-')[0] == 'scale'){
				 style.push(escapeProp(prop) + '(' + value + ')');
			 }else{
				style.push(escapeProp(prop) + '(' + value + 'deg)');
			 }
		}
		style = style.join(' ');
		element.css("-webkit-transform",style);
	}
	
	
	this.jumpTo = function(element){
		var stepSelector = this.configs.stepSelector;
		var container = this.configs.container;
		if(typeof element == 'number'){
			element = container.find(stepSelector).eq(element);
		}
	
	
		if(container.find('.active'))
			container.find('.active').removeClass("active");
		var style = new Array();	  
		for(var i = this.styleProp.length - 1; i >= 0; --i){
			 var prop = this.styleProp[i];
			 if(element.data(prop) == undefined) 
				continue;
			 var value = element.data(prop);
			 if(prop.split('-')[0] == "translate"){
				 style.push(escapeProp(prop) + '(' + (-value) + 'px)');//不要忘记空格
			 }else if(prop.split('-')[0] == 'scale'){
				 style.push(escapeProp(prop) + '(' + (1/value) + ')');
			 }else{
				 style.push(escapeProp(prop) + '(' + (-value) + 'deg)');
			 }
		}
		style = style.join(' ');
		container.css("-webkit-transform",style);	
		//居中
		$(stepSelector).css({
			'margin-left':(container.width() - element.width())/2 + 'px',
			'margin-right':(container.width() - element.width())/2 + 'px',
			'margin-top':(container.height() - element.height())/2 + 'px',
			'margin-bottom':(container.height() - element.height())/2 + 'px',
			'opacity':'0.3'
		});	
		element.css("opacity",element.data("opacity"));
		element.addClass("active");
	}

	this.init = function(){
		var myPreppie = this;//后面在each等方法里面用到的上下文
		var grandparentSelector =  this.configs.parentSelector;
		if(isNaN(Number($(grandparentSelector).css("height")))){
			$(grandparentSelector).height(screen.height);
		}
		if(isNaN(Number($(grandparentSelector).css("width")))){
			$(grandparentSelector).width(screen.width);
		}
	
		$(this.configs.stepSelector).css({
			'position':'absolute',
			'-webkit-transition-property':'opacity background-color',
			'-webkit-transition-duration':'1s'
			}).wrapAll($('<section>').css({
				'-webkit-transform-style':'preserve-3d',
				'-webkit-transform-origin':'center center',
				'-webkit-transition-property':'-webkit-transfor', 
				'-webkit-transition-duration':'1s',
				'position':'absolute',
				'width':'100%',
				'height':'100%',
			}));
		
		this.configs.container = $(this.configs.stepSelector).offsetParent();
		//记录stepSelector

		$(grandparentSelector).css({
			"-webkit-perspective":'1000px',
			'overflow':'hidden',
			'position':'absolute'
			});	
		//相比each方法，这个性能稍高,不过不知道后来查询到该element的过程是否会消耗更大
		for(var i = 0;i < this.configs.container.find(this.configs.stepSelector).length; ++i){
			this.updateTransform(i);
		}
		
		$(this.configs.stepSelector).each(function(index, element) {
			$(this).data("opacity",($(this).css("opacity") ? $(this).css("opacity") : 1));
		});	
		//键盘事件
		$(document).keyup(function(e) {
			switch(e.which){
			case 39:
			case 40:
				myPreppie.next();
				break;
			case 37:
			case 38:
				myPreppie.previous();
			}
		});
		//鼠标点击事件
		this.configs.container.find(this.configs.stepSelector).click(function(e) {
			myPreppie.jumpTo($(this));
		});
		
		this.jumpTo(0);
	}
	
	this.next = function(){
		var curIndex = this.configs.curIndex;
		var container = this.configs.container;
		var stepSelector = this.configs.stepSelector;
		if(curIndex >= container.find(stepSelector).length - 1)
			curIndex = 0;
		else ++curIndex;
		this.jumpTo(curIndex);
		this.configs.curIndex = curIndex;
	}

	this.previous = function(){
		var curIndex = this.configs.curIndex;
		var stepSelector = this.configs.stepSelector;
		if(curIndex <= 0)
			curIndex = container.find(stepSelector).length - 1;
		else --curIndex;
		this.jumpTo(curIndex);
		this.configs.curIndex = curIndex;
	}
}




function escapeProp(prop){
	prop = prop.split('-');
	var result = prop[0];
	if(prop.length == 2){
		result += prop[1].toUpperCase();
	}
	return result;
}
