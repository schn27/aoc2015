"use strict";

function calc() {
	const [targetRow, targetCol] = input.match(/\d+/g);

	let x = 20151125;
	let row = 1;
	let col = 1;

	while (row != targetRow || col != targetCol) {
		x = (x * 252533) % 33554393;

		--row;
		++col;

		if (row <= 0) {
			row = col;
			col = 1;
		}
	}

	return x;
}

const input = "To continue, please consult the code grid in the manual.  Enter the code at row 2947, column 3029.";
