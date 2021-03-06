
function LinkedList(){}
LinkedList.prototype = {
	length: 0,
	first: null,
	last: null
};


LinkedList.prototype.append = function (node){
	if(this.first === null){
		node.prev = node;
		node.next = node;
		this.first = node;
		this.last = node;
	}else{
		node.pref = this.last;
		node.next = this.first;
		this.first.pref = node;
		this.last.next = node;
		this.last.next = node;
		this.last = node;
	}
	this.length++;
};

LinkedList.remove = function(node){
	if(this.length >1){
		node.prev.next = node.next;
		node.next.prev = node.pref;
		if(node == this.first){this.first = node.next;}
		if(node == this.last){this.last = node.prev;}
	
	}else{
		this.first = null;
		this.last = null;
	}
	node.prev = null;
	node.next = null;
	this.length--;
};

LinkedList.Node = function(data){
	this.pref = null; this.next = null;
	this.data = data;
};
