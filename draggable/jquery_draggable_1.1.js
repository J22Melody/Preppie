(function($){	
	var dragging=false;			
	$.fn.draggable = function(opts){
		var ps = $.extend({
			parent:$(document),
            maxX:$(document).width(),
			maxY:$(document).height(),
			minX:0,
			minY:0,
			onDrag:function(){},
			onMove:function(){},
			onStop:function(){}
        }, opts);
		

		return $(this).each(function(index, element) {
			$(this).data("dragParent",ps.parent);
			
				$(this).css({"position":"absolute"});
				
				$(this).bind({
					'mousedown.dragMode':function(e){
						e.stopPropagation();
						dragging=true;
						$(this).addClass('drag');
						ps.onDrag();
					}});
				ps.parent.bind({
					'mousemove.dragMode':function(e){
					   if(dragging){						  
						   var position = $('.drag').position();
						   var xx=Math.min(ps.maxX,Math.max(e.pageX-$('.drag').width()/2,ps.minX));
						   var yy=Math.min(ps.maxY,Math.max(e.pageY-$('.drag').height()/2,ps.minY));
							$('.drag').css({
								left:xx + 'px',
								top:yy + 'px'
							});
							ps.x = e.pageX;
							ps.y = e.pageY;
							ps.onMove();
					 }},
					'mouseup.dragMode':function(e){
						if(dragging){
							dragging=false;
						    e.stopPropagation();
						    ps.onStop();
						    $('.drag').removeClass('drag');
						}					
					}
				});
			
		});
	}
	
	$.fn.deDraggable = function(){
		return $(this).each(function(index, element) {
		    $(this).data('dragParent').unbind('mousemove.dragMode').unbind('mouseup.dragMode');//to be Checked
        });	
	}
})(jQuery);