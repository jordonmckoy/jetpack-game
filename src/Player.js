// Player object

function Player(a,b,width,height,context,src) {
	// Base variables
	this.x = a || 0;
	this.y = b || 0;
	this.width = width || 0;
	this.height = height || 0;
	this.img = new Image();
	this.img.src = src || null;
	this.context = context || null;

	// Animation
	this.fly = new animation(26,61,235,61,0,9);
	this.fly.fps = 4;

	// 
	this.falling = true;
	this.gravity = .95;
	this.vY = 0;
	this.accelY = .35;

	this.update = function() {
		if (this.falling) {
			this.vY *= this.gravity;
			this.vY += this.accelY;
			this.y += this.vY;
		} 
		else {
			this.vY *= this.gravity;
			this.vY += this.accelY;
			this.y -= this.vY;
		}
		

		if (this.y > (canvas.height - 62)) {
			this.y = canvas.height - 62;
		} else if (this.y <= 0) {
			this.y = 2;
		}
	}

	this.render = function() {
		this.fly.animate();
		try {
			// (img,sx,sy,swidth,sheight,dx,dy,dwidth,dheight);
			this.context.drawImage(this.img,this.fly.x,this.fly.y,26,61,this.x,this.y,26,61);
		} catch (e) {console.log("failed draw");};
	}

	this.inputDown = function() {
		if (this.falling) {
			this.vY = 0;
		}
		this.falling = false;
		
	}

	this.inputUp = function() {
		if (!this.falling) {
			this.vY = 0;
		}
		this.falling = true;
	}
}
Player.prototype = new entity();