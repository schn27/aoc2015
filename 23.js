"use strict";

function calc() {
	var cpu = new Cpu(input);
	cpu.execute();

	var cpu2 = new Cpu(input);
	cpu2.setRegisterValue("a", 1);
	cpu2.execute();

	return cpu.getRegisterValue("b") + " " + cpu2.getRegisterValue("b");
}

function Cpu(programText) {
	var program = parseProgramText(programText);

	var registers = {pc: 0, a: 0, b: 0};

	this.execute = function() {
		while (registers.pc < program.length) {
			var command = program[registers.pc];

			switch (command.operation) {
			case "hlf":
				doHlf(command.operand);
				break;
			case "tpl":
				doTpl(command.operand);
				break;
			case "inc":
				doInc(command.operand);
				break;
			case "jmp":
				doJmp(command.operand);
				break;
			case "jie":
				doJie(command.operand, command.operand2);
				break;
			case "jio":
				doJio(command.operand, command.operand2);
				break;
			default:
				doNop();
			}
		}
	}

	this.getRegisterValue = function(registerName) {
		return registers[registerName];
	}

	this.setRegisterValue = function(registerName, value) {
		registers[registerName] = value;
	}

	function doHlf(operand) {
		registers[operand] = Math.floor(registers[operand] / 2);
		++registers.pc;
	}

	function doTpl(operand) {
		registers[operand] = registers[operand] * 3;
		++registers.pc;
	}

	function doInc(operand) {
		++registers[operand];
		++registers.pc;
	}

	function doJmp(operand) {
		registers.pc += getValue(operand);
	}

	function doJie(operand, operand2) {
		if ((getValue(operand) & 1) == 0) {
			doJmp(operand2);
		} else {
			++registers.pc;
		}
	}

	function doJio(operand, operand2) {
		if (getValue(operand) == 1) {
			doJmp(operand2);
		} else {
			++registers.pc;
		}
	}

	function doNop() {
		++registers.pc;
	}

	function getValue(operand) {
		return (operand in registers) ? registers[operand] : parseInt(operand, 10);
	}

	function parseProgramText(text) {
		var code = [];

		text.split("\n").forEach(function(line) {
			var command = line.split(",").join("").split(" ");
			code.push({operation: command[0], operand: command[1], operand2: command[2]});
		});

		return code;
	}
}

var input = `jio a, +16
inc a
inc a
tpl a
tpl a
tpl a
inc a
inc a
tpl a
inc a
inc a
tpl a
tpl a
tpl a
inc a
jmp +23
tpl a
inc a
inc a
tpl a
inc a
inc a
tpl a
tpl a
inc a
inc a
tpl a
inc a
tpl a
inc a
tpl a
inc a
inc a
tpl a
inc a
tpl a
tpl a
inc a
jio a, +8
inc b
jie a, +4
tpl a
inc a
jmp +2
hlf a
jmp -7`;
