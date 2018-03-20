//Adding dependencies.
const fs = require('fs');

//Checking for arguments.
if (process.argv.length<3) {
    console.log("LMSC EO1: No file provided in arguments.");
    process.terminate(1);
} else {
    //Attempting to read.
		try {
		    //later
		}
		catch (err) {
		    console.log("LMSC EO2: Error opening file '"+process.argv[2]+"'.");
				process.terminate(1);
		}
}
