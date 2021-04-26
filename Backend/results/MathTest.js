
var Templates = require("./Templates")

exports.resultHTML = function(data) {
    console.log(data);
    var sum = 0;
    if(data.question1 == "47")
        sum+=1;
    if(data.question2 == "21")
        sum+=1;
    if(data.question3 == "17")
        sum+=1;
    if(data.question4[0] = "1" && data.question4[1] == "8" && data.question4[2] == "34")
        sum+=1;
    if(data.question5 == "oleg")
        sum+=1;
    if(data.question6[0] == "1.2" && data.question6[1] == "1/2")
        sum+=1;
    return Templates.Math({text: "Your grade: " + sum});
}