"use strict";

function calc() {
	var persons = new Persons();
	return getOptimalHappiness(persons, false) + " " + getOptimalHappiness(persons, true);
}

function getOptimalHappiness(persons, withme) {
	var names = persons.getNames();

	if (withme) {
		names.push("me");
	}

	var optimalHappiness = undefined;

	for (var p = 0, totalPermutations = getFactorial(names.length); p < totalPermutations; ++p) {
		var arrangedNames = getPermutation(names, p);

		var happiness = 0;

		for (var i = 0; i < arrangedNames.length; ++i) {
			var name1 = arrangedNames[i];
			var name2 = arrangedNames[(i + 1) % arrangedNames.length];
			
			if (name1 != "me" && name2 != "me") {
				happiness += persons.getHappinessFor(name1, name2);
				happiness += persons.getHappinessFor(name2, name1);
			}
		}

		if (optimalHappiness == undefined || happiness > optimalHappiness) {
			optimalHappiness = happiness;
		}
	}

	return optimalHappiness;
}

function Persons() {
	var names = [];
	var table = [];

	function getNameIndex(name) {
		var index = names.indexOf(name);

		if (index >= 0) {
			return index;
		} else {
			names.push(name);
			return names.length - 1;
		}
	}

	this.getNames = function() {
		return names.slice();
	};

	this.getHappinessFor = function(name1, name2) {
		return table[getNameIndex(name1)][getNameIndex(name2)];
	};

	input.split("\n").forEach(function(line) {
		var tokens = line.split(" ");
		var index1 = getNameIndex(tokens[0]);
		var index2 = getNameIndex(tokens[10].split(".")[0]);
		var points = (tokens[2] == "gain" ? 1 : -1) * (+tokens[3]);

		if (table[index1] == undefined) {
			table[index1] = [];
		}

		table[index1][index2] = points;
	});
}

// http://stackoverflow.com/questions/7918806/finding-n-th-permutation-without-computing-others/24257996#24257996
function getPermutation(atoms, index) {
	var src = atoms.slice(), dest = [], item;

	for (var i = 0; i < atoms.length; ++i) {
		item = index % src.length;
		index = Math.floor(index / src.length);
		dest.push(src[item]);
		src.splice(item, 1);
	}

	return dest;
}

function getFactorial(n) {
	var result = n;
	
	while (--n > 0) {
		result *= n;
	}

	return result;
}


var input = `Alice would gain 54 happiness units by sitting next to Bob.
Alice would lose 81 happiness units by sitting next to Carol.
Alice would lose 42 happiness units by sitting next to David.
Alice would gain 89 happiness units by sitting next to Eric.
Alice would lose 89 happiness units by sitting next to Frank.
Alice would gain 97 happiness units by sitting next to George.
Alice would lose 94 happiness units by sitting next to Mallory.
Bob would gain 3 happiness units by sitting next to Alice.
Bob would lose 70 happiness units by sitting next to Carol.
Bob would lose 31 happiness units by sitting next to David.
Bob would gain 72 happiness units by sitting next to Eric.
Bob would lose 25 happiness units by sitting next to Frank.
Bob would lose 95 happiness units by sitting next to George.
Bob would gain 11 happiness units by sitting next to Mallory.
Carol would lose 83 happiness units by sitting next to Alice.
Carol would gain 8 happiness units by sitting next to Bob.
Carol would gain 35 happiness units by sitting next to David.
Carol would gain 10 happiness units by sitting next to Eric.
Carol would gain 61 happiness units by sitting next to Frank.
Carol would gain 10 happiness units by sitting next to George.
Carol would gain 29 happiness units by sitting next to Mallory.
David would gain 67 happiness units by sitting next to Alice.
David would gain 25 happiness units by sitting next to Bob.
David would gain 48 happiness units by sitting next to Carol.
David would lose 65 happiness units by sitting next to Eric.
David would gain 8 happiness units by sitting next to Frank.
David would gain 84 happiness units by sitting next to George.
David would gain 9 happiness units by sitting next to Mallory.
Eric would lose 51 happiness units by sitting next to Alice.
Eric would lose 39 happiness units by sitting next to Bob.
Eric would gain 84 happiness units by sitting next to Carol.
Eric would lose 98 happiness units by sitting next to David.
Eric would lose 20 happiness units by sitting next to Frank.
Eric would lose 6 happiness units by sitting next to George.
Eric would gain 60 happiness units by sitting next to Mallory.
Frank would gain 51 happiness units by sitting next to Alice.
Frank would gain 79 happiness units by sitting next to Bob.
Frank would gain 88 happiness units by sitting next to Carol.
Frank would gain 33 happiness units by sitting next to David.
Frank would gain 43 happiness units by sitting next to Eric.
Frank would gain 77 happiness units by sitting next to George.
Frank would lose 3 happiness units by sitting next to Mallory.
George would lose 14 happiness units by sitting next to Alice.
George would lose 12 happiness units by sitting next to Bob.
George would lose 52 happiness units by sitting next to Carol.
George would gain 14 happiness units by sitting next to David.
George would lose 62 happiness units by sitting next to Eric.
George would lose 18 happiness units by sitting next to Frank.
George would lose 17 happiness units by sitting next to Mallory.
Mallory would lose 36 happiness units by sitting next to Alice.
Mallory would gain 76 happiness units by sitting next to Bob.
Mallory would lose 34 happiness units by sitting next to Carol.
Mallory would gain 37 happiness units by sitting next to David.
Mallory would gain 40 happiness units by sitting next to Eric.
Mallory would gain 18 happiness units by sitting next to Frank.
Mallory would gain 7 happiness units by sitting next to George.`;
