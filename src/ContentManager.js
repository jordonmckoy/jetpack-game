// Menu resoucres
var startBtn = new button(100,150,220,97);
var skyIMG = new Image();
var pausedIMG = new Image();
var gameoverIMG = new Image();

// Player
var player = new Player(25,25,26,77);

// Game objects
var starIMG = new Image();

// enemy objects
var rocketIMG = new Image();
var missileIMG = new Image();

function ContentManager () {
	// 
	var downloadComplete = false;
	// Number of elements to download
	const NUM_ELEMENTS_TO_LOAD = 8;
	var elementsLoaded = 0;

//	var downloadProgress;

	this.startLoad = function () {

		setDownloadParameters(startBtn.img,"images/menu/startBtn.png");
		setDownloadParameters(player.img,"images/player/player.png");
		setDownloadParameters(starIMG,"images/objects/star.png");
		setDownloadParameters(skyIMG,"images/menu/sky.png");
		setDownloadParameters(pausedIMG,"images/menu/paused.png");
		setDownloadParameters(rocketIMG,"images/enemy/rocket.png");
		setDownloadParameters(missileIMG,"images/enemy/missile.png");
		setDownloadParameters(gameoverIMG,"images/menu/gameover.png");
	}

	function setDownloadParameters (element, url) {
		element.src = url;
        element.onload = handleElementLoad(element);
        element.onerror = handleElementError.bind(element);
	}

	function handleElementLoad(e) {
		elementsLoaded++;
		progress();

		if (elementsLoaded === NUM_ELEMENTS_TO_LOAD) {
			downloadComplete = true;
			console.log("Load complete");
		}
	}

	function handleElementError(e) {
        console.log("Error Loading Asset : " + e.src);
    }

	// Return download progress
	function progress() {
		downloadProgress = (elementsLoaded/NUM_ELEMENTS_TO_LOAD) * 100;

		// draw bg
		display_ctx.fillStyle = "#666666";
		display_ctx.fillRect(0,0,display_canvas.width,display_canvas.height);
		// draw text
		display_ctx.fillStyle = "#FFFFFF";
		display_ctx.font = "16px Arial";
		display_ctx.fillText("Loading " + downloadProgress + "%",(display_canvas.width/2)-35,
															(display_canvas.height/2));
	}
}