"use strict";

function calc() {
	const distMatrix = parseInput();

	const targets = [];
	for (let key in distMatrix) {
		targets.push(key);
	}

	let optimalLength = null;
	let longestLength = 0;

	for (let p = 0, totalPermutations = getFactorial(targets.length); p < totalPermutations; ++p) {
		let arrangedTargets = getPermutation(targets, p);
		let prevTarget = arrangedTargets[0];
		let length = 0;

		for (let i = 1; i < arrangedTargets.length; ++i) {
			length += distMatrix[prevTarget][arrangedTargets[i]];
			prevTarget = arrangedTargets[i];
		}

		if (optimalLength == null || length < optimalLength) {
			optimalLength = length;
		}

		if (length > longestLength) {
			longestLength = length;
		}
	}

	return optimalLength + " " + longestLength;
}

// http://stackoverflow.com/questions/7918806/finding-n-th-permutation-without-computing-others/24257996#24257996
function getPermutation(atoms, index) {
	let src = atoms.slice(), dest = [], item;

	for (let i = 0; i < atoms.length; ++i) {
		item = index % src.length;
		index = Math.floor(index / src.length);
		dest.push(src[item]);
		src.splice(item, 1);
	}

	return dest;
}

function getFactorial(n) {
	let result = n;
	
	while (--n > 0) {
		result *= n;
	}

	return result;
}

function parseInput() {
	let table = [];

	input.split("\n").forEach(line => {
		const tokens = line.split(" ");
		const city1 = tokens[0];
		const city2 = tokens[2];
		const distance = +tokens[4];

		if (table[city1] == undefined) {
			table[city1] = [];
		}

		table[city1][city2] = distance;

		if (table[city2] == undefined) {
			table[city2] = [];
		}		

		table[city2][city1] = distance;
	});

	return table;
}

const input = `AlphaCentauri to Snowdin = 66
AlphaCentauri to Tambi = 28
AlphaCentauri to Faerun = 60
AlphaCentauri to Norrath = 34
AlphaCentauri to Straylight = 34
AlphaCentauri to Tristram = 3
AlphaCentauri to Arbre = 108
Snowdin to Tambi = 22
Snowdin to Faerun = 12
Snowdin to Norrath = 91
Snowdin to Straylight = 121
Snowdin to Tristram = 111
Snowdin to Arbre = 71
Tambi to Faerun = 39
Tambi to Norrath = 113
Tambi to Straylight = 130
Tambi to Tristram = 35
Tambi to Arbre = 40
Faerun to Norrath = 63
Faerun to Straylight = 21
Faerun to Tristram = 57
Faerun to Arbre = 83
Norrath to Straylight = 9
Norrath to Tristram = 50
Norrath to Arbre = 60
Straylight to Tristram = 27
Straylight to Arbre = 81
Tristram to Arbre = 90`;
