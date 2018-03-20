//Requiring correct modules.
var fs = require('fs');

//Creating all memory slots.
var mem = [];
for (var i=0; i<100; i++) {
	mem.push(000);
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
		//EXT Valid, sending to memory loader.
		memload(filename);
	}
}

function memload(filename) {
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

  			//Saving instructions in file to addresses.
  			for (i in data) {
  				//Removing header.
  				if (i!=0) {
	  				//Verifying they're valid addresses.
	  				try {
	  					dint = parseInt(data[i][0]);
	  				}
	  				catch (err) {
	  					console.log("LMC EO3: Invalid address at line "+(i+1)+".");
	  					process.exit(1);
	  				}

	  				//Checking address is within range.#
	  				if (dint>99 || dint<0) {
	  					console.log("LMC EO4: Address out of range at line "+(i+1)+".");
	  					process.exit(1);
	  				} else {
	  					//Valid, now checking Opcodes.
	  					var opcode = data[i][1];
	  					var validOp = false;
	  					console.log(opcode.substring(0,1));

	  					//Checking opcode substrings and operators.
	  					if (opcode==901 || opcode==902) {
	  						validOp = true;
	  					} else if (opcode.length==3 && opcode.substring(0, 1)==5) {
	  						validOp = true;
	  					} else if (opcode.length==3 && opcode.substring(0, 1)==3) {
	  						validOp = true;
	  					} else if (opcode.length==3 && opcode.substring(0, 1)==1) {
	  						validOp = true;
	  					} else if (opcode.length==3 && opcode.substring(0, 1)==2) {
	  						validOp = true;
	  					} else if (opcode.length==3 && opcode.substring(0, 1)==7) {
	  						validOp = true;
	  					} else if (opcode.length==3 && opcode.substring(0, 1)==8) {
	  						validOp = true;
	  					} else if (opcode.length==3 && opcode.substring(0, 1)==6) {
	  						validOp = true;
	  					} 

	  					//Final validation for a valid operator code.
	  					if (validOp==false) {
	  						console.log("LMC EO5: Invalid opcode at address "+dint+".");
	  						process.exit(1);
	  					} else {
	  						mem[dint] = data[i][1]; 
	  					}
	  				}
	  			}
  			}

  			//All memory saved, continuing to interpreter. PC starting at zero.
  			interpreter(0);
		});
	}
	catch (err) {
		console.log("LMC E02: Failure loading LMC file.");
		process.exit(1);
	}
}

//Interpreter function, processes opcodes and provides function.
//Takes a starting address.
function interpreter(s) {
	//Looping through memory, checking for start address.
	for (i in mem) {
		//Check for optype from start address onward.
		if (i>=s) {
			var opcode = mem[i].substring(0,1);

			if (opcode==5) {
				//load
			} else if (opcode==3) {
				//store
			} else if (opcode==1) {
				//add
			} else if (opcode==2) {
				//subtract
			} else if (opcode==7) {
				//branch if zero
			} else if (opcode==8) {
				//branch if zero or pos
			} else if (opcode==6) {
				//branch always
			}
		}
	}
}
