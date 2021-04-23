Survey
    .StylesManager
    .applyTheme("modern");

var json = {
    "title": "Наскільки ти геній",
    "description": "Тест для перевірки твоєї геніальності",
    "pages": [
        {
            "name": "page1",
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "question1",
                    "title": "Ти вважаєш себе генієм?",
                    "choices": [
                        {
                            "value": "Так",
                            "text": "Так"
                        },
                        {
                            "value": "Ні",
                            "text": "Ні"
                        },
                        {
                            "value": "Можливо",
                            "text": "Можливо"
                        }
                    ],
                    "otherText": "Можливо"
                }
            ]
        }
    ],
    "showCompletedPage": false
}

window.survey = new Survey.Model(json);

survey
    .onComplete
    .add(function (result) {
        if(survey.data.question1 === "Так")
            document.querySelector('#surveyResult').textContent = "Ти геній";
        else
            document.querySelector('#surveyResult').textContent = "Ти дебіл";
    });

$("#surveyElement").Survey({model: survey});