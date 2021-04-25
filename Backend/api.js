const fs = require('fs');
var path = require('path');
var testFolder = path.join(__dirname, '/data/');
exports.sendTest= function(req, res) {
    res.json(req.params['testName']);
};

exports.sendTestList = function(req,res) {
    
}


function getTest(name) {
    try { return JSON.parse(fs.readFileSync(path.join(testFolder ,name, '.json'))); }
    catch{}
    return 0;
}

function getTestList() { 
        return fs.readdirSync(testFolder);
}