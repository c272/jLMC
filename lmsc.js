//Adding dependencies.
const fs = require('fs');
const input = require('prompt-input');
const currentver = "1";

//Checking for arguments.
if (process.argv.length<3) {
    console.log("LMSC EO1: No file provided in arguments.");
    process.terminate(1);
} else {
    //Attempting to read.
		try {
		    fs.readFile(process.argv[2], 'utf8', function(err, data) {
		    	compile(data);
		    });
		}
		catch (err) {
		    console.log("LMSC EO2: Error opening file '"+process.argv[2]+"'.");
		    console.log(err);
			process.exit(1);
		}
}

//Reading file commands into 2DArray.
function compile(data) {
	var file = data;
	var file = file.split("\r\n")

	//Creating output array.
	var out = [];
	for (var i=0; i<100; i++) {
		if (i<10) {
			out.push(["0"+i, ""]);
		} else {
			out.push([i, ""]);
		}
	}

	//Splitting file.
	for (i in file) {
		file[i] = file[i].split(" ");	
	}

	//Removing "?" header, if it exists.
	file[0][0] = file[0][0].substring(1);

	//Checking that all addresses are valid.
	for (i in file) {
		if (file[i][1]) {
			//Broad checks, more specific ones need to be done on a command basis.
			if (file[i][1].length>3 || file[i][1].length<2) {
				console.log("LMSC EO3: Invalid address at line "+i+".");
				process.exit(1);
			}
		}

		//Processing, adding to dictionary.
		if (file[i][0]=="STA") {
			//Store, setting opcode and address into output file.
			out[i][1]="3"+file[i][1];
		} else if (file[i][0]=="LDA") {
			//Load, setting opcode and address into output file.
			out[i][1]="5"+file[i][1];
		} else if (file[i][0]=="ADD") {
			//Add, setting address for load.
			out[i][1]="1"+file[i][1];
		} else if (file[i][0]=="SUB") {
			//Subtract, setting address for load.
			out[i][1]="2"+file[i][1];
		} else if (file[i][0]=="INP") {
			//Input, code 901.
			out[i][1]="901";
		} else if (file[i][0]=="OUT") {
			//Output, code 902.
			out[i][1]="902";
		} else if (file[i][0]=="HLT") {
			//Halt, code null.
			out[i][1]="000";
		} else if (file[i][0]=="BRZ") {
			//Branch if zero, setting address for load.
			out[i][1]="7"+file[i][1];
		} else if (file[i][0]=="BRP") {
			//Branch if zero or positive, setting address.
			out[i][1]="8"+file[i][1];
		} else if (file[i][0]=="BRA") {
			//Always branch, 6.
			out[i][1]="6"+file[i][1];
		} else if (file[i][0]=="DAT") {
			//Data, only set the following characters after it.
			if (file[i][1].length!=3) {
				console.log("LMSC EO4: Invalid data length at line "+i+".");
				process.exit(1);
			} else {
				out[i][1]=file[i][1];
			}
		} else {
			//Code invalid! Throwing compiler error.
			console.log("LSMC EO4: Invalid operation listed at line "+i+".");
			process.exit(1);
		}

		//Position +
		console.log("LMSC: Loaded line "+i);
	}

	//Formatting string.
	var inp1 = new input({
	    name: 'title',
	    message: 'Enter a title for your script.'
	});

	//Asking, returning to func.
	inp1.ask(function(ans1) {
		output(ans1)
	});

	//Output func.
	function output (a) {
		//Grabbing date.
		//stackoverflow.com/questions/12409299/how-to-get-current-formatted-date-dd-mm-yyyy-in-javascript-and-append-it-to-an-i
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!

		var yyyy = today.getFullYear();
		if(dd<10){
		    dd='0'+dd;
		} 
		if(mm<10){
		    mm='0'+mm;
		} 
		//Today is the date string.
		var today = dd+'/'+mm+'/'+yyyy;

		//Formatting title.
		a = a.replace(" ", "_");
		//Creating outstring.
		var outstring = "LMC "+today+" "+a+" "+currentver+"\r\n";
		for (i in out) {
			if (out[i][1]) {
				outstring+=out[i][0]+" "+out[i][1]+"\r\n";
				console.log("LMSC: String formatted line "+i);
			}
		}

		//Trimming outstring.
		outstring = outstring.slice(0, outstring.length-2);

		var fname = process.argv[2].substring(0, process.argv[2].length-4)+".lms";
		//Load into default addresses, start from zero.
		fs.writeFile(fname, outstring, function(err) {
			console.log(" ");
	    	console.log("LMSC: FILE WRITING FINISHED! "+fname+" WRITTEN TO FOLDER.");
	    	console.log(" ");
		});
	}
}
