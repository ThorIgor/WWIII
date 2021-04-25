const fs = require('fs');
var path = require('path');
var testFolder = path.join( __dirname, '/data');

exports.getTest= function(req, res) {
    res.json(getTest(req.query['testName']));
}

exports.getTestList = function(req,res) {
    res.json(JSON.parse(getAllTestsShort()));
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
    return arr;
}
    
function search(param) {
    var result = [];
     arr = getAllTestsShort();
    console.log(JSON.parse(arr[i]['name']));
    for(var i; arr.length;++i)
        if(arr[i].name.contains(param) || arr[i].description.contains(param) || arr[i].id.contains(param))
            result.push(arr[i]);
    console.log(result);
    return result;
}