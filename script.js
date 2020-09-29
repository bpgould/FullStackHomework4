$(document).ready(function(){
    var questions = [];

    class Question{
        constructor(q, first, second, third, fourth){
            this.question = q;
            this.firstQuestion = first;
            this.secondQuestion = second;
            this.thirdQuestion = third;
            this.fourthQuestion = fourth;
        }
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

        startQuiz();
    });

    function startQuiz(){
        

       
    }

});