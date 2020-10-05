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
        
        var counterZ = 1;
        
        for(i=1; i<qAndA.length; i++){
            if(i%5!==0){
                let x = new Answer(false, qAndA[i]);
                answers[counterZ-1] = x;
                counterZ++;
            }
        }
        for(i=0; i<answerKey.length; i++){
            answers[i].isCorrect = answerKey[i];
        }

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
    
    //tricky loop indexing
    var counter = 0;
    for(i=0;i<qAndA.length-4;i+=5){
        let y = counter * 4;
        let x = new QuestionSet(qAndA[i],answers[y],answers[y+1],answers[y+2],answers[y+3]);
        questions[counter]=x;
        counter++;
    }
    
    $("#startQuizButton").click(function(){
        $("#hiddenOncePlayed").css('display','none');
        jQuery('<div/>',{
            id: 'quizContent'
        }).appendTo('#mainTextArea');

        jQuery('<div/>',{
            id: 'timer'
        }).appendTo('#quizContent');

        jQuery('<div/>',{
            id: 'questionSpace'
        }).appendTo('#quizContent');

        jQuery('<ul/>',{
            id: 'listContent',
            class: 'list-group'
        }).appendTo('#quizContent');

        $('#listContent').append(
            '<li id="firstElement" class="list-group-item"></li>'
        );

        $('#listContent').append(
            '<li id="secondElement" class="list-group-item"></li>'
        );

        $('#listContent').append(
            '<li id="thirdElement" class="list-group-item"></li>'
        );

        $('#listContent').append(
            '<li id="fourthElement" class="list-group-item"></li>'
        );
        $('#listContent').append(
            '<li id="submit" class="list-group-item">Submit Answer</li>'
        );
        
        $('#submit').css('font-weight','bold');
        startTimer();
        populateQuiz();
    });

    //much easier to track selected answer at click rather than submit
    var answerSelected;
    $(document).on('click','#firstElement, #secondElement, #thirdElement, #fourthElement', function(){
        if($(this).attr('class')==='list-group-item active'){
            answerSelected = null;
            $(this).removeClass('list-group-item active');
            $(this).addClass('list-group-item');
        }
        else{
        $(this).toggleClass('list-group-item active', true);
        //the [0] in the below line took a very long time to figure out, somethimes it works wihtout, please leave!
        answerSelected = $(this)[0];
        $('#errorSubmit').remove();
        }
    });

    $(document).on('click', '#submit', function(){
        if($('#firstElement, #secondElement, #thirdElement, #fourthElement').hasClass('list-group-item active')){
            //do stuff to log if answer was correct etc or subtract time
            let gotItCorrect = false;
            if(checkAnswer(answerSelected)==='correctAnswer'){
                gotItCorrect = true;
                console.log("They got it correct");
            }
        }
        else{
            $('#listContent').append(
                '<li id="errorSubmit" class="list-group-item">Please Select An Answer!</li>'
            );
            $('#errorSubmit').css({'color':'purple', 'font-size':'120%', 'font-weight': 'bold'});
        }
    });

    //this function was incredibly difficult to figure out, but I learned a ton about Objects in JS
    function checkAnswer(answerSelected){
        let correctText = '';
        
        for(i=0;i<Object.keys(questions[randomQ]).length;i++){
            if((Object.values(questions[randomQ])[i]).isCorrect === true){
                console.log("value for correctText", (Object.values(questions[randomQ])[i]).stringContent);
                correctText = (Object.values(questions[randomQ])[i]).stringContent;
            }
        }
        console.log("correctText: ", correctText);       
        if(answerSelected.textContent === correctText){
        return 'correctAnswer'
        }
        else return 'wrongAnswer';
    }

    //var used instead of let so that current question object can be accessed in other functions
    var chosenQuestions = [];
    var randomQ;
    function populateQuiz(){
        //random question from array of questions that way students can't cheat as easily, hard coded for 20 questions
        randomQ = giveRandomQuestion();
        chosenQuestions.push(randomQ);

        $('#questionSpace').text(questions[randomQ].question);
        $('#firstElement').text(questions[randomQ].firstAnswer.stringContent);
        $('#secondElement').text(questions[randomQ].secondAnswer.stringContent);
        $('#thirdElement').text(questions[randomQ].thirdAnswer.stringContent);
        $('#fourthElement').text(questions[randomQ].fourthAnswer.stringContent);

    }
    function giveRandomQuestion(){
        let x = Math.floor(Math.random() * 19);
        while(chosenQuestions.includes(x)===true){
            x = Math.floor(Math.random() * 19);
        }
        return x;
    }
    
    var startTime;
    function startTimer(){
        startTime = new Date();
        setInterval(getShowTime, 1000);
    }

    function getShowTime(){
        let updatedTime = new Date();
        let difference =  updatedTime - startTime;
        
        let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((difference % (1000 * 60)) / 1000);

        $('#timer').css('color','red');
        $('#timer').text(hours + ' hours ' + minutes + ' minutes ' + seconds + ' seconds ');
      }
});