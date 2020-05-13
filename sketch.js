let cities = [];
let totalCities = 12;
let popSize = 500;
let population = [];

let fitness = [];

let recordDistance = Infinity;
let bestEver;
let currentBest;
function setup() {
	createCanvas(800, 600);
	let order = [];
	for(let i = 0; i < totalCities; ++i) {
		let v = createVector(random(width), random(height / 2));
		cities[i] = v;
		order[i] = i; 
	}

	for(let i = 0; i < popSize; ++i) {
		population[i] = shuffle(order.slice());
	}
	console.log(population);
	console.log(bestEver);
	// let d = calcDistance(cities, order);
	// recordDistance = d;
	// bestEver = order.slice();
}

function draw() {
	background(0);

	//GA
	calcFitness();
	normalizeFitness();
	nextGeneration();

	stroke(255);
	strokeWeight(4);
	noFill();
	beginShape();
	for(let i = 0; i < bestEver.length; ++i) {
		let n = bestEver[i];
		vertex(cities[n].x, cities[n].y);
		ellipse(cities[n].x, cities[n].y, 16, 16);
	}
	endShape();

	translate(0, height / 2);

	stroke(255);
	strokeWeight(4);
	noFill();
	beginShape();
	for(let i = 0; i < currentBest.length; ++i) {
		let n = currentBest[i];
		vertex(cities[n].x, cities[n].y);
		ellipse(cities[n].x, cities[n].y, 16, 16);
	}
	endShape();
}

function swap(a, i, j) {
	let aux = a[i];
	a[i] = a[j];
	a[j] = aux;
}

function calcDistance(points, order) {
	let sum = 0;
	for(let i = 0; i < order.length - 1; ++i) {
		let cityAIndex = order[i];
		let cityA = points[cityAIndex];
		let cityBIndex = order[i + 1];
		let cityB = points[cityBIndex];

		let d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
		sum += d;
	}
	return sum;
}

// function nextOrder() {
// 	count++;
// 	let largestI = -1;
// 	for(let i = 0; i < order.length - 1; ++i) {
// 		if(order[i] < order[i + 1]) {
// 			largestI = i;
// 		}
// 	}
// 	if(largestI == -1) {
// 		noLoop();
// 		console.log('finished');
// 	}

// 	//Step 2
// 	let largestJ = -1;
// 	for(let j = 0; j < order.length; ++j) {
// 		if(order[largestI] < order[j]) {
// 			largestJ = j;
// 		}
// 	}

// 	//Step 3
// 	swap(order, largestI, largestJ);

// 	//Step 4: reverse from largestI + 1 to the end
// 	let endArray = order.splice(largestI + 1);
// 	endArray.reverse();
// 	order = order.concat(endArray);
// }

