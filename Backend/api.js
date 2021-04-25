const fs = require('fs');
var path = require('path');
var testFolder = path.join( __dirname, '/data');

exports.getTest= function(req, res) {
    res.json(getTest(req.query['testName']));
}

exports.getTestList = function(req,res) {
    res.json(getAllTestsShort());
}

exports.getSearchResults = function(req,res){
    res.json(search(req.query['search_query']));
}

function getTest(name) {
    try { return JSON.parse(fs.readFileSync(path.join(testFolder ,name+ '.json'))); }
    catch{}
    return 0;
}

function getTestList() {
    console.log(fs.readdirSync(testFolder));
    return fs.readdirSync(testFolder);
}

function getAllTestsShort()
{
    let arr=[];
    let testObj;
    let testList = getTestList();
    for(let i = 0; i < testList.length;++i){
        testObj= {
            id : path.basename(testList[i],'.json'),
            name : getTest(path.basename(testList[i],'.json')).title,
            description : getTest(path.basename(testList[i],'.json')).description,
            logo : getTest(path.basename(testList[i],'.json')).logo,
            popular: getTest(path.basename(testList[i],'.json')).popular
        }
        arr.push(testObj);
    }
    return JSON.stringify(arr);
}
    
function search(param) {
    var result = [];
    var arr = JSON.parse(getAllTestsShort());
    param = param.toLowerCase();
    arr.forEach(function(val) {
        if(val.name.toLowerCase().includes(param) || val.description.toLowerCase().includes(param) || val.id.toLowerCase().includes(param))
            result.push(val);
    });
    return result;
}
    
