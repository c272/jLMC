//Requiring correct modules.
var fs = require('fs');

//Creating all memory slots.
for (var i=0; i<100; i++) {
	eval("var m"+i+" = 1");
}

//Creating ACC, PC, IR, and AR.
var acc = 000;
var pc = 0;
var ir = 0;
var ar = 0;

//Reading from file.
if (process.argv.length<3) {
	console.log("LMC E00: Usage is "+process.argv[1]+" [filename].lmc");
	process.exit(1);
} else {
	//Checking file extension validity.
	var filename = process.argv[2];
	var validfile = false;
	var fileext = filename.substring(filename.length-4);

	if (fileext!=".lmc") {
		console.log("LMC E01: Invalid file extension '"+fileext+"'.");
	} else {
		//EXT Valid, sending to interpreter.
		interpreter();
	}
}

function interpreter() {
	// Unfinished.
}