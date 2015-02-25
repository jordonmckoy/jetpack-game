// Button object
// Used for menu screens
function button(a,b,width,height,context,src) {
	this.x = a || 0;
	this.y = b || 0;
	this.width = width || 0;
	this.height = height || 0;
	this.img = new Image();
	this.img.src = src || null;
	this.context = null;

	this.render = function(x1,y1,w1,h1,dx,dy,dw,dh) {
		try {
			this.context.drawImage(this.img,x1 || this.x,y1 || this.y);	
		} catch (e) {console.log("failed draw");};	
	}

	// Check if the user has clicked this button
	this.clickCheck = function() {
		// if we are on the stage
		if (this.live) {
			// check mouse coordinates
			if ((mouseX > this.x && mouseX < (this.x + this.width)) &&
				(mouseY > this.y && mouseY < (this.y + this.height))) {
				this.click(); // run the mouse click code
			}
		}
	}

	this.click = function() {
	}
}
button.prototype = new entity();