const fs = require('fs');
var path = require('path');
var testFolder = path.join(__dirname, '/data/');
exports.sendTest= function(req, res) {
    res.json(getTest(req.params['testName']));
};

exports.sendTestList = function(req,res) {
    let arr[];
    let testObj;
    let testList = getTestList();
    for(int i = 0; i < testList.length;++i){
        testObj= {
            id = testList[i],
            name = getTest(testList[i]).title,
            description = getTest(testList[i]).description,
            logo = getTest(testList[i]).logo
        }
        arr.push(testObj);
    }
    res.json(arr);
}


function getTest(name) {
    try { return JSON.parse(fs.readFileSync(path.join(testFolder ,name, '.json'))); }
    catch{}
    return 0;
}

function getTestList() { 
        return fs.readdirSync(testFolder);
}