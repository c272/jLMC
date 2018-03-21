//Requiring correct modules.
var fs = require('fs');
//Setting version.
var currentver = 1;
var outer = this;

//Creating all memory slots.
var mem = [];
for (var i=0; i<100; i++) {
	mem.push(000);
}

//Creating ACC, PC, IR, and AR.
var acc = 0;
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
	  					//Checking operations are 3 long.
	  					if (data[i][1].length==3) {
	  						//Valid, loading to memory.
	  						mem[dint] = data[i][1];
	  					} else {
	  						//Invalid length.
	  						console.log("LMC EO5: Invalid opcode length, address "+i+".");
	  						process.exit(1);
	  					}
	  			
	  				}
	  			} else {
	  				//Loading filename, versions.
	  				outer.fname = data[0][2].replace("_", " ");
	  				outer.version = data[0][3];
	  				outer.compiledate = data[0][1];
	  			}
  			}

  			//All memory saved, checking version is not future.
  			if (outer.version>currentver) {
  				console.log("LMC EO8: File version ahead of interpreter, download latest source.");
  				process.exit(1);
  			}

  			//File valid, interpreting.
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
	//Printing header.
	console.log(outer.fname+ " | "+outer.compiledate+" | LMCv"+outer.version);
	console.log("--------------------");

	//Looping through memory, checking for start address.
	for (i in mem) {
		//Check for optype from start address onward.
		if (i>=s) {
			var opcode = parseInt(mem[i].substring(0,1));
			var opadd = parseInt(mem[i].substring(1));
			var op = mem[i];

			if (opcode==5 && op.length==3) {
				//LOAD
				//Set accumulator to value.
				acc = mem[opadd];
				//Sanitizing.
				acc = parseInt(acc);
				console.log("Loaded VAL "+acc+" from location "+opadd+".");
			} else if (opcode==3 && op.length==3) {
				//STORE
				//Set address value to ACC.
				mem[opadd] = acc;
				console.log("Saved VAL "+acc+" to location "+opadd+".");
			} else if (opcode==1 && op.length==3) {
				//ADD
				//Add accumulator value to address.
				acc+=parseInt(mem[opadd]);
				if (acc>999) {
					console.log("LMC EO7: Accumulator overflow, val>999.");
					process.exit(1);
				}
				console.log("Added VAL "+mem[opadd]+" to ACC.");
			} else if (opcode==2 && op.length==3) {
				//SUB
				//Take address value from ACC.
				acc-=parseInt(mem[opadd]);
				console.log("Took VAL "+mem[opadd]+" from ACC.");
			} else if (opcode==7 && op.length==3) {
				//BIZ
				//Branch if Zero
				if (acc==0) {
					i=parseInt(mem[opadd]);
					console.log("PC set to VAL "+mem[opadd]+".");
				} else {
					console.log("BIZ failed, ACC not zero.");
				}
			} else if (opcode==8 && op.length==3) {
				//BIZOP
				//Branch if Zero or Positive
				if (acc==0 || acc>=0 && op.length==3) {
					i=parseInt(mem[opadd]);
					console.log("PC set to VAL "+mem[opadd]+".");
				} else {
					console.log("BIZOP failed, ACC not zero or positive.");
				}
			} else if (opcode==6 && op.length==3) {
				//BRA
				//Branch Always
				i=parseInt(mem[opadd]);
				console.log("PC set to VAL "+mem[opadd]+".");
			} else if (op==901 && op.length==3) {
				//INP
				//Taking input from user using prompt.

			} else if (op==902 && op.length==3) {
				//OUT
				//Outputting to console.
				console.log("OUTPUT: "+acc);
			} else if (op==000) {
				//HLT
				//Terminating for loop.
				console.log("EOF, halting...");
				break;
			} else {
				//No command found, invalid injected code or before halt.
				console.log("LMC EO6: Invalid operation at address "+i+", operation "+op+". Have you placed data before a halt?");
				process.exit(1);
			}
		}
	}
}
