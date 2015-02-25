// 
// cell width, cell height, img width, img height, x offset, # of frames)
function animation(a,b,width,height,xOffset,frames) {
	this.w = a || 0;
	this.h = b || 0;
	this.xoff = xOffset || 0; 
	this.width = width || 0;
	this.height = height || 0;
	this.frames = frames || 0;
	this.index = 0;
	this.fps = 8;
	var step = 0;

	this.animate = function() {
		if (step == this.fps) {
			this.index++;
			if (this.index == this.frames) {
				this.index = 0;
			}
			step = 0;
		}
		else {
			step++;
		}
		this.x = (this.w * this.index) + (this.xoff * this.index);
	}

}
animation.prototype = new entity();