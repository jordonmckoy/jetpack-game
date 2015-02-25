var downloadProgress;

var gameState = "load";

var gameScore, gameHealth;
var gamePaused = false;
var gameBG;

// Create content manager
var contentManager = new ContentManager();

function loadAssets() {
	// draw bg for load screen
	display_ctx.fillStyle = "#666666";
	display_ctx.fillRect(0,0,display_canvas.width,display_canvas.height);

	// start the load
	contentManager.startLoad();

	// change the game state & create start menu after pause
	gameState = "start";
	setTimeout(menuCreate,1200); // 1.2 sec
}

// Will check game state
function stateBehaviour() {
	switch(gameState) {
		case "start":
			menuCreate();
			break;
		case "game":
			gameManage();
			break;
		case "pause":
			pauseGame();
			break;
	}
}

function drawHUD() {
	hud_ctx.fillStyle = "#FFFFFF";
	hud_ctx.font = "16px Arial";
	hud_ctx.fillText("Health: " + gameHealth + "%",0,15);
	hud_ctx.fillText("Score: " + Math.floor(gameScore),0,35);
}

function gameManage() {
	// Initialize game variables
	if (gameScore == null) {
		gameScore = 0;
	}
	if (gameHealth == null) {
		gameHealth = 100;
	}

	// Initialize game objects
	gameBG = new entity(0,0,canvas.width,canvas.height,display_ctx,skyIMG.src);
	gameBG.update = function() {
		if (gameScore < 300) {
			this.x -= 0.3;
		} else if (gameScore < 1000) {
			this.x -= 0.4;
		} else if (gameScore < 2000) {
			this.x -= 0.6;
		} else if (gameScore < 3000) {
			this.x -= 0.8;
		}
		else {
			this.x -= 1;
		}
		
		if ((this.x + this.width) < 25) {
			this.x = 0;
		}
	}
	gameBG.render = function() {
		this.context.fillStyle = "#33CCFF";
		this.context.fillRect(0,0,this.width,this.height);
		try {
			this.context.drawImage(this.img,this.x,this.y);
		} catch (e) {console.log("failed draw");};
	}
	gameBG.create();

	// Create player
	player.create(ctx);

	EngineLoop();
}

function pauseGame() {
	if (gamePaused) {
		// game is already paused
		gamePaused = false;
		gameState = "game";
		gameLoop = requestAnimFrame(EngineLoop);
	} else {
		// game is not paused, pause it
		gamePaused = true;
		gameState = "paused";
		cancelAnimFrame(gameLoop);
	}
}