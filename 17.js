"use strict";

function calc() {
	const containers = input.match(/\d+/g).map(Number);
	let solutions = (new Solver()).getSolutions(150, containers);

	let minSolutions = solutions.slice().sort((a, b) => a.length - b.length);
	const minLength = minSolutions[0].length;
	minSolutions = minSolutions.filter(e => e.length == minLength);

	return solutions.length + " " + minSolutions.length;
}

function Solver() {
	let solutions = [];

	function solve(amount, containers, used) {
		if (amount == 0) {
			solutions.push(used);
		} else {
			while (containers.length) {
				let v = containers[0];
				containers.splice(0, 1);

				if (v <= amount) {
					let newContainers = containers.slice();
					let newUsed = used.slice();
					newUsed.push(v);
					solve(amount - v, newContainers, newUsed);
				}
			}
		}
	}

	this.getSolutions = (amount, containers) => {
		solutions = [];
		solve(amount, containers, []);
		return solutions;
	}
}

const input = `43
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
