var BrawlStars = require("./BrawlStarsTest").resultHTML;
var Genius = require("./GeniusTest").resultHTML;
var Math = require("./MathTest").resultHTML;

exports.resultHTML = function(id) {
    if(id == "BrawlStarsTest")
        return BrawlStars;
    else if(id == "GeniusTest")
        return Genius;
    else if(id == "MathTest")
        return Math;
    else
        return Genius;
}