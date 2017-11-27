"use strict";

function calc() {
	var data = parseInput(input);

	return getAllPossible1StepMolecules(data.molecule, data.replacements).length + " " + 
		   getStepsFor(data.molecule, "e", data.replacements);
}

function getAllPossible1StepMolecules(molecule, replacements) {
	var molecules = [];

	for (var pattern in replacements) {
		var items = molecule.split(pattern);

		for (var i = 1; i < items.length; ++i) {
			var before = items.slice(0, i).join(pattern);
			var after = items.slice(i).join(pattern);

			replacements[pattern].forEach(function(value) {
				molecules[[before, after].join(value)] = 1;
			});
		}
	}

	return Object.keys(molecules);
}

function getStepsFor(dst, replacements, src, step) {
	if (dst == src || step > 10000) {
		return step | 0;
	}

	var steps = getAllPossible1StepMolecules(src, replacements).map(function(candidate) {
		return getStepsFor(dst, replacements, candidate, step + 1);
	});

	return steps[steps.indexOf(Math.min.apply(null, steps))];
}

function parseInput(input) {
	var res = {
		replacements: [],
		molecule: ""
	};

	input.split("\n").forEach(function(line) {
		var items = line.split(" ");

		if (items.length >= 3) {
			if (res.replacements[items[0]] == null) {
				res.replacements[items[0]] = [];
			}

			res.replacements[items[0]].push(items[2]);
		} else if (items.length == 1) {
			res.molecule = items[0];
		}
	});

	return res;
}

var input = `Al => ThF
Al => ThRnFAr
B => BCa
B => TiB
B => TiRnFAr
Ca => CaCa
Ca => PB
Ca => PRnFAr
Ca => SiRnFYFAr
Ca => SiRnMgAr
Ca => SiTh
F => CaF
F => PMg
F => SiAl
H => CRnAlAr
H => CRnFYFYFAr
H => CRnFYMgAr
H => CRnMgYFAr
H => HCa
H => NRnFYFAr
H => NRnMgAr
H => NTh
H => OB
H => ORnFAr
Mg => BF
Mg => TiMg
N => CRnFAr
N => HSi
O => CRnFYFAr
O => CRnMgAr
O => HP
O => NRnFAr
O => OTi
P => CaP
P => PTi
P => SiRnFAr
Si => CaSi
Th => ThCa
Ti => BP
Ti => TiTi
e => HF
e => NAl
e => OMg

CRnCaCaCaSiRnBPTiMgArSiRnSiRnMgArSiRnCaFArTiTiBSiThFYCaFArCaCaSiThCaPBSiThSiThCaCaPTiRnPBSiThRnFArArCaCaSiThCaSiThSiRnMgArCaPTiBPRnFArSiThCaSiRnFArBCaSiRnCaPRnFArPMgYCaFArCaPTiTiTiBPBSiThCaPTiBPBSiRnFArBPBSiRnCaFArBPRnSiRnFArRnSiRnBFArCaFArCaCaCaSiThSiThCaCaPBPTiTiRnFArCaPTiBSiAlArPBCaCaCaCaCaSiRnMgArCaSiThFArThCaSiThCaSiRnCaFYCaSiRnFYFArFArCaSiRnFYFArCaSiRnBPMgArSiThPRnFArCaSiRnFArTiRnSiRnFYFArCaSiRnBFArCaSiRnTiMgArSiThCaSiThCaFArPRnFArSiRnFArTiTiTiTiBCaCaSiRnCaCaFYFArSiThCaPTiBPTiBCaSiThSiRnMgArCaF`;
