var rocketArray = [];
var createRocket = false;
var rocketStepMax = 100;
var rocketSteps = -0.01;
var rocketSpeedmultiplier = 0;

function manageRocket() {
	if (rocketSteps > rocketStepMax || rocketSteps <= 0) {
		rocketSteps = 0;
		createRocket = true;
	}
	rocketSteps += 0.3;

	if (gameState == "game" && createRocket == true) {
		if (gameScore < 300) {
			spawnRocket(2);
		} else if (gameScore > 350 && gameScore < 1000) {
			rocketSpeedMultiplier = 1;
			spawnRocket(2);
		} else if (gameScore > 1050 && gameScore < 2000) {
			rocketSpeedMultiplier = 1.5;
			spawnRocket(3);
		} else if (gameScore > 2050 && gameScore < 3200) {
			rocketSpeedMultiplier = 2;
			spawnRocket(4);
		} else if (gameScore > 3250 && gameScore < 8000) {
			rocketSpeedMultiplier = 3;
			spawnRocket(4);
		} else if (gameScore > 8050 && gameScore < 13000) {
			rocketSpeedMultiplier = 4.5;
			spawnRocket(3);
		} else {
			rocketSpeedMultiplier = 6;
			spawnRocket(3);
		}
	}
}

function spawnRocket(num) {
	var ranX, ranY, ranSpeed, ranIndex, cycle;
	createRocket = false;

	while (num > 0) {
		switch (cycle) {
			case 1:
				ranY = Math.floor(Math.random() * 151); // 0 - 150
				break;
			case 2:
				ranY = Math.floor(Math.random() * 151) + 150; // 151 - 300
				break;
			case 3:
				ranY = Math.floor(Math.random() * 100) + 250; // 301 - 400
				break;
			default:
				ranY = Math.floor(Math.random() * 365); // 0 - 150
				break;
		}

		ranX = Math.floor(Math.random() * 500) + canvas.width; // 800 - 1200
		ranSpeed = Math.floor(Math.random() * 3) + rocketSpeedMultiplier;
		var myRocket = new Rocket(ranX,ranY,45,25,ctx,rocketIMG.src,ranSpeed); 
		rocketArray.push(myRocket);
		myRocket.create();

		num--;
	} // while
} // spawnRocket