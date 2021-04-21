
var fs = require('fs');
var ejs = require('ejs');

exports.MainPage_OneTest = ejs.compile(fs.readFileSync('./Frontend/templates/MainPage_OneTest.ejs', "utf8"));