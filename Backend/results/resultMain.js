var BrawlStars = require("./BrawlStarsTest").resultHTML;
var Genius = require("./GeniusTest").resultHTML;

exports.resultHTML = function(id) {
    if(id == "BrawlStarsTest")
        return BrawlStars;
    else if(id == "GeniusTest")
        return Genius;
    else
        return Genius;
}