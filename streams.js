#!node

"use strict";

let { createReadStream, createWriteStream, writeFile } = require("fs");
let { Transform } = require("stream");
let transformation = Transform();
let writeDestination = process.argv[2];
console.log(writeDestination);

let myWriteStream = createWriteStream(writeDestination);

transformation._transform = (buffer, _, callback) => {
    callback(null, buffer.toString().toUpperCase());
};

// myWriteStream._write = (buffer, _, next) => {
//     writeFile('languages_cap.json', buffer, (err) => {
//         if (err) throw err;
//         console.log("The data to write was added to file!");
//     });
//     next();
// };


createReadStream("languages.json")
    .pipe(transformation)
    .pipe(myWriteStream);

// writeFile('languages_cap.json', 'test garbage', (err) => {
//     if (err) throw err;
//     console.log('The file has been saved!');
// });