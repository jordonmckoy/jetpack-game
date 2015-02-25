/////////////////////////////////////////
//
//	Jordon McKoy's Global Object Class v1.0
//	July 23, 2012
//
//	Supports:
//	- Global functions (update, render)
//	- Object creation
//  - Object deletion
//
//
//
//
//
//	
// Global Function implementation
// //////////////////////////////
// function update() {
// 		var i;
//		for (i = 0; i < arr.length; i++) {
//			objArray[i].update();
//			console.dir(objArray[i]);
//		}
//	}
//
/////////////////////////////////////////

var objArray = [] // Collection of all game objects

// Add Child
// Adds object to end of array list
function addChild(e) {
	objArray.push(e);
}

function destroyChild(e) {
	var i = 0, count = 0, found = false;
	// Check all instances for e
	// switch e
	// set count to i+1
	// use count
	// pop last instance
	for (i = 0; i < objArray.length; i++) {
		if (objArray[i] == e) {
			found = true;
			count = i+1;
			// overwrite current index and move all indexes after back one
			objArray[i] = objArray[count];
		}
		// if e has been found, use count to overwrite
		else if (found){
			count++;
			// make sure we stay within bounds
			if (count < objArray.length) {
				objArray[i] = objArray[count];
			}
			else {
				objArray.pop();
			}
			//console.log(i);
		}
	}
}

// Core object
// Customize for needs
// Default: x,y,width,height,context,img src
function entity(a,b,width,height,context,src) {
	this.live = false;
	this.x = a || 0;
	this.y = b || 0;
	this.width = width || 0;
	this.height = height || 0;
	this.img = new Image();
	this.img.src = src || null;
	this.context = context || null;

	// Creation function
	this.create = function(context) {
		this.live = true;
		addChild(this);
		if (this.context == null) {
			this.context = context || null;
		}
	}

	this.destroy = function() {
		this.live = false;
		destroyChild(this);
	}

	this.update = function() {
	}

	this.render = function() {
	}
}
/*
function child()
}
child.prototype = new entity(); */

