var fs = require('fs');
var ejs = require('ejs');

exports.BrawlStars = ejs.compile(fs.readFileSync('./Backend/data/results/BrawlStars.ejs', "utf8"));