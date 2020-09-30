$(document).ready(function(){
    var questions = [];
    var qAndA = [
        "question  1",
        "answer 1",
        "answer 2",
        "answer 3",
        "answer 4",
        "question 2",
        "answer 11",
        "answer 22",
        "answer 33",
        "answer 44",
    ];

    
        function Question(question, firstQuestion, secondQuestion, thirdQuestion, fourthQuestion){
            this.question = question;
            this.firstQuestion = firstQuestion;
            this.secondQuestion = secondQuestion;
            this.thirdQuestion = thirdQuestion;
            this.fourthQuestion = fourthQuestion;
        }
        // added toString for easier debugging
        Question.prototype.toString = function questionToString(){
            return this.question;
        }
    
    var counter = 0;
    for(i=0;i<qAndA.length-4;i+=5){
        let x = new Question(qAndA[i],qAndA[i+1],qAndA[i+2],qAndA[i+3],qAndA[i+4]);
        questions[counter]=x;
        counter++;
    }

    
    $("#startQuizButton").click(function(){
        $("#hiddenOncePlayed").css('display','none')
        jQuery('<div/>',{
            id: 'quizContent'
        }).appendTo('#mainTextArea');

        jQuery('<ul/>',{
            id: 'listContent',
            class: 'list-group'
        }).appendTo('#quizContent');
        
        $('#listContent').append(
            '<li id="firstElement"></li>'
        ).addClass('list-group-item');

        $('#listContent').append(
            '<li id="secondElement"></li>'
        ).addClass('list-group-item');

        $('#listContent').append(
            '<li id="thirdElement"></li>'
        ).addClass('list-group-item');

        $('#listContent').append(
            '<li id="fourthElement"></li>'
        ).addClass('list-group-item');

        populateQuiz();
    });

    function populateQuiz(){
        
        // get question and randomize order that answers are displayed
       
    }

});