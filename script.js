let speed = 0.5;
let zoom = 0.5;

let stars = [];
let numStars = 1000;

const zoomSlider = document.getElementById("zoomSlider");
const speedSlider = document.getElementById("speedSlider");

function updateValues() {
	zoom = parseFloat(zoomSlider.value);
	speed = parseFloat(speedSlider.value);
	console.log("Zoom:", zoom, "Speed:", speed);
}

zoomSlider.addEventListener("input", updateValues);
speedSlider.addEventListener("input", updateValues);

function drawOrbit(d) {
	const orbitCheckbox = document.querySelector('input[name="orbit"]');

	if (!orbitCheckbox.checked) return;

	noFill();
	stroke(160);
	strokeWeight(1);
	push();

	let numPoints = 100;
	beginShape();
	for (let i = 0; i <= numPoints; i++) {
		let angle = map(i, 0, numPoints, 0, TWO_PI);
		let x = d * sin(angle) * zoom;
		let z = d * cos(angle) * zoom;
		vertex(x, 0, z);
	}
	endShape(CLOSE);
	pop();
}

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	camera(0, -200, 0, 0, 0, 0, 0, 0, 1);

	for (let i = 0; i < numStars; i++) {
		let x = random(-2000, 2000);
		let y = random(-2000, 2000);
		let z = random(-2000, 2000);
		stars.push(createVector(x, y, z));
	}
}

function draw() {
	background(10);
	noStroke();

	orbitControl(3, 3, 0);

	// Star
	fill(255);
	for (let s of stars) {
		push();
		translate(s.x, s.y, s.z);
		sphere(2 * map(zoom, 0.1, 5, 0.6, 3));
		pop();
	}

	// Sun
	let lx = 0;
	let ly = 0;
	let lz = 0;

	pointLight(255, 255, 255, lx, ly, lz);
	push();
	translate(lx, ly, lz);
	emissiveMaterial(255, 220, 50);
	sphere(100 * zoom);

	drawOrbit(120);
	drawOrbit(216);
	drawOrbit(312);
	drawOrbit(468);
	drawOrbit(900);
	drawOrbit(1320);
	drawOrbit(1740);
	drawOrbit(2160);

	pop();

	// Mercury
	push();
	rotateY(frameCount * (0.1 / 142) * speed);
	translate(lx + 120 * zoom, 0, 0);

	ambientLight(100);
	specularMaterial(180, 185, 190);
	shininess(128);

	sphere(8 * zoom);
	pop();

	//Venus
	push();
	rotateY(frameCount * (0.1 / -589) * speed);
	translate(lx + 216 * zoom, 0, 0);

	ambientLight(100);
	specularMaterial(230, 200, 160);
	shininess(119);

	sphere(12 * zoom);
	pop();

	//Earth
	push();
	rotateY(frameCount * (0.1 * 0.41) * speed);
	translate(lx + 312 * zoom, 0, 0);

	ambientLight(100);
	specularMaterial(20, 90, 170);
	shininess(110);

	sphere(12 * zoom);
	pop();

	// Mars
	push();
	rotateY(frameCount * (0.1 * 0.04) * speed);
	translate(lx + 468 * zoom, 0, 0);

	ambientLight(100);
	specularMaterial(210, 60, 40);
	shininess(97);

	sphere(9 * zoom);
	pop();

	// Jupiter
	push();
	rotateY(frameCount * 0.1 * speed);
	translate(lx + 900 * zoom, 0, 0);

	ambientLight(100);
	specularMaterial(200, 150, 100);
	shininess(69);

	sphere(60 * zoom);
	pop();

	// Saturn
	push();
	rotateY(frameCount * 0.092 * speed);
	translate(lx + 1320 * zoom, 0, 0);

	ambientLight(100);
	specularMaterial(220, 210, 170);
	shininess(48);

	sphere(50 * zoom);

	push();
	rotateX(HALF_PI);
	rotateY(PI / 6);
	ambientLight(100);
	specularMaterial(200, 200, 150, 200);
	shininess(20);
	torus(70 * zoom, 8 * zoom, 24, 16);
	pop();

	pop();

	// Uranus
	push();
	rotateY(frameCount * 0.057 * speed);
	translate(lx + 1740 * zoom, 0, 0);

	ambientLight(100);
	specularMaterial(100, 220, 220);
	shininess(31);

	sphere(25 * zoom);
	pop();

	// Neptune
	push();
	rotateY(frameCount * 0.061 * speed);
	translate(lx + 2160 * zoom, 0, 0);

	ambientLight(100);
	specularMaterial(50, 100, 220);
	shininess(10);

	sphere(24 * zoom);
	pop();
}
