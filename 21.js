"use strict";

function calc() {
	const [weapons, armor, rings] = shop.split("\n\n")
			.map(t => t.split("\n").map(line => line.match(/\s\d+/g)).filter(e => e != null).map(e => e.map(Number)));

	const boss = input.match(/\d+/g).map(Number);

	let minCost = 1e6;
	let maxCost = 0;

	for (let w = 0; w < weapons.length; ++w) {
		for (let a = -1; a < armor.length; ++a) {
			let damage = weapons[w][1];
			let defence = a >= 0 ? armor[a][2] : 0;
			let cost = weapons[w][0] + (a >= 0 ? armor[a][0] : 0);

			if (fight([100, damage, defence], [...boss])) {
				minCost = Math.min(cost, minCost);
			} else {
				maxCost = Math.max(cost, maxCost);
			}

			for (let r1 = 0; r1 < rings.length; ++r1) {
				for (let r2 = r1; r2 < rings.length; ++r2) {
					let ringDamage = rings[r1][1] + ((r1 != r2) ? rings[r2][1] : 0);
					let ringDefence = rings[r1][2] + ((r1 != r2) ? rings[r2][2] : 0);
					let ringCost = rings[r1][0] + ((r1 != r2) ? rings[r2][0] : 0);

					if (fight([100, damage + ringDamage, defence + ringDefence], [...boss])) {
						minCost = Math.min(cost + ringCost, minCost);
					} else {
						maxCost = Math.max(cost + ringCost, maxCost);
					}
				}
			}
		}
	}

	return minCost + ", " + maxCost;
}

function fight(player, boss) {
	let move = (p1, p2) => p2[0] -= p1[1] > p2[2] ? p1[1] - p2[2]: 1;

	while (player[0] > 0 && boss[0] > 0) {
		move(player, boss);
		
		if (boss[0] > 0) {
			move(boss, player);
		}
	}

	return player[0] > 0;
}

const shop = `Weapons:    Cost  Damage  Armor
Dagger        8     4       0
Shortsword   10     5       0
Warhammer    25     6       0
Longsword    40     7       0
Greataxe     74     8       0

Armor:      Cost  Damage  Armor
Leather      13     0       1
Chainmail    31     0       2
Splintmail   53     0       3
Bandedmail   75     0       4
Platemail   102     0       5

Rings:      Cost  Damage  Armor
Damage +1    25     1       0
Damage +2    50     2       0
Damage +3   100     3       0
Defense +1   20     0       1
Defense +2   40     0       2
Defense +3   80     0       3`;

const input = `Hit Points: 104
Damage: 8
Armor: 1`;
