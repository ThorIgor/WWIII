/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = require('../Pizza_List');
var API = require('../API');

//HTML елемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");
var $number_field = $("#number-pizza")[0];

// For text check
var nameI = false, phoneI = false, addressI = false;

function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    if(!$number_field)
        return;
    $pizza_list.html("");
    $number_field.innerText = list.length;
    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        var $node = $(html_code);

        $node.find(".buy-big").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
        });
        $node.find(".buy-small").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });

        $pizza_list.append($node);
    }

    list.forEach(showOnePizza);
}

function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];
    if (filter === 'all') {
        Pizza_List.forEach(function (pizza) {
            //Якщо піка відповідає фільтру

            pizza_shown.push(pizza);
        });
    }
    else if (filter === 'vega'){
        Pizza_List.forEach(function (pizza) {
            //Якщо піка відповідає фільтру
            if (!pizza.content.meat && !pizza.content.ocean){
                pizza_shown.push(pizza);}
        });
    }
    else {
        Pizza_List.forEach(function (pizza) {
            //Якщо піка відповідає фільтру

            for (const [key] of Object.entries(pizza.content)) {
                if (key === filter) {
                    pizza_shown.push(pizza);
                }
            }
        });
    }

    //Показати відфільтровані піци
    showPizzaList(pizza_shown);
}

function initialiseMenu() {
    //Показуємо усі піци
    $("#sort-all").click(function() {
       filterPizza("all");
    });
    $("#sort-meat").click(function() {
        filterPizza("meat")
    });
    $("#sort-chicken").click(function () {
        filterPizza("chicken");
    });
    $("#sort-seafood").click(function () {
        filterPizza("ocean");
    });
    $("#sort-pineapple").click(function () {
        filterPizza("pineapple");
    });
    $("#sort-mushroom").click(function () {
        filterPizza("mushroom");
    });

    $("#sort-vega").click(function () {
        filterPizza("vega");
    });
    showPizzaList(Pizza_List)
}

function checkInputs() {
    if(nameI && phoneI && addressI)
        document.getElementById("submit-order").disabled = false;
    else
        document.getElementById("submit-order").disabled = true;
}

$("#nameInput").keyup(function(){
    if (this.value.match("^([А-ЯІЇ]{1}[а-яёії]{1,23}|[A-Z]{1}[a-z]{1,23})$")){
        $("#name").css("color","green");
        $("#nameError").text("");
        nameI = true;
    } else {
        $("#name").css("color","red");
        $("#nameError").text("Введіть правильне ім'я");
        $("#nameError").css("color","red");
        nameI = false
    }
    checkInputs();
});

$("#phoneInput").keyup(function(){
    if (!this.value.match("^([0|\\+[0-9]{1,5})?([7-9][0-9]{10})$")){
        $("#phone").css("color","red");
        $("#phoneError").text("Введіть правильний номер телефону");
        $("#phoneError").css("color","red");
        phoneI = false;
    }
    else {
        $("#phone").css("color","green");
        $("#phoneError").text("");
        phoneI = true;
    }
    checkInputs();
});
$("#addressInput").keyup(function(){
    if (this.value.match("^[а-яіїА-ЯІЇ0-9,\\.\\s]+$")){
        $("#address").css("color","green");
        $("#addressError").text("");
        addressI = true;
    } else {
        $("#address").css("color","red");
        $("#addressError").text("Введіть правильну адресу");
        $("#addressError").css("color","red");
        addressI = false;
    }
    checkInputs();
});

function sendToBack() {

}

$("#submit-order").click(function () {

    var phoneNumber = $("#phoneInput").val();
    var login = $("#nameInput").val();
    var address = $("#addressInput").val();
    if (phoneNumber === "" || login === "" || address === "")
        return;
    var pizzas = [];
    PizzaCart.getPizzaInCart().forEach(element =>
        pizzas.push(element));
    var order_info = {
        phoneNumber: phoneNumber,
        login: login,
        address: address,
        pizzas: pizzas
    }
    API.createOrder(order_info, sendToBack);
});


exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;