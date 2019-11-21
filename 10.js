"use strict";

function calc() {
	let str1 = input;

	for (let i = 0; i < 40; ++i) {
		str1 = lookAndSay(str1);
	}

	let str2 = str1;

	for (let i = 40; i < 50; ++i) {
		str2 = lookAndSay(str2);
	}

	return str1.length + " " + str2.length;
}

function lookAndSay(str) {
	let result = "";
	let lastChar = null;
	let counter = 0;

	str.split("").forEach(c => {
		if (lastChar != c) {
			if (lastChar != null) {
				result += counter;
				result += lastChar;
			}

			lastChar = c;
			counter = 0;
		} 

		++counter;
	});

	return result + counter + lastChar;
}

const input = "1113222113";
