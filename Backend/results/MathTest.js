var Templates = require("./Templates")

exports.resultHTML = function(data) {
    var sum = parseInt(data.question1) +
        parseInt(data.question2) +
        parseInt(data.question3) +
        parseInt(data.question4) +
        parseInt(data.question5);
    return Templates.BrawlStars({logo:"",text: sum
    });
}