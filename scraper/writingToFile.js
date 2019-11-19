const fs = require("fs");

var stream = fs.createWriteStream("append.txt", {flags:'a'});

console.log(new Date().toISOString());

[...Array(10000)].forEach( function (item,index) {
    stream.write(index + "\n");
});

console.log(new Date().toISOString());

stream.end();