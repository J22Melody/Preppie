//(function($) {
// JavaScript Document
//初始化一个元素的transform样式
function initStyle(element){
	var style = new Array();
	var styleProp = ('translate-x,translate-y,translate-z,'
				  + 'rotate-x,rotate-y,rotate-z,'
				  + 'scale-x,scale-y,scale-z,'
				  + 'scale,rotate,skew,'
				  + 'skew-x,skew-y').split(',');		  
	for(var prop in styleProp){
		 prop = styleProp[prop];
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


function escapeProp(prop){
	prop = prop.split('-');
	var result = prop[0];
	if(prop.length == 2){
		result += prop[1].toUpperCase();
	}
	return result;
}


function init(containerSelector,stepSelector){
	//设置container的样式
	var superParentSelector =  containerSelector;
	if($(superParentSelector).css("height") == 'auto'){
		$(superParentSelector).height(screen.height);
	}
	
	$(stepSelector).css({
		'position':'absolute',
		'-webkit-transition-property':'opacity background-color',
		'-webkit-transition-duration':'1s',
		}).wrapAll($('<section>').css({
			'-webkit-transform-style':'preserve-3d',
			'-webkit-transform-origin':'center center',
			'-webkit-transition-property':'-webkit-transform', 
			'-webkit-transition-duration':'1s',
			'-webkit-transition-timing-function':'ease-in-out',
			'position':'absolute',
			'width':'100%',
			'height':'100%',
		}));
	container = $(stepSelector).offsetParent();
    
	//记录stepSelector
	container.data("stepSelector",stepSelector);

	$(superParentSelector).css({
		"-webkit-perspective":'1000px',
		'overflow':'hidden',
		'position':'absolute'
		});	
	container.find(stepSelector).each(function(index, element) {
        initStyle($(this));
    });
	//step记录一些属性
	$(stepSelector).each(function(index, element) {
        $(this).data("opacity",($(this).css("opacity") ? $(this).css("opacity") : 1));
    });
	
	//键盘事件
	$(document).keyup(function(e) {
        switch(e.which){
		case 39:
		case 40:
			jumpToNext(container);
			break;
		case 37:
		case 38:
			jumpToPrev(container);
		}
    });
	
	//鼠标点击事件
	container.find(stepSelector).click(function(e) {
		if(!$(this).hasClass("active"))
        	jumpTo($(this),container);
    });
	
	jumpTo(0,container);
	container.data("activeIndex",0);
}



//考虑一下性能，是否有必要初始化所有的css,每次跳转只是改变class 
function jumpTo(element,container){
	var stepSelector = container.data("stepSelector");
	if(typeof element == 'number'){
		element = container.find(stepSelector).eq(element);
	}


	if(container.find('.active'))
		container.find('.active').removeClass("active");
	var style = new Array();
	var styleProp = ('translate-x,translate-y,translate-z,'
				  + 'rotate-x,rotate-y,rotate-z,'
				  + 'scale-x,scale-y,scale-z,'
				  + 'scale,rotate,skew,'
				  + 'skew-x,skew-y').split(',');			  
	for(var i = styleProp.length - 1; i >= 0; --i){
		 var prop = styleProp[i];
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
		'opacity':'0.3',
		'cursor':'pointer'
	});	
	element.css({
		"opacity":element.data("opacity"),
		'cursor':'auto'
	});
	element.addClass("active");
}

function jumpToNext(container){
	var curIndex = container.data("activeIndex");
	var stepSelector = $(container).data("stepSelector");
	if(curIndex >= $(container).find(stepSelector).length - 1)
		curIndex = 0;
	else ++curIndex;
	jumpTo(curIndex,container);
	$(container).data("activeIndex",curIndex);
}

function jumpToPrev(container){
	var curIndex = container.data("activeIndex");
	var stepSelector = container.data("stepSelector");
	if(curIndex <= 0)
		curIndex = container.find(stepSelector).length - 1;
	else --curIndex;
	jumpTo(curIndex,container);
	$(container).data("activeIndex",curIndex);
}
//})(jQuery);