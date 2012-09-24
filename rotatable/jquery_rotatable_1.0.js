(function($){	
	var rotating=false;			
	//var waiting=false;//控制转动速度
	
	$.fn.rotatable = function(opts){
	
		var ps = $.extend({
			parent:$(document),
			onRotate:function(){},
			onMove:function(){},
			onStop:function(){}
        }, opts);
		

		return $(this).each(function(index, element) {
			$(this).data("rotateParent",ps.parent);
			
			$(this).append($('<div class="handler"></div>').css({"width":"40px",
        	"height":"40px",
        	"background":"url(../images/rotate.png)",
        	"position":"absolute",
        	"right":"-15px",
        	"top":"-15px",
			"cursor":"pointer"}).bind({
					'mousedown.rotateMode':function(e){
						e.stopPropagation();
						rotating=true;
						$(this).parent().addClass('rotate');
						ps.onRotate();
					}})).css("position","absolute");
		
				ps.parent.bind({
					'mousemove.rotateMode':function(e){
					   if(rotating){
						   //if(!waiting){
							   e.stopPropagation();
							   var temp=$('.rotate');
						       var x1=temp.offset().left+temp.width();
						       var y1=temp.offset().top;
						       var x2=e.pageX;
						       var y2=e.pageY;						 
						       var x3=temp.offset().left+temp.width()/2;
						       var y3=temp.offset().top+temp.height()/2;						      
						       var a=Math.sqrt((x1-x3)*(x1-x3)+(y1-y3)*(y1-y3));						  
						       var b=Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
						       var c=Math.sqrt((x2-x3)*(x2-x3)+(y2-y3)*(y2-y3));					   	   
						       var sum=(a*a+c*c-b*b)/(2*a*c);
						       var deg=Math.acos(sum)*180/Math.PI;
						       if((x2+y2)<(x1+y1)){deg=-deg;}
						       temp.css("transform","rotate("+deg+"deg)").data('transform',deg);
						       ps.onMove();
							   /*waiting=true;
							   setTimeout(function(){waiting=false;},50);*/
						   //}			
					 }},
					'mouseup.rotateMode':function(e){
						if(rotating){
							e.stopPropagation();
							rotating=false;
							$('.rotate').removeClass('rotate');
						    ps.onStop();					    
						}					
					}
				});
				
				//这行解决rotate后drag一卡一卡的情况.（不能完全解决.=.=)
				$(this).unbind('mouseup.rotateMode');
				
			
		});
	}
	
	$.fn.deRotatable = function(){
		return $(this).each(function(index, element) {
			$(this).find('.handler').remove();
		    $(this).data('rotateParent').unbind('mousemove.rotateMode').unbind('mouseup.rotateMode');//to be Checked
        });	
	}
})(jQuery);