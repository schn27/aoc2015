"use strict";

const [capacity, durability, flavor, texture, calories] = [0, 1, 2, 3, 4];

function calc() {
	let ingredients = input.split("\n").map(line => line.match(/[+-]?\d+/g).map(Number));

	return getBestScore(100, ingredients, -1) + " " + getBestScore(100, ingredients, 500);
}

function getScore(ingredients, amounts) {
	var result = 1;

	for (let p = capacity; p <= texture; ++p) {
		let sum = 0;
		
		for (let i = 0; i < amounts.length; ++i) {
			sum += ingredients[i][p] * amounts[i];
		}

		if (sum < 0) {
			sum = 0;
		}

		result *= sum;
	}

	return result;
}

function getCalories(ingredients, amounts) {
	return amounts.reduce((s, e, i) => s + ingredients[i][calories] * e, 0);
}

function getBestScore(total, ingredients, calories) {
	let bestScore = 0;
	let amounts = [];

	amounts.push(total);

	for (let i = 1; i < ingredients.length; ++i) {
		amounts.push(0);
	}

	do {
		let score = getScore(ingredients, amounts);

		if (score > bestScore && (calories < 0 || getCalories(ingredients, amounts) == calories)) {
			bestScore = score;
		}

	} while (next(total, amounts));

	return bestScore;
}

function next(total, amounts) {
	do {
		let carry = total;

		for (let i = 0; carry && i < amounts.length; ++i) {
			let x = amounts[i] + carry;
			carry = x > total ? 1 : 0;
			amounts[i] = x % (total + 1);
		}

		if (carry > 0) {
			return false;
		}

	} while (amounts.reduce((s, e) => s + e) != total);
	
	return true;
}

const input = `Frosting: capacity 4, durability -2, flavor 0, texture 0, calories 5
Candy: capacity 0, durability 5, flavor -1, texture 0, calories 8
Butterscotch: capacity -1, durability 0, flavor 5, texture 0, calories 6
Sugar: capacity 0, durability 0, flavor -2, texture 2, calories 1`;
