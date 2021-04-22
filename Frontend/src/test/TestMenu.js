
var Test_List = require('../TestData');
var Templates = require('../Templates');


var popular_tests_block = $(".block1");
var all_tests_block = $(".block3");

function filterPopular(list) {
    return list;
}

function showTests(all_list) {
    var popular_list = filterPopular(all_list);

    popular_tests_block.html("");
    all_tests_block.html("");

    function showPopularTest(test) {
        var html_code = Templates.PopularTest({test: test});
        var node = $(html_code);

        node.href = '/test' + test.id;

        popular_tests_block.append(node);
    }

    function showAllTest(test) {
        var html_code = Templates.DefaultTest({test: test});
        var node = $(html_code);

        node.href = '/test' + test.id;

        all_tests_block.append(node);
    }

    popular_list.forEach(showPopularTest);
    all_list.forEach(showAllTest);
}

function initialiseMainPage() {
    showTests(Test_List);
}



module.exports = initialiseMainPage();

