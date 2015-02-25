function menuCreate() {

	if (gameState == "start") {
		// set variables
		gameScore = null;
		gameHealth = null;

		// add resources to the stage
		startBtn.create(display_ctx);

		// edit resource behaviour
		startBtn.click = function() {
			//console.log("start game");
			// change game state and destroy self
			gameState = "game";
			startBtn.destroy();
			stateBehaviour();
		}

		// clear screen
		clr(display_ctx,canvas.width,canvas.height);

		// set new bg colour
		display_ctx.fillStyle = "#33CCFF";
		display_ctx.fillRect(0,0,display_canvas.width,display_canvas.height);
		
		// draw startBtn
		startBtn.render();
	} else if (gameState == "gameover") {
		gameState = "start";
		cancelAnimFrame(gameLoop);
		menuCreate();
	}
}