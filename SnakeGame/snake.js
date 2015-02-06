//Initlize 

var canvas = document.getElementById("canvas");
var width = canvas.width;
var height = canvas.height;
var ctx = canvas.getContext("2d");



canvas.style.background = '#000000';


window.onkeydown = function(e){
	switch(e.keyCode){
		case 37:
			snake.left();
			break;
			
		case 38:
			snake.up();
			break;
		
		case 39:
			snake.right();
			break;
			
		case 40:
			snake.down();
			break;
		
		
	}
};

//Define basic queue function
function queue(){
	var that = this;
	that.array = [];
}

queue.prototype = {
	constructor: queue,
	
	insert: function(elem){
		this.array.push(elem);
	},
	
	pop: function (){
		var retVal = this.arr[0];
		var newArray = new Array(this.arr.length -1);
		for (var i = 0; i < newArray.length; i++){
			newArray[i] = this.arr[i + 1];
		}
	},
	
	getFirst: function(){
		return this.arr[this.arr.length -1];
	},
	
	indexOf: function(index){
		return this.arr[index];
	},
	
	length: function (){
		return this.arr.length;
	}
	
};

//Coordinate function
function coords(x,y){
	var that = this;
	that.x = x * 10;
	that.y = y * 10;
}


//the snake function
function snake(x,y, length){
	var that = this;
	that.snakeObj = new queue();
	for(var i = 0; i < length; i++){
		that.snakeObj.insert(new coords(x+1,y));
	}
	that.direction = new coords(1,0);
	that.head = that.snakeObj.getLast();
}

snake.prototype = {
	constructor: snake,
	
	getHead: function (){
		return this.head;
	},
	
	getNewHead: function(){
		var newHead =
		new coords(
			parseInt(this.head.x + this.direction.x)/10,
			praseInt(this.head.y + this.direction.y)/10
	);
	return newHead;
	},
	
	move: function(){
		var nextHead = this.getNewHead();
		this.snakeObj.insert(newHead);
		this.snakeObj.pop();
		
		this.head = nextHead;
	},
	
	left: function(){
		if(this.direction.x !== 1 && this.direction.y !==0){
			var leftDir = new coords(-1,0);
			this.direction = leftDir;
			//ctx.fillStyle="#FF0000";
		}
	},
	
	right: function(){
		if(this.direction.x !== -1 && this.direction.y !== 0){
			var rightDir = new coords(1,0);
			this.direction = rightDir;
		}
	},
	
	up: function(){
		if(this.direction.x !== 0 && this.direction !== 1){
			var upDir = new coords(0,-1);
			this.direction = upDir;
		}
	},
	
	down: function(){
		if(this.direction.x !==0 && this.direction !== -1){
			var downDir = new coords(0,1);
			this.direction = downDir;
		}
	} 
};

//Food logic
function food(width, height){
	var x = parseInt((Math.random() * width)/10);
	var y = parseInt((Math.random() * height)/10);
	
	this.coordinates = new coords(x,y);
}

//draw stage
function drawStage(ctx, width, height){
	canvas.style.background = '#000000';
}

function randColor(){
	var rand = parseInt(Math.random()*4);
	if(rand == 0){ctx.fillStyle="red";}
	if(rand == 1){ctx.fillStyle="green";}
	if(rand == 2){ctx.fillStyle="yellow";}
	if(rand == 3){ctx.fillStyle="red";}
}

function placeFood(ctx, food){
	randColor();
	ctx.fillRect(food.coordinates.x,food.coordinates.y,10,10);
	
}

function drawSnake(ctx, snake){
	var snakeObj = snake.snakeObj;
	for(var i = 0; i < snakeObj.length(); i++){
		var snakePeice = snakeObj.indexOf(i);
		ctx.fillRect(snakePeice.x, snakePeice.y, 10, 10);
	}
}

function restart(){
	document.location.reload(false);
}

function run(ctx, snake, width, height){
	var newHead = snake.getNewHead();
	var snakeBody = snake.snakeObj;
	
	for(var i = 0; i < snakeBody.lenth(); i++){
		var elem = snakeBody.indexOf(i);
		if(elem.x === newHead.x && elem.y === newHead.y){
			restart();
		}
	}
	// check for collision with edge
		if (nextHead.x <= -10 ||
				nextHead.x >= width ||
				nextHead.y <= -10 ||
				nextHead.y >= height) {
			restart();
		}
		
		//food collision
		for(var i = 0; i <snakeBody.length(); i++){
			var elem = snakeBody.indexOf(i);
			if(elem.x === food.coordinates.x && elem.y === food.coordinates.y){
				var snakeNewHead = snake.getNewHead();
				snake.snakeBody.insert(snakeNewHead);
				snake.head = snakeNewHead;
				food = new food(width, height);
				score += 100;
				break
			}
		}
		snake.move();
		drawStage(ctx,width, height);
		placeFood(ctx, food);
		drawSnake(ctx, snake);
		ctx.fillText(score, 5, height -5);
}

var snake = new Snake(5,5,5);
var food = new Food(width, height);
var score = 0;
function gameLoop() {
		run(ctx, snake, width, height);
	}

	setInterval(gameLoop, 100);

