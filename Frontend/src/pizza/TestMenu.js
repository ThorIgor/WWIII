/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var Test_List = require('../Test_List');

//HTML едемент куди будуть додаватися піци
var $test_list = $("#test_list");

function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $test_list.html("");

    //Онволення однієї піци
    function showOneTest(test) {
        var html_code = Templates.TestMenu_OneItem({test: test});
    }

    list.forEach(showOnePizza);
}

/**
function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];

    Pizza_List.forEach(function(pizza){
        //Якщо піка відповідає фільтру
        //pizza_shown.push(pizza);

        //TODO: зробити фільтри
    });

    //Показати відфільтровані піци
    showPizzaList(pizza_shown);
}
 */

function initialiseMenu() {
    //Показуємо усі піци
    showPizzaList(Test_List);
}

// exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;