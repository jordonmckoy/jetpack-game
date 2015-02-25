var starArray = [];
var createStars = false;
var starStepMax = 100;
var starSteps = -0.01;
var starSpeedMultiplier = 0;

function manageStars() {
	if (starSteps > starStepMax || starSteps <= 0) {
		starSteps = 0;
		createStars = true;
	}
	starSteps += 0.25;

	if (gameState == "game" && createStars == true) {
		if (gameScore < 300) {
			spawnStars(10);
		} else if (gameScore > 350 && gameScore < 1000) {
			spawnStars(10);
		} else if (gameScore > 1050 && gameScore < 2000) {
			spawnStars(15);
		} else if (gameScore > 2050 && gameScore < 3200) {
			starSpeedMultiplier = 0.5;
			spawnStars(18);
		} else if (gameScore > 3250 && gameScore < 6000) {
			starSpeedMultiplier = 1;
			spawnStars(18);
		} else if (gameScore > 6050 && gameScore < 10000) {
			starSpeedMultiplier = 1.5;
			spawnStars(21);
		} else {
			starSpeedMultiplier = 2;
			spawnStars(21);
		}
	}
}

function spawnStars(num) {
	var ranX, ranY, ranSpeed, ranIndex;
	var speed = 2.5 + starSpeedMultiplier;
	createStars = false;

	for (var i = 0; i < num; i++) {
		ranX = Math.floor(Math.random() * 800) + canvas.width; // 800 - 1600
		ranY = Math.floor(Math.random() * 350); // 0 - 350
		ranIndex = Math.floor(Math.random() * 3) // 0 - 3
		ranSpeed = speed;
		var myStar = new Star(ranX,ranY,24,24,ctx,starIMG.src,speed);
		myStar.shine.index = ranIndex; 
		starArray.push(myStar);
		myStar.create();
	}
}