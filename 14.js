"use strict";

function calc() {
	var reindeers = [];	
	
	input.split("\n").forEach(function(line) {
		var words = line.split(" ");
		reindeers.push(new Reindeer(+words[3], +words[6], +words[13]));
	});

	for (var t = 0; t < 2503; ++t) {
		reindeers.forEach(function(reindeer) {
			reindeer.tick();
		});

		var leaders = getLeaders(reindeers, "distance");

		leaders.forEach(function(reindeer) {
			++reindeer.score;
		});
	}

	var bestDistance = getLeaders(reindeers, "distance")[0].distance;
	var bestScore = getLeaders(reindeers, "score")[0].score;

	return bestDistance + " " + bestScore;
}

function getLeaders(reindeers, property) {
	var bestValue = 0;
	var leaders = [];

	reindeers.forEach(function(reindeer) {
		if (reindeer[property] > bestValue) {
			bestValue = reindeer[property];
			leaders = [];
			leaders.push(reindeer);
		} else if (reindeer[property] == bestValue) {
			leaders.push(reindeer);
		}
	});

	return leaders;
}

function Reindeer(speed, dutyTime, restTime) {
	var timer = dutyTime;

	this.distance = 0;
	this.score = 0;

	this.tick = function() {
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

var input = `Vixen can fly 19 km/s for 7 seconds, but then must rest for 124 seconds.
Rudolph can fly 3 km/s for 15 seconds, but then must rest for 28 seconds.
Donner can fly 19 km/s for 9 seconds, but then must rest for 164 seconds.
Blitzen can fly 19 km/s for 9 seconds, but then must rest for 158 seconds.
Comet can fly 13 km/s for 7 seconds, but then must rest for 82 seconds.
Cupid can fly 25 km/s for 6 seconds, but then must rest for 145 seconds.
Dasher can fly 14 km/s for 3 seconds, but then must rest for 38 seconds.
Dancer can fly 3 km/s for 16 seconds, but then must rest for 37 seconds.
Prancer can fly 25 km/s for 6 seconds, but then must rest for 143 seconds.`;
