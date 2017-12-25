"use strict";

// it tooks too long to get both answers, but it works

function calc() {
	return getPart1() + " " + getPart2();
}

function getPart1() {
	let goal = input / 10;

	let n = Math.floor(goal / 5);

	while (getSigma(n) < goal) {
		++n;
	}

	return n;
}

function getSigma(n) {
	let sum = 1;

	let start = ((n % 2) == 0) ? 2 : 3;
	let step = ((n % 2) == 0) ? 1 : 2;

	for (let divisor = start; divisor <= n; divisor += step) {
		sum += ((n % divisor) == 0) ? divisor : 0;
	}

	return sum;
}

function getPart2() {
	let goal = Math.ceil(input / 11);

	let n = Math.floor(goal / 5);

	while (getSigma2(n) < goal) {
		++n;
	}

	return n;
}

function getSigma2(n) {
	let sum = 0;

	for (let divisor = Math.floor(n / 50); divisor <= n; ++divisor) {
		sum += ((n % divisor) == 0) ? divisor : 0;
	}

	return sum;
}

const input = 34000000;