/**
 * Created by chaika on 02.02.16.
 */
var fs = require('fs');
var ejs = require('ejs');


exports.PopularTest = ejs.compile(fs.readFileSync('./Frontend/templates/PopularTest.ejs', "utf8"));
exports.DefaultTest = ejs.compile(fs.readFileSync('./Frontend/templates/DefaultTest.ejs', "utf8"));
