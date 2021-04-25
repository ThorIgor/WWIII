
var API = require(('../API'))
var Templates = require('../Templates');
var Test_List = [];

var popular_tests_block = $(".popular-tests");
var all_tests_block = $(".all-tests");

function filterPopular(list) {
    var popular_list = [];
    for(const test of list)
       if(test.popular === true)
           popular_list.push(test);
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
            API.getTest("/testPage/getTest/" + test.id);
        });

        popular_tests_block.append(node);
    }

    function showAllTest(test) {
        var html_code = Templates.DefaultTest({test: test});
        var node = $(html_code);

        node.click(function() {
            API.getTest("/testPage/getTest/" + test.id);
        });

        all_tests_block.append(node);
    }

    popular_list.forEach(showPopularTest);
    for(const test of all_list)
        showAllTest(test);
}

function initialiseMainPage() {
    API.getTestList(function(req, res) {
        if(req == null)
            Test_List = res;
        else
            console.log(req);
        console.log(Test_List);
        showTests(Test_List);
    });
}

exports.initialiseMainPage = initialiseMainPage;

