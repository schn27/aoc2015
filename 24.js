"use strict";

function calc() {
	const packages = input.match(/\d+/g).map(Number);
	const totalW = packages.reduce((s, e) => s + e);

	let groups1 = [];
	let groups2 = [];

	for (let i = 1; i < (1 << packages.length); ++i) {
		const [group1, group2] = getGroups(packages, i, totalW / 3, totalW / 4);
		
		if (group1) {
			groups1.push(group1);
		}

		if (group2) {
			groups2.push(group2);
		}
	}

	groups1.sort((a, b) => a.length - b.length);
	const part1 = groups1.filter(e => e.length == groups1[0].length).map(g => g.reduce(((p, e) => p * e), 1)).sort((a, b) => a - b)[0];

	groups2.sort((a, b) => a.length - b.length);
	const part2 = groups2.filter(e => e.length == groups2[0].length).map(g => g.reduce(((p, e) => p * e), 1)).sort((a, b) => a - b)[0];

	return part1 + ", " + part2;
}

function getGroups(packages, i, w1, w2) {
	let group = [];

	for (let b = 0; b < packages.length; ++b) {
		if (i & (1 << b)) {
			group.push(packages[b]);
		}
	}

	let w = group.reduce((s, e) => s + e);

	return (w == w1) ? [group, null] : (w == w2) ? [null, group] : [null, null];
}

const input = `1
2
3
5
7
13
17
19
23
29
31
37
41
43
53
59
61
67
71
73
79
83
89
97
101
103
107
109
113`;
