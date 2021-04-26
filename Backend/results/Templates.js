var fs = require('fs');
var ejs = require('ejs');

exports.BrawlStars = ejs.compile(fs.readFileSync('./Backend/results/BrawlStars.ejs', "utf8"));
exports.Genius = ejs.compile(fs.readFileSync('./Backend/results/Genius.ejs', "utf8"));