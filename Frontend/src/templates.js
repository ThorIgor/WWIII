/**
 * Created by chaika on 02.02.16.
 */
var fs = require('fs');
var ejs = require('ejs');


exports.TestMenu_OneItem = ejs.compile(fs.readFileSync('./Frontend/templates/TestMenu_OneItem.ejs', "utf8"));


