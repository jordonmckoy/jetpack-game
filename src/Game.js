var canvas,
	display_canvas,
	ctx,
	display_ctx;
var gameLoop; // RAF will be stored here
var i;

///////////////////////////////////////////////////////
// Request Anim Frame

// shim layer
window.requestAnimFrame = function(callback){
    return ( 
    	window.requestAnimationFrame ||
	    window.webkitRequestAnimationFrame ||
	    window.mozRequestAnimationFrame ||
	    window.oRequestAnimationFrame ||
	    window.msRequestAnimationFrame ||
	    function(callback){
	        window.setTimeout(callback, 1000 / 60); // 58-60fps
	    }
    );
}();

window.cancelAnimFrame = function(callback){
	return (
		window.cancelAnimationFrame || window.mozCancelAnimationFrame
	);
}

///////////////////////////////////////////////////////


function init() {
	canvas = document.getElementById("Gamecanvas");
	display_canvas = document.getElementById("Displaycanvas");
	hud_canvas = document.getElementById("HUDcanvas");
	ctx = canvas.getContext("2d");
	display_ctx = display_canvas.getContext("2d");
	hud_ctx = hud_canvas.getContext("2d");

	canvas.height = 400;
	canvas.width = 800;
	display_canvas.height = 400;
	display_canvas.width = 800;
	hud_canvas.height = 50;
	hud_canvas.width = 150;
	hud_canvas.x = 650;
	hud_canvas.y = 0;

	eventHandelers();
	loadAssets();
}

function eventHandelers() {
	// Click event handeler
	$('#Gamecanvas').click(function(e) {
		// if we are accepting mouse interaction
		getMousePos(e.pageX,e.pageY);
		checkHit(mouseX,mouseY);
	});
/*
	$('#container').bind('keydown',function(e) {
		console.log("down");
		keyDown(e);
	});

	$('#Gamecanvas').bind('keyup',function(e) {
		console.log("up");
		keyUp(e);
	});
*/
	$(document).keydown(function(e) {
		switch(e.keyCode) {
			case 38:
				if (gameState == "game") {
					player.inputDown();
				}
				break;
			case 80:
				//if (gameState == "game") {
					pauseGame();
				//} 
				break;
		}
	});

	$(document).keyup(function(e) {
		switch(e.keyCode) {
			case 38:
				if (gameState == "game") {
					player.inputUp();
				}
				break;
		}
	});

	function keyDown(e) {
		switch(e.keyCode) {
			case 38:
				player.inputDown();
				break;
		}
	}

	function keyUp(e) {
		switch(e.keyCode) {
			case 38:
				player.inputUp();
				break;
		}
	}

	$('#Gamecanvas').mousedown(function(e) {
		if (gameState == "game") {
			player.inputDown();
		}
	});

	$('#Gamecanvas').mouseup(function(e) {
		if (gameState == "game") {
			player.inputUp();		
		}
	});
}

// Check the mouse position
function getMousePos (ePageX,ePageY) {
	mouseX = ePageX - (canvas.offsetLeft); 
	mouseY = ePageY - (canvas.offsetTop);
//	console.log(mouseX + "," + mouseY);
}

// Check 
function checkHit (mouseX,mouseY) {
	var i,j;
	//console.log(mouseX + "," + mouseY);
	for (i=0; i < objArray.length; i++) {
		if (objArray[i] != null) {
			if (typeof objArray[i].clickCheck === 'function') {
				objArray[i].clickCheck();
			}
		}
	}
}

function EngineLoop(){
 
	// place the rAF *before* the render() to assure as close to 
    // 60fps with the setTimeout fallback.
    // request new frame
    if (!gamePaused) {
    	gameLoop = requestAnimFrame(EngineLoop);
    }
    
    // update
 	update();

    // clear
    clr(ctx,canvas.width,canvas.height);
    clr(display_ctx,canvas.width,canvas.height);
    clr(hud_ctx,canvas.width,canvas.height);
 
    // draw
 	render();

 	if (gameState == "paused") {
 		try {
 			display_ctx.drawImage(pausedIMG,(canvas.width/2)-185,(canvas.height/2)-37);
 		} catch (e) {console.log("failed draw");};
 	} else if (gameState == "gameover") {
 		for (i=0; i < objArray.length; i++) {
			if (objArray[i] != null) {
				objArray[i].destroy();
			}
		}
		// clear
	    clr(ctx,canvas.width,canvas.height);
	    clr(display_ctx,canvas.width,canvas.height);
	    clr(hud_ctx,canvas.width,canvas.height);
	    // set new bg colour
		display_ctx.fillStyle = "#33CCFF";
		display_ctx.fillRect(0,0,display_canvas.width,display_canvas.height);
 		try {
 			display_ctx.drawImage(gameoverIMG,(canvas.width/2)-231,(canvas.height/2)-36);
 		} catch (e) {console.log("failed draw");};
 		setTimeout(menuCreate,3000);
 	}
}

function update() {
	if (gameHealth <= 0) {
		gameState = "gameover";
		cancelAnimFrame(gameLoop);
	}
	gameScore += 0.2;
	manageStars();
	manageRocket();
	manageMissile();
	for (i=0; i < objArray.length; i++) {
		if (objArray[i] != null) {
			objArray[i].update();
		}
	}
}

function clr(context,width,height) {
    context.clearRect(0,0,width,height);
}

function render() {
	drawHUD();
	for (i=0; i < objArray.length; i++) {
		if (objArray[i] != null) {
			objArray[i].render();
		}
	}
}	