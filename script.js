$(document).ready(function(){
    var questions = [];
    var qAndA = [
        "question 1", "answer 1", "answer 2", "answer 3", "answer 4",
        "question 2", "answer 1", "answer 2", "answer 3", "answer 4",
        "question 3", "answer 1", "answer 2", "answer 3", "answer 4",
        "question 4", "answer 1", "answer 2", "answer 3", "answer 4",
        "question 5", "answer 1", "answer 2", "answer 3", "answer 4",
        "question 6", "answer 1", "answer 2", "answer 3", "answer 4",
        "question 7", "answer 1", "answer 2", "answer 3", "answer 4",
        "question 8", "answer 1", "answer 2", "answer 3", "answer 4",
        "question 9", "answer 1", "answer 2", "answer 3", "answer 4",
        "question 10", "answer 1", "answer 2", "answer 3", "answer 4",
        "question 11", "answer 1", "answer 2", "answer 3", "answer 4",
        "question 12", "answer 1", "answer 2", "answer 3", "answer 4",
        "question 13", "answer 1", "answer 2", "answer 3", "answer 4",
        "question 14", "answer 1", "answer 2", "answer 3", "answer 4",
        "question 15", "answer 1", "answer 2", "answer 3", "answer 4",
        "question 16", "answer 1", "answer 2", "answer 3", "answer 4",
        "question 17", "answer 1", "answer 2", "answer 3", "answer 4",
        "question 18", "answer 1", "answer 2", "answer 3", "answer 4",
        "question 19", "answer 1", "answer 2", "answer 3", "answer 4",
        "question 20", "answer 1", "answer 2", "answer 3", "answer 4",
    ];

        //using Question object to more easily organize information, better datastructure
        function Question(question, firstAnswer, secondAnswer, thirdAnswer, fourthAnswer){
            this.question = question;
            this.firstAnswer = firstAnswer;
            this.secondAnswer = secondAnswer;
            this.thirdAnswer = thirdAnswer;
            this.fourthAnswer = fourthAnswer;
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
        
        startTimer();
        populateQuiz();
    });

    function populateQuiz(){
        //random question from array of questions that way students can't cheat as easily, hard coded for 20 questions
        let randomQ = Math.floor(Math.random() * 19);
        $('#firstElement').text(questions[randomQ].firstAnswer);
        $('#secondElement').text(questions[randomQ].secondAnswer);
        $('#thirdElement').text(questions[randomQ].thirdAnswer);
        $('#fourthElement').text(questions[randomQ].fourthAnswer);
    }
    
        var startTime;
        var updatedTime;
        var difference;
        var tInterval;
        var savedTime;
        var paused = 0;
        var running = 0;
    
    function startTimer(){
        if(!running){
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1000);
        paused = 0;
        running =1;
        }
    }
    function pauseTimer(){
        if (!difference){
          // if timer never started, don't allow pause button to do anything
        } 
        else if (!paused){
          clearInterval(tInterval);
          savedTime = difference;
          paused = 1;
          running = 0;
        }
        else{
           startTimer(); 
        }
    }
    function resetTimer(){
        clearInterval(tInterval);
        savedTime = 0;
        difference = 0;
        paused = 0;
        running = 0;
    }
});