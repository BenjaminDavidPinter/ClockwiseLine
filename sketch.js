let X = 0;
let Y = 0;

let radius = 100000000;
let angle = 10;

let mainPivotX = 300;
let mainPivotY = 300;

let lastPointX = 0;
let lastPointY = 0;

const locations = [];
const intersections = [];

function setup() {
	mainPivotX = windowWidth/2;
	mainPivotY = windowHeight/2;
	createCanvas(windowWidth, windowHeight);
	strokeWeight(4);
	for (let index = 0; index < 4; index++) {
		locations.push({ x: Math.floor(Math.random() * windowWidth), y: Math.floor(Math.random() * windowHeight), tolerance: 0, active: false })		
	}
	mainPivotX = locations[2].x;
	mainPivotY = locations[2].y;
	locations[2].active = true;
}

function draw() {
	clear();
	drawLineOnPivot(mainPivotX, mainPivotY, angle);
	angle = angle + .001;

	locations.forEach(element => {
		if(element.active){
			stroke(color('magenta'));
		}
		else {
			stroke(color('black'));
		}
		ellipse(element.x, element.y, 10);
		stroke(color('white'));
		text('Tolerance: ' + element.tolerance, element.x, element.y + 25);
		stroke(color('black'));
	});

	strokeWeight(2);
	intersections.forEach(coords => {
		stroke(color('blue'));
		line(coords.X1, coords.Y1, coords.X2, coords.Y2);
	});
	stroke(color('black'));
	strokeWeight(4);


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
			
			//don't hop to previous point
			if (mainPivotX == loc.x
				&& mainPivotY == loc.y) {
				return;
			}

			//collision tolerance should be a function of the distance between current x,y and target x,y
			//The farther away it is, the larger the tolerance needs to be.
			//Max tolerance is 10 pixels
			loc.tolerance = (((Math.abs(pivotX-loc.x) + Math.abs(pivotY-loc.y)) / (windowWidth + windowHeight))*15);
			if(loc.tolerance == 6){
				loc.tolerance = 7;
			}


			//intercept
			if (Math.ceil(slope1 * loc.x + yintercept1) >= loc.y - loc.tolerance
				&& Math.floor(slope1 * loc.x + yintercept1) <= loc.y + loc.tolerance) {
				if(lastPointX == loc.x && lastPointY == loc.y && locations.length > 2){
					return;
				}
				lastPointX = mainPivotX;
				lastPointY = mainPivotY;
				mainPivotX = loc.x;
				mainPivotY = loc.y;
				locationSet = true;
				loc.tolerance = 0;
				loc.active = true;
				intersections.push({X1:pivotX, Y1:pivotY, X2:loc.x, Y2:loc.y});
			}
			else {
				loc.active = false;
			}
		}
	})
}

function mouseClicked() {
	locations.push({ x: mouseX, y: mouseY, tolerance: 0, active: false });
	console.log(mouseX, mouseY);
}