"use strict";

function calc() {
	let reindeers = input.split("\n").map(line => {	
		let words = line.split(" ");
		return new Reindeer(+words[3], +words[6], +words[13]);
	});

	for (let t = 0; t < 2503; ++t) {
		reindeers.forEach(reindeer => reindeer.tick());
		getLeaders(reindeers, "distance").forEach(reindeer => ++reindeer.score);
	}

	let bestDistance = getLeaders(reindeers, "distance")[0].distance;
	let bestScore = getLeaders(reindeers, "score")[0].score;

	return bestDistance + " " + bestScore;
}

function getLeaders(reindeers, property) {
	return reindeers.sort((a, b) => b[property] - a[property]).filter(e => e[property] == reindeers[0][property]);
}

function Reindeer(speed, dutyTime, restTime) {
	let timer = dutyTime;

	this.distance = 0;
	this.score = 0;

	this.tick = () => {
		if (timer > 0) {
			this.distance += speed;

			if (--timer <= 0) {
				timer = -restTime;
			}
		} else if (++timer >= 0) {
			timer = dutyTime;
		}
	}
}

const input = `Vixen can fly 19 km/s for 7 seconds, but then must rest for 124 seconds.
Rudolph can fly 3 km/s for 15 seconds, but then must rest for 28 seconds.
Donner can fly 19 km/s for 9 seconds, but then must rest for 164 seconds.
Blitzen can fly 19 km/s for 9 seconds, but then must rest for 158 seconds.
Comet can fly 13 km/s for 7 seconds, but then must rest for 82 seconds.
Cupid can fly 25 km/s for 6 seconds, but then must rest for 145 seconds.
Dasher can fly 14 km/s for 3 seconds, but then must rest for 38 seconds.
Dancer can fly 3 km/s for 16 seconds, but then must rest for 37 seconds.
Prancer can fly 25 km/s for 6 seconds, but then must rest for 143 seconds.`;
