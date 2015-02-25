// Star object

function Star(a,b,width,height,context,src,speed) {
	// Base variables
	this.x = a || 0;
	this.y = b || 0;
	this.width = width || 0;
	this.height = height || 0;
	this.img = new Image();
	this.img.src = src || null;
	this.context = context || null;

	this.speed = speed || null;

	// Animation
	this.shine = new animation(24,24,this.w,this.h,0,4);

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
		i = 0;
		count = 0;
		found = false;
		for (i = 0; i < starArray.length; i++) {
			if (starArray[i] == e) {
				found = true;
				count = i+1;
				// overwrite current index and move all indexes after back one
				starArray[i] = starArray[count];
			}
			// if e has been found, use count to overwrite
			else if (found){
				count++;
				// make sure we stay within bounds
				if (count < starArray.length) {
					starArray[i] = starArray[count];
				}
				else {
					starArray.pop();
				}
				//console.log(i);
			}
		}
	}

	this.update = function() {
		this.x -= this.speed;

		// check if past boundry
		if (this.x < -25) {
			this.destroy();
		}

		// check if collision with player
		if ( (((this.x + this.width) >= player.x) && ((this.x) <= (player.x + player.width))) &&
			(((this.y + this.height) >= player.y) && ((this.y) <= (player.y + player.height))) ) {
				this.destroy();
				if (gameScore < 2000) {
					gameScore += 10;
				} else if (gameScore > 2050 && gameScore < 5000) {
					gameScore += 50;
				} else if (gameScore > 5000 && gameScore < 10000) {
					gameScore += 100;
				} else {
					gameScore += 150;
				}
		}
	}

	this.render = function() {
		this.shine.animate();
		try {
			// (img,sx,sy,swidth,sheight,dx,dy,dwidth,dheight);
			this.context.drawImage(this.img,this.shine.x,this.shine.y,24,24,this.x,this.y,24,24);
		} catch (e) {console.log("failed draw");};

	}
}
Star.prototype = new entity();