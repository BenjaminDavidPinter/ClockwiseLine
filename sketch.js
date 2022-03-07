let X = 0;
let Y = 0;

let radius = 10000;
let angle = 10;

let mainPivotX = 300;
let mainPivotY = 300;

let lastPointX = 0;
let lastPointY = 0;

const locations = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	frameRate(144);
	strokeWeight(4);
}

function draw() {
	clear();
	drawLineOnPivot(mainPivotX, mainPivotY, angle);
	angle = angle + .002;

	locations.forEach(element => {
		ellipse(element.x, element.y, 10);
	});


}

function drawLineOnPivot(pivotX, pivotY, angle) {
	var x = Math.cos(angle) * radius;
	var y = Math.sin(angle) * radius;

	line(pivotX, pivotY, x, y);
	line(pivotX, pivotY, -1 * x, -1 * y);

	var slope1 = (pivotY - (-1 * y)) / (pivotX - (-1 * x));
	var yintercept1 = pivotY - (slope1 * pivotX);

	var locationSet = false;
	locations.forEach(loc => {
		if (!locationSet) {
			if (mainPivotX == loc.x
				&& mainPivotY == loc.y) {
				return;
			}

			if (Math.ceil(slope1 * loc.x + yintercept1) >= loc.y - 5
				&& Math.floor(slope1 * loc.x + yintercept1) <= loc.y + 5) {
				if(lastPointX == loc.x && lastPointY == loc.y && locations.length > 2){
					return;
				}
				lastPointX = mainPivotX;
				lastPointY = mainPivotY;
				mainPivotX = loc.x;
				mainPivotY = loc.y;
				locationSet = true;
				angle = angle + 5;
			}
		}
	})
}

function mouseClicked() {
	locations.push({ x: mouseX, y: mouseY });
	console.log(mouseX, mouseY);
}
