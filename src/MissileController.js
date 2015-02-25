var missileArray = [];
var createMissile = false;
var missileStepMax = 100;
var missileSteps = -0.01;
var missileSpeedMultiplier = 0;

function manageMissile() {
	if (missileSteps > missileStepMax || missileSteps <= 0) {
		missileSteps = 0;
		createMissile = true;
	}
	missileSteps += 0.2;

	if (gameState == "game" && createMissile == true) {
		if (gameScore > 1500 && gameScore < 4000) {
			spawnMissile(1);
		} else if (gameScore > 4050 && gameScore < 8200) {
			spawnMissile(2);
		} else if (gameScore > 8250 && gameScore < 13000) {
			missileSpeedMultiplier = 3;
			spawnMissile(3);
		} else if (gameScore > 13500) {
			missileSpeedMultiplier = 5;
			spawnMissile(4);
		}
	}
}

function spawnMissile(num1) {
	var ranX, ranY, ranIndex;
	var speed = 6 + missileSpeedMultiplier;
	createMissile = false;

	for (i = 0; i < num1; i++) {
		ranX = Math.floor(Math.random() * 500) + canvas.width; // 800 - 1200
		ranY = Math.floor(Math.random() * 365); // 0 - 365
		var myMissile = new Missile(ranX,ranY,46,19,ctx,missileIMG.src,speed); 
		missileArray.push(myMissile);
		myMissile.create();
	}
} // spawnMissile