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
		interpreter(filename);
	}
}

function interpreter(filename) {
	//Attempting to read file.
	try {
		fs.readFile(filename, 'utf8', function(err, data) {
  			if (err) throw err;
  			console.log("OK:  Loaded LMC file.");

  			//Splitting data into separate lines.
  			data = data.split("\r\n");
  			
  			//Splitting split data into addresses and commands.
  			for (i in data) {
  				data[i] = data[i].split(" ");
  			}

  			//Unfinished.
		});
	}
	catch (err) {
		console.log("LMC E02: Failure loading LMC file.");
		process.exit(1);
	}
}
