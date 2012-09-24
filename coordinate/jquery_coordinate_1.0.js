(function($){
	$.fn.coordinate=function(){
var temp=$('<canvas></canvas>').css({"position":"absolute",
    "-webkit-transform":"translateX(-4000px) translateY(-4000px)",
	"opacity":"0.5",
	"left":"0",
	"top":"0",
	"z-index":"-10",
	"border":"1px solid #c3c3c3"}); 
var div=$(this).wrapAll($('<div>')).after(temp);
var height=8000;
var width=8000;

//物理长宽
$('canvas').height(height).width(width);
var cvs=temp[0];
//逻辑长宽
cvs.height=height;
cvs.width=width;

var context=cvs.getContext("2d");
context.font="1px sans-serif";
for(var x=0.5;x<width;x+=50){
context.moveTo(x,0);
context.lineTo(x,height);
context.fillText(x-0.5,x,height);
}
for(var y=0.5;y<height;y+=50){
context.moveTo(0,y);
context.lineTo(width,y);
context.fillText(y-0.5,width-20,y+10);
}
context.strokeStyle="silver";
context.stroke();
}
})(jQuery);
