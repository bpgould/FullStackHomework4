$(document).ready(function(){
    var questions = [];
    var answers = [];
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
        "question 20", "answer 1", "answer 2", "answer 3", "answer 4"
    ];
    var answerKey = [
        true, false, false, false,
        false, true, false, false,
        false, false, true, false,
        false, false, false, true,
        true, false, false, false,
        false, true, false, false,
        false, false, true, false,
        false, false, false, true,
        true, false, false, false,
        false, true, false, false,
        false, false, true, false,
        false, false, false, true,
        true, false, false, false,
        false, true, false, false,
        false, false, true, false,
        false, false, false, true,
        true, false, false, false,
        false, true, false, false,
        false, false, true, false,
        false, false, false, true
    ];
        //currently missing structs from C++ :/
        function Answer(isCorrect, stringContent){
            this.isCorrect = isCorrect;
            this.stringContent = stringContent;
        }
        // Object.defineProperties(Answer.prototype,{
        //     setCorrect:{
        //         get: function(){return this.isCorrect;},
        //         set: function(val){this.isCorrect = val;}
        //     }
        // });

        // Object.defineProperty(Answer,'isCorrect',{
        //     set: function(x){this.isCorrect = x;}
        // });

        counter0 = 1;
        for(i=1; i<qAndA.length; i++){
            if(i%5!==0){
                let x = new Answer(false, qAndA[i]);
                answers[counter0-1] = x;
                counter++;
            }
        }
        // for(i=0; i<answerKey.length; i++){
        //     answers[i].isCorrect = answerKey[i];
        // }
        console.log("answers ",answers.length," answerkey ", answerKey.length);

        console.log(answers);
        //using Question object to more easily organize information, better datastructure
        function QuestionSet(question, firstAnswer, secondAnswer, thirdAnswer, fourthAnswer){
            this.question = question;
            this.firstAnswer = firstAnswer;
            this.secondAnswer = secondAnswer;
            this.thirdAnswer = thirdAnswer;
            this.fourthAnswer = fourthAnswer;
        }
        // added toString for easier debugging
        QuestionSet.prototype.toString = function questionToString(){
            return this.question;
        }
    
    var counter = 0;
    for(i=0;i<qAndA.length-4;i+=5){
        let x = new QuestionSet(qAndA[i],qAndA[i+1],qAndA[i+2],qAndA[i+3],qAndA[i+4]);
        questions[counter]=x;
        counter++;
    }

    
    $("#startQuizButton").click(function(){
        $("#hiddenOncePlayed").css('display','none');
        jQuery('<div/>',{
            id: 'quizContent'
        }).appendTo('#mainTextArea');

        jQuery('<span/>',{
            id: 'timer'
        }).appendTo('#quizContent');

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
    function startTimer(){
        startTime = new Date();
        setInterval(getShowTime, 1000);
    }

    function getShowTime(){
        let updatedTime = new Date();
        let difference =  updatedTime - startTime;
        
        // var days = Math.floor(difference / (1000 * 60 * 60 * 24));
        let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((difference % (1000 * 60)) / 1000);

        $('#timer').text(hours + ':' + minutes + ':' + seconds);
      }
});