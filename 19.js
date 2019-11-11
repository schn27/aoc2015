"use strict";

function calc() {
	let lines = input.split("\n").filter(e => e.trim() !== "");
	
	const molecule = lines.pop();
	
	let table = [];
	lines.forEach(e => table.push({from: e.split(" => ")[0], to: e.split(" => ")[1]}));

	return part1(molecule, table) + " " + part2(molecule, table);
}

function part1(molecule, table) {
	let results = {};

	table.forEach(e => {
		const parts = molecule.split(e.from);
		for (let i = 1; i < parts.length; ++i) {
			results[[parts.slice(0, i).join(e.from), parts.slice(i).join(e.from)].join(e.to)] = 1;
		}
	});

	results[molecule] = 0;

	return Object.keys(results).reduce((s, k) => s += results[k], 0);	
}

function part2(molecule, table) {
	return destruct(molecule, table, 1);
}

function destruct(molecule, table, step) {
	for (let j = 0; j < table.length; ++j) {
		const e = table[j];
		const parts = molecule.split(e.to);

		for (let i = 1; i < parts.length; ++i) {
			const newMolecule = [parts.slice(0, i).join(e.to), parts.slice(i).join(e.to)].join(e.from);

			if (newMolecule == "e") {
				return step;
			}

			const res = destruct(newMolecule, table, step + 1);

			if (res > 0) {
				return res;
			}
		}
	}

	return 0;
}

const input = `Al => ThF
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
