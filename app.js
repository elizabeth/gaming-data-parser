"use strict";
var fs = require('fs');
var csv = require('fast-csv');
var stream = fs.createReadStream("data.csv");

var charMale = 0;
var charFemale = 0;
var charOther = [];
var MtoM = 0;
var FtoF = 0;
var MtoF = 0;
var FtoM = 0;
var MtoFtoM = 0;
var FtoMtoF = 0;
var MtoMtoF = 0;
var FtoFtoM = 0;

csv
 .fromStream(stream, {headers : [ , , , , "character" , "age" , "birth" , "identify"], ignoreEmpty: true})
 .validate(function(data){
     return data.character != "";
 })
 // .on("data-invalid", function(data){
 //     //do something with invalid row
 // })
 .on("data", function(data){
 	var charac = data.character;
    var birth = data.birth;
    var identify = data.identify;

    switch(charac) {
    	case "Male":
     		charMale++;
     		switch(birth) {
		     	case "Male":
		     		MtoM++;
		     		if(identify == "Female")
		     			MtoMtoF++;
		     		break;
		 		case "Female":
		 			MtoF++;
		 			if(identify == "Male")
		     			MtoFtoM++;
		 			break;
		     }
     		break;
 		case "Female":
 			charFemale++;
 			switch(birth) {
		     	case "Male":
		     		FtoM++;
		     		if(identify == "Female")
		     			FtoMtoF++;
		     		break;
		 		case "Female":
		 			FtoF++;
		 			if(identify == "Male")
		     			FtoFtoM++;
		 			break;
		     }
 			break;
 		default:
 			charOther.push(charac + " - " + birth + " " + identify);
     }
 })
 .on("end", function(){
 	charOther.shift(); //ignore first row
 	for(var i = 0; i < charOther.length; i++) {
 		console.log(charOther[i])
 	}
 	console.log();

    console.log("Male character: " + charMale);
    console.log("Female character: " + charFemale);
    console.log("MtoM birth: " + MtoM);
    console.log("FtoF birth: " + FtoF);
    console.log("MtoF birth: " + MtoF);
    console.log("FtoM birth: " + FtoM);
    console.log("MtoFtoM identify: " + MtoFtoM);
	console.log("FtoMtoF identify: " + FtoMtoF);
	console.log("MtoMtoF identify: " + MtoMtoF);
	console.log("FtoFtoM identify: " + FtoFtoM);
    //ignore first row
 });