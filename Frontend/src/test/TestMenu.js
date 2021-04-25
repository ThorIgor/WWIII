
var API = require(('../API'))
var Templates = require('../Templates');
var Test_List = [require('../../../Backend/data/BrawlStarsTest.json')];
console.log(Test_List);


var popular_tests_block = $(".popular-tests");
var all_tests_block = $(".all-tests");

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
            API.getTest("/testPage/getTest/" + test.filename);
        });

        popular_tests_block.append(node);
    }

    function showAllTest(test) {
        var html_code = Templates.DefaultTest({test: test});
        var node = $(html_code);

        node.click(function() {
            API.getTest("/testPage/getTest/" + test.filename);
        });

        all_tests_block.append(node);
    }
    API.getTestList(sendTestList());


    popular_list.forEach(showPopularTest);
    all_list.forEach(showAllTest);
}

function initialiseMainPage() {
    showTests(Test_List);
}

$("")

exports.initialiseMainPage = initialiseMainPage;

