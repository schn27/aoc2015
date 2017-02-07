"use strict";

function calc() {
	var password1 = getNextPassword(input);
	var password2 = getNextPassword(password1);

	return password1 + " " + password2;
}

function getNextPassword(password) {
	do {
		password = getIncremented(password);
	} while (!(hasIncreasingTriple(password) && hasTwoPairs(password)));

	return password;	
}

function getIncremented(str) {
	var res = str.split("");

	for (var i = res.length - 1; i >= 0; --i) {
		if (res[i] != "z") {
			res[i] = String.fromCharCode(res[i].charCodeAt(0) + 1);
			break;
		}

		res[i] = "a";
	}

	return fixForbiddenLetters(res.join(""));
}

function fixForbiddenLetters(str) {
	var res = [];
	var found = false;

	str.split("").forEach(function(c) {
		if (found) {
			c = "a";
		} else if (c == "i" || c == "o" || c == "l") {
			c = String.fromCharCode(c.charCodeAt(0) + 1);
			found = true;
		}

		res.push(c);
	});

	return res.join("");
}

function hasIncreasingTriple(str) {
	for (var i = 0; i < str.length - 2; ++i) {
		if ((str.charCodeAt(i + 1) == str.charCodeAt(i) + 1) && (str.charCodeAt(i + 2) == str.charCodeAt(i + 1) + 1)) {
			return true;
		}
	}

	return false;
}

function hasTwoPairs(str) {
	var pairs = 0;

	for (var i = 0; i < str.length - 1; ++i) {
		if (str[i] == str[i + 1]) {
			if (++pairs >= 2) {
				return true;
			}

			++i;
		}
	}

	return false;
}

var input = "hepxcrrq";
