"use strict";

const WIN = 1;
const LOSE = -1;
const CONTINUE = 0;

function calc() {
	const store = [
		{name: "missile", cost: 53, damage: 4, armor: 0, heal: 0, mana: 0, turns: 0},
		{name: "drain", cost: 73, damage: 2, armor: 0, heal: 2, mana: 0, turns: 0},
		{name: "shield", cost: 113, damage: 0, armor: 7, heal: 0, mana: 0, turns: 6},
		{name: "poison", cost: 173, damage: 3, armor: 0, heal: 0, mana: 0, turns: 6},
		{name: "recharge", cost: 229, damage: 0, armor: 0, heal: 0, mana: 101, turns: 5}
	];

	const game1 = createGame(50, 500, input, 0);
	const game2 = createGame(50, 500, input, 1);

	return getMinMana(store, game1) + ", " + getMinMana(store, game2);
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
		spells: [],
		playerHpDecrease: playerHpDecrease,

		copy() {
			const o = {...this};
			o.player = o.player.copy();
			o.boss = o.boss.copy();
			o.spells = o.spells.map(e => ({...e}));
			return o;
		},

		doTurn(spell) {
			this.player.hp -= this.playerHpDecrease;
			
			if (this.player.hp <= 0) {
				return LOSE;
			}

			if (this.doMagic()) {
				return WIN;
			}

			if (!this.doCast(spell)) {
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
			this.spells = this.spells.filter(s => this.applySpell(s));
			return this.boss.hp <= 0;
		},

		applySpell(spell) {
			this.boss.hp -= spell.damage;
			this.player.armor += spell.armor;
			this.player.hp += spell.heal;
			this.player.mana += spell.mana;
			return --spell.turns > 0;
		},

		doCast(spell) {
			const isActiveSpell = this.spells.filter(s => s.name == spell.name).length != 0;
			const isEnoughMana = this.player.mana >= spell.cost;

			if (isActiveSpell || !isEnoughMana) {
				return false;
			}

			this.player.mana -= spell.cost;
			this.spendMana += spell.cost;

			if (spell.turns == 0) {
				this.applySpell(spell);
			} else {
				this.spells.push(spell);
			}

			return true;
		},

		doBoss() {
			this.player.hp -= Math.max(this.boss.damage - this.player.armor, 1);
			return this.player.hp <= 0;
		}
	};
}

function getMinMana(store, game) {
	let res = Infinity;

	const queue = [game];

	while (queue.length > 0) {
		const currentGame = queue.shift();

		store.forEach(spell => {
			if (currentGame.spendMana + spell.cost < res) {
				const newGame = currentGame.copy();				
				const turnRes = newGame.doTurn({...spell});

				if (turnRes == WIN) {
					res = newGame.spendMana;
				} else if (turnRes == CONTINUE) {
					queue.push(newGame);
				}
			}
		});
	}

	return res;
}

const input = `Hit Points: 55
Damage: 8`;
