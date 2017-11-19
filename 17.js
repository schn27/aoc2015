"use strict";

function calc() {
	var containers = parseInput(input);
	var solver = new Solver();
	var solutions = solver.getSolutions(150, containers);

	var minSolutions = solutions.slice().sort(function(a, b) {
		return a.length - b.length;
	});

	var minLength = minSolutions[0].length;

	minSolutions = minSolutions.filter(function(a) {
		return a.length == minLength;
	});

	return solutions.length + " " + minSolutions.length;
}

function Solver() {
	var solutions = [];

	function solve(amount, containers, used) {
		if (amount == 0) {
			solutions.push(used);
		} else {
			while (containers.length) {
				var v = containers[0];
				containers.splice(0, 1);

				if (v <= amount) {
					var newContainers = containers.slice();
					var newUsed = used.slice();
					newUsed.push(v);
					solve(amount - v, newContainers, newUsed);
				}
			}
		}
	}

	this.getSolutions = function(amount, containers) {
		solutions = [];
		solve(amount, containers, []);
		return solutions;
	}
}

function parseInput(input) {
	var res = [];

	input.split("\n").forEach(function(line) {
		res.push(parseInt(line, 10));
	});

	return res;
}

var input = `43
3
4
10
21
44
4
6
47
41
34
17
17
44
36
31
46
9
27
38`;
