"use strict";

function calc() {
	var ingredients = parseInput(input);
	return getBestScore(100, ingredients, -1) + " " + getBestScore(100, ingredients, 500);
}

function parseInput(lines) {
	var result = [];

	lines.split("\n").forEach(function(line) {
		result.push(parseIngredient(line.split(":")[1]));
	});

	return result;
}

function parseIngredient(str) {
	var result = {};

	str.split(",").forEach(function(item) {
		result[item.split(" ")[1]] = +item.split(" ")[2];
	});

	return result;
}

function getScore(ingredients, amounts) {
	var properties = ["capacity", "durability", "flavor", "texture"];

	var result = 1;

	properties.forEach(function(property) {
		var sum = 0;
		
		for (var i = 0; i < amounts.length; ++i) {
			sum += ingredients[i][property] * amounts[i];
		}

		if (sum < 0) {
			sum = 0;
		}

		result *= sum;
	});

	return result;
}

function getCalories(ingredients, amounts) {
	var sum = 0;
	
	for (var i = 0; i < amounts.length; ++i) {
		sum += ingredients[i]["calories"] * amounts[i];
	}

	return sum;
}

function getBestScore(total, ingredients, calories) {
	var bestScore = 0;
	var amounts = [];

	amounts.push(total);

	for (var i = 1; i < ingredients.length; ++i) {
		amounts.push(0);
	}

	do {
		var score = getScore(ingredients, amounts);

		if (score > bestScore && (calories < 0 || getCalories(ingredients, amounts) == calories)) {
			bestScore = score;
		}

	} while (next(total, amounts));

	return bestScore;
}

function next(total, amounts) {
	while (true) {
		var carry = total;

		for (var i = 0; carry && i < amounts.length; ++i) {
			var x = amounts[i] + carry;
			carry = x > total ? 1 : 0;
			amounts[i] = x % (total + 1);
		}

		if (carry > 0) {
			return false;
		}

		var newTotal = 0;
		for (var j = 0; j < amounts.length; ++j) {
			newTotal += amounts[j];
		}

		if (newTotal == total) {
			return true;
		}
	}
}

var input = `Frosting: capacity 4, durability -2, flavor 0, texture 0, calories 5
Candy: capacity 0, durability 5, flavor -1, texture 0, calories 8
Butterscotch: capacity -1, durability 0, flavor 5, texture 0, calories 6
Sugar: capacity 0, durability 0, flavor -2, texture 2, calories 1`;
