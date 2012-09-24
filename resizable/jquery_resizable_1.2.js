(function($){
	var resizing=false;	
	$.fn.resizable = function(opts){
		var ps = $.extend({
			parent:$(document),
            maxW:$(document).width(),
			maxH:$(document).height(),
			minW:0,
			minH:0,
			onResize:function(){},
			onMove:function(){},
			onStop:function(){}
        }, opts);
		
		return $(this).each(function(index, element) {
						
		$(this).data("resizeParent",ps.parent);
		
		$(this).append($('<div class="handler"></div>').css({"width":"40px",
        	"height":"40px",
        	"background":"url(../images/resize.png)",
        	"position":"absolute",
        	"right":"-15px",
        	"bottom":"-15px",
			"cursor":"pointer"}).bind('mousedown.resizeMode',function(e){
				e.stopPropagation();
				resizing=true;
				$(this).addClass('resize');
				ps.onResize();
			})).css("position","absolute");		

		ps.parent.bind({
			'mousemove.resizeMode':function(e){
			if(resizing){			
				var div=$('.resize').parent();
				var deg=((typeof(div.data('transform'))!="undefined")?(div.data('transform')):0);
				var w=Math.max(ps.minW,Math.min((e.pageX-div.offset().left),ps.maxW));
				var h=Math.max(ps.minH,Math.min((e.pageY-div.offset().top),ps.maxH));
				div.width(w);
				div.height(h);
				ps.onMove();
			  }	
			},
			'mouseup.resizeMode':function(e){
				if(resizing){
					e.stopPropagation()
					resizing=false;
					$('.resize').removeClass('resize');
					ps.onStop();
				}
			}
		});
		
  	 });
	}
	

	$.fn.deResizable = function(){
		return $(this).each(function(index, element) {
            $(this).find('.handler').remove();
		    $(this).data('resizeParent').unbind('mousemove.resizeMode').unbind('mouseup.resizeMode');//to be Checked
        });	
	}
	
})(jQuery);