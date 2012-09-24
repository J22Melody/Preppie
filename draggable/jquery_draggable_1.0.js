//(function($){
	var dragging=false;
				
	$.fn.draggable=function(opts){
		var ps = $.extend({
            maxX:$(document).width(),
			maxY:$(document).height(),
			minX:0,
			minY:0,
			onDrag:function(){},
			onMove:function(){},
			onStop:function(){}
        }, opts);
		
        var div=$('this').css({"cursor":"pointer"});//这句话无效啊 = =
		div.css({"position":"absolute"});
		

		div.mousedown(function(){
			dragging=true;
			$(this).addClass("drag");
			ps.onDrag();
		});
		
		$(document).mouseup(function(){
			dragging=false;
			$(this).removeClass("drag");
			ps.onStop();
		});
		
		$(document).mousemove(function(e){
			if(dragging){
				var xx =( e.originalEvent.x-($('.drag').width())/2 )|| (e.originalEvent.layerX-($('.drag').width())/2) ; 
                var yy =( e.originalEvent.y-($('.drag').height())/2)|| (e.originalEvent.layerY -($('.drag').height())/2);
				xx=xx>ps.minX?xx:ps.minX;
				yy=yy>ps.minY?yy:ps.minY;
				xx=xx<ps.maxX?xx:ps.maxX;
				yy=yy<ps.maxY?yy:ps.maxY;
				$('.drag').offset({top:(yy) ,left:xx});
				ps.onMove();
			}		
		});
		
	}
//})(jQuery);