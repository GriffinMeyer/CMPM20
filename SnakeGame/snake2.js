var key = [];

var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
canvas.style.background = '#000000';
var player = {img:null, x: canvas.width/2, y: canvas.height/2, width: 50, height:50, sprite: "http://etc.usf.edu/clipart/40600/40690/pb_sq_40690_lg.gif"};
var img = new Image();
img.src = "images/square.jpg";

var direction = "right";

var x = 0;
var y = 0;

document.onkeydown=function(e)
{
    code=window.event?e.keyCode:e.which;
    key[code]=1;
};
document.onkeyup=function(e)
{
    code=window.event?e.keyCode:e.which;
    key[code]=0;
};



function test(x, y, color){
	this.x = x;
	this.y = y;
	this.color = color;
}
var snakeArray = new Array();
newSnake = new test(0,0, "#FF0000");

//snakeArray.push({x: 0, y: 0});

function pushSnake(){
	for(var i = 0; i< 5; i++){
		snakeArray.push({x: (i*12), y: 0});
	}
}
pushSnake();

function keyCheck(){
	
	if(key[37]){
    	direction = "left";
    }
    if(key[38]){
    	direction = "up";
    }
    if(key[39]){
    	direction = "right";
    }
    if(key[40]){
    	direction = "down";
    }
	
}

var speed = 5;
setInterval(function(){
	keyCheck();
},5);




setInterval(function()
{
	
    canvas.width=canvas.width;
    if(direction == "right"){
    	x+=speed;
    	ctx.fillStyle="#FF0000";
    }
    if(direction == "left"){
    	x-=speed;
    	ctx.fillStyle="#0000FF";
    }
    if(direction == "up"){
    	y-=speed;
    	ctx.fillStyle="#FFFF00";
    }
    if(direction == "down"){
    	y+=speed;
    	ctx.fillStyle="#00CC00";
    }
	//ctx.drawImage(img, 0,0, 10, 10);
	//ctx.fillRect(x,y,10,10);
	//ctx.fillRect(snakeArray[0].x,y,10,10);
	var nx = snakeArray[0].x;
	var nx = snakeArray[0].y;
	nx++;
	
	for(var i = 0; i < snakeArray.length; i++){
		ctx.fillRect(snakeArray[i].x,y,10,10);
	}
	
},60);