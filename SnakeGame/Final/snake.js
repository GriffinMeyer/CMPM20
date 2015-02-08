	//Building queue object for snake
	function Queue() {
		var that = this;
		that.arr = [];
	}

	Queue.prototype = {
		constructor: Queue,

		enqueue: function (elem) {
			this.arr.push(elem);
		},

		pop: function () {
			var retValue = this.arr[0];
			var newArr = new Array(this.arr.length - 1);
			for (var i = 0; i < newArr.length; i++) {
				newArr[i] = this.arr[i + 1];
			}

			this.arr = newArr;
			return retValue;
		},

		getFirst: function () {
			return this.arr[0];
		},

		getLast: function () {
			return this.arr[this.arr.length - 1];
		},

		indexOf: function (index) {
			return this.arr[index];
		},

		length: function () {
			return this.arr.length;
		}
	};

	//coordinate object
	function coords(x, y) {
		var that = this;
		that.x = x * 10;
		that.y = y * 10;
	}

	//snake
	function Snake(x, y, bodyLength, color) {
		var that = this;
		this.color = color;
		that.snakeBody = new Queue();
		for (var i = 0; i < bodyLength; i++) {
			that.snakeBody.enqueue(new coords(x + i, y));
		}

		that.currentDirection = new coords(1, 0);
		that.head = that.snakeBody.getLast();
	}

	Snake.prototype = {
		constructor: Snake,

		getHead: function () {
			return this.head;
		},

		getNextHead: function () {
			var nextHead =
				new coords(
					parseInt(this.head.x + this.currentDirection.x) / 10,
					parseInt(this.head.y + this.currentDirection.y) / 10
				);

			return nextHead;
		},

		move: function () {
			var nextHead = this.getNextHead();
			this.snakeBody.enqueue(nextHead);
			this.snakeBody.pop();

			this.head = nextHead;
		},

		turnLeft: function () {
			if (this.currentDirection.x !== 1 && this.currentDirection.y !== 0) {
				var leftDirection = new coords(-1, 0);
				this.currentDirection = leftDirection;
			}
		},

		turnRight: function () {
			if (this.currentDirection.x !== -1 && this.currentDirection.y !== 0) {
				var rightDirection = new coords(1, 0);
				this.currentDirection = rightDirection;
			}
		},

		turnUp: function () {
			if (this.currentDirection.x !== 0 && this.currentDirection !== 1) {
				var upDirection = new coords(0, -1);
				this.currentDirection = upDirection;
			}
		},

		turnDown: function () {
			if (this.currentDirection.x !== 0 && this.curentDirection !== -1) {
				var downDirection = new coords(0, 1);
				this.currentDirection = downDirection;
			}
		}
	};

	//food
	function Food(width, height, color) {
		var minWidth = 10;
		var maxWidth = width - 10;
		var minHeight = 10;
		var maxHeight = height - 10;

		var x = parseInt((Math.random() * (maxWidth - minWidth) + minWidth) / 10);
		var y = parseInt((Math.random() * (maxHeight - minHeight) + minHeight) / 10);

		this.coords = new coords(x, y);
		this.color = color;
	}

	//draw black background
	function backgrnd(ctx, width, height) {

		ctx.fillStyle = "#000";
		ctx.fillRect(0, 0, width, height);
	}
	
	function randColor(){
	var rand = parseInt(Math.random()*4);
	var color = "";
	if(rand == 0){color = "red";}
	if(rand == 1){color = "green";}
	if(rand == 2){color ="yellow";}
	if(rand == 3){color ="blue";}
	return color;
}

	function drawFood(ctx, food, color) {

		ctx.fillStyle = color;
		ctx.fillRect(food.coords.x, food.coords.y, 10, 10);
		ctx.strokeRect(food.coords.x, food.coords.y, 10, 10);

	}

	function drawSnake(ctx, snake) {

		ctx.fillStyle = snake.color;
		ctx.strokeStyle = "#000";

		var snakeBody = snake.snakeBody;
		for (var i = 0; i < snakeBody.length(); i++) {
			var snakeElem = snakeBody.indexOf(i);
			ctx.fillRect(snakeElem.x, snakeElem.y, 10, 10);
			ctx.strokeRect(snakeElem.x, snakeElem.y, 10, 10);
		}

	
	}

	function restartGame() {
		document.location.reload(false);
	}

	// init variables
	var canvas = document.getElementById("canvas");
	var width = canvas.width;
	var height = canvas.height;
	var ctx = canvas.getContext("2d");

	var snake = new Snake(5, 5, 5, "blue");
	var food = new Food(width, height, "blue");
	var score = 0;
	var direction = "right";



	window.onkeydown = function (ev) {
		switch (ev.keyCode) {
			case 37:
			if(direction != "right"){
				direction = "left";
			snake.color = "yellow";
				snake.turnLeft();
			}
				break;
			
			case 38:
			if(direction != "down"){
			snake.color = "red";
			direction = "up";
				snake.turnUp();
			}
				break;
			case 39:
			if(direction != "left"){
			direction = "right";
			snake.color = "blue";
				snake.turnRight();
			}
				break;
			case 40:
			if(direction != "up"){
			direction = "down";
			snake.color = "green";
				snake.turnDown();
			}
				break;
		}
	};

	function run(ctx, snake, width, height) {
		var nextHead = snake.getNextHead();
		var snakeBody = snake.snakeBody;

		// check for collision with snake
		for (var i = 0; i < snakeBody.length(); i++) {
			var elem = snakeBody.indexOf(i);
			if (elem.x === nextHead.x && elem.y === nextHead.y) {
				restartGame();
			}
		}

		// check for out of bounds 
		if (nextHead.x <= -10 ||
				nextHead.x >= width ||
				nextHead.y <= -10 ||
				nextHead.y >= height) {
			restartGame();
		}
		
		if(snakeBody.length() == 0){
			restartGame();
		}

		// check for collision with food
		for (var i = 0; i < snakeBody.length() ; i++) {
			var elem = snakeBody.indexOf(i);
			if (elem.x === food.coords.x && elem.y === food.coords.y && food.color === snake.color) {
				var snakeNextHead = snake.getNextHead();
				snake.snakeBody.enqueue(snakeNextHead);
				snake.head = snakeNextHead;
				
				var color = randColor();
				food = new Food(width, height, color);
				
				score += 100;
				
				break;
			}
			
			if (elem.x === food.coords.x && elem.y === food.coords.y && food.color != snake.color) {
				var snakeNextHead = snake.getNextHead();
				snake.snakeBody.pop();
				
				var color = randColor();
				food = new Food(width, height, color);
				
				score -= 100;
				
				break;
			}
		}

		snake.move();
		backgrnd(ctx, width, height);
		
		drawSnake(ctx, snake);
		ctx.fillStyle = "blue";
		drawFood(ctx, food, food.color);
		ctx.fillStyle = "red";
		ctx.fillText(score, 5, height -5);
	}

	function game() {
		run(ctx, snake, width, height);
	}

	setInterval(game, 100);