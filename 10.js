"use strict";

function calc() {
	var str1 = input;

	for (var i = 0; i < 40; ++i) {
		str1 = lookAndSay(str1);
	}

	var str2 = str1;

	for (var i = 40; i < 50; ++i) {
		str2 = lookAndSay(str2);
	}

	return str1.length + " " + str2.length;
}

function lookAndSay(str) {
	var result = "";
	var lastChar = null;
	var counter = 0;

	str.split("").forEach(function(c) {
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

var input = "1113222113";
