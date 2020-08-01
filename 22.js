"use strict";

const WIN = 1;
const LOSE = -1;
const CONTINUE = 0;

const store = [
	{name: "missile", cost: 53, damage: 4, armor: 0, heal: 0, mana: 0, turns: 0},
	{name: "drain", cost: 73, damage: 2, armor: 0, heal: 2, mana: 0, turns: 0},
	{name: "shield", cost: 113, damage: 0, armor: 7, heal: 0, mana: 0, turns: 6},
	{name: "poison", cost: 173, damage: 3, armor: 0, heal: 0, mana: 0, turns: 6},
	{name: "recharge", cost: 229, damage: 0, armor: 0, heal: 0, mana: 101, turns: 5}
];

function calc() {
	const game1 = createGame(50, 500, input, 0);
	const game2 = createGame(50, 500, input, 1);

	return getMinMana(game1) + ", " + getMinMana(game2);
}

function createBoss(input) {
	const nums = input.match(/\d+/g).map(Number);

	return {
		hp: nums[0],
		damage: nums[1],
		copy() {
			return {...this};
		}
	};
}

function createPlayer(hp, mana) {
	return {
		hp: hp,
		mana: mana,
		armor: 0,
		copy() {
			return {...this};
		}
	};
}

function createGame(playerHp, playerMana, input, playerHpDecrease) {
	return {
		player: createPlayer(playerHp, playerMana),
		boss: createBoss(input),
		spendMana: 0,
		activeSpells: new Array(store.length),
		playerHpDecrease: playerHpDecrease,

		copy() {
			const o = {...this};
			o.player = o.player.copy();
			o.boss = o.boss.copy();
			o.activeSpells = [...o.activeSpells];
			return o;
		},

		doTurn(i) {
			this.player.hp -= this.playerHpDecrease;
			
			if (this.player.hp <= 0) {
				return LOSE;
			}

			if (this.doMagic()) {
				return WIN;
			}

			if (!this.doCast(i)) {
				return LOSE;
			}

			if (this.doMagic()) {
				return WIN;
			}

			if (this.doBoss()) {
				return LOSE;
			}

			return CONTINUE;
		},

		doMagic() {
			this.player.armor = 0;
			for (let i = 0; i < store.length; ++i) {
				if (this.activeSpells[i] > 0) {
					this.applySpell(i);
				}
			}
			return this.boss.hp <= 0;
		},

		applySpell(i) {
			const spell = store[i];
				
			this.boss.hp -= spell.damage;
			this.player.armor += spell.armor;
			this.player.hp += spell.heal;
			this.player.mana += spell.mana;
			--this.activeSpells[i];
		},

		doCast(i) {
			if ((this.activeSpells[i] > 0) || (this.player.mana < store[i].cost)) {
				return false;
			}

			this.player.mana -= store[i].cost;
			this.spendMana += store[i].cost;
			
			this.activeSpells[i] = store[i].turns;

			if (store[i].turns == 0) {
				this.applySpell(i);
			}

			return true;
		},

		doBoss() {
			this.player.hp -= Math.max(this.boss.damage - this.player.armor, 1);
			return this.player.hp <= 0;
		}
	};
}

function getMinMana(game) {
	let res = Infinity;

	const queue = [game];

	while (queue.length > 0) {
		const currentGame = queue.shift();

		for (let i = 0; i < store.length; ++i) {
			if (currentGame.spendMana + store[i].cost < res) {
				const newGame = currentGame.copy();				
				const turnRes = newGame.doTurn(i);

				if (turnRes == WIN) {
					res = newGame.spendMana;
				} else if (turnRes == CONTINUE) {
					queue.push(newGame);
				}
			}
		}
	}

	return res;
}

const input = `Hit Points: 55
Damage: 8`;
