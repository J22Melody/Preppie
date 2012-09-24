(function($){
	var resizing=false;	
	$.fn.resizable = function(opts){
		return $(this).each(function(index, element) {
            var ps = $.extend({
            maxW:$(document).width(),
			maxH:$(document).height(),
			minW:0,
			minH:0,
			onResize:function(){},
			onMove:function(){},
			onStop:function(){}
        }, opts);
		
		$(this).append($('<div class="handler"></div>').css({"width":"40px",
        	"height":"40px",
        	"background":"url(icon.png)",
        	"position":"absolute",
        	"right":"-15px",
        	"bottom":"-15px",
			"cursor":"pointer"}).bind({
				'mousedown':function(e){
				e.stopPropagation();
				resizing=true;
				$(this).addClass('resize');
				ps.onResize();
			},
			'mouseup':function(){
				resizing=false;
				$(this).removeClass('resize');
				ps.onStop();
				e.stopPropagation();
			}
			})).css("position","absolute");
		
		$(document).bind('mousemove.resizeMode',function resizeMouseMoveHandler(e){
			if(resizing){			
				var div=$('.resize').parent();
				var w=Math.max(ps.minW,Math.min(e.clientX-div.offset().left,ps.maxW));
				var h=Math.max(ps.minH,Math.min(e.clientY-div.offset().top,ps.maxH));
				div.width(w);
				div.height(h);
				ps.onMove();
			}	
		});
		
  	 });
	}
	
	

	$.fn.deResizable = function(){
		$(this).find('.handler').remove();
		$(document).unbind('mousemove.resizeMode');//to be Checked
	}
})(jQuery);