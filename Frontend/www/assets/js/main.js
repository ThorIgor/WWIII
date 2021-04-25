var API_URL = "http://localhost:8080";

function backendGet(url, callback) {
    $.ajax({
        url: API_URL + url,
        type: 'GET',
        success: function(data){
            callback(null, data);
        },
        error: function() {
            callback(new Error("Ajax Failed"));
        }
    })
}

function backendPost(url, data, callback) {
    $.ajax({
        url: API_URL + url,
        type: 'POST',
        contentType : 'application/json',
        data: JSON.stringify(data),
        success: function(data){
            callback(null, data);
        },
        error: function() {
            callback(new Error("Ajax Failed"));
        }
    })
}

var fs = require('fs');
var ejs = require('ejs');


var PopularTest = ejs.compile(fs.readFileSync('./Frontend/templates/PopularTest.ejs', "utf8"));
var DefaultTest = ejs.compile(fs.readFileSync('./Frontend/templates/DefaultTest.ejs', "utf8"));

var testList = fs.readdirSyc("../../Backend/data/");

var popular_tests_block = $(".block1");
var all_tests_block = $(".block3");

function filterPopular(list) {
    var popular_list = [];
    list.forEach(function(val) {
       if(val.popular === true)
           popular_list.push(val);
    });
    return popular_list;
}

function showTests(all_list) {
    var popular_list = filterPopular(all_list);

    popular_tests_block.html("");
    all_tests_block.html("");

    function showPopularTest(test) {
        var html_code = Templates.PopularTest({test: test});
        var node = $(html_code);

        node.click(function() {
            API.getTest("/test/" + test.filename);
        });

        popular_tests_block.append(node);
    }

    function showAllTest(test) {
        var html_code = Templates.DefaultTest({test: test});
        var node = $(html_code);

        node.click(function() {
            API.getTest("/test/" + test.filename);
        });

        all_tests_block.append(node);
    }

    popular_list.forEach(showPopularTest);
    all_list.forEach(showAllTest);
}

function initialiseMainPage() {
    showTests(Test_List);
}


