var key = [];

var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
var player = {img:null, x: canvas.width/2, y: canvas.height/2, width: 50, height:50, sprite: "http://etc.usf.edu/clipart/40600/40690/pb_sq_40690_lg.gif"};
var img = new Image();
img.src = "images/square.jpg";
setInterval(function()
{
	ctx.drawImage(img, 0,0, 10, 10);    

},5);