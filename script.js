$(document).ready(function(){
    var questions = [];
    var answers = [];
    var qAndA = [
        "Which of the following is not a JavaScript Data Type?", "Undefined", "Number", "Boolean", "Float",
        "Which company developed JavaScript? ", "Netscape", " Bell Labs", "Sun Microsystems ", "IBM",
        "Inside which HTML element do we put the JavaScript?", "<script>", "<head>", "<meta>", "<style>",
        "Which of the following is correct about features of JavaScript?", "It can not Handling dates and time", "JavaScript is a object-based scripting language", "JavaScript is not interpreter based scripting language", "All of the above",
        "Choose the correct JavaScript syntax to change the content of the following HTML code.", "document.getElement ('letsfindcourse').innerHTML = 'I am a letsfindcourse';", "document.getElementById ('letsfindcourse').innerHTML = 'I am a letsfindcourse';", "document.getId ('letsfindcourse') = 'I am a letsfindcourse';", "document.getElementById ('letsfindcourse').innerHTML = I am a letsfindcourse;",
        "Which of the following is the correct syntax to display 'Letsfindcourse' in an alert box using JavaScript?", "alert-box('Letsfindcourse');", "confirm('Letsfindcourse');", "msgbox('Letsfindcourse');", "alert('Letsfindcourse');",
        "What is the correct syntax for referring to an external script called 'LFC.js'? ", "<script src='LFC.js'>", "<script source='LFC.js'>", "<script ref='LFC.js'>", "<script type='LFC.js'>",
        "Which of the following is not Javascript frameworks or libraries?", "Polymer", "Meteor", "Cassandra", "jQuery",
        "Why so JavaScript and Java have similar name? ", "JavaScript is a stripped-down version of Java", "JavaScript's syntax is loosely based on Java's", "They both originated on the island of Java", "None of the above",
        "What is the original name of JavaScript?", "LiveScript", "EScript", "Mocha", "JavaScript",
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
        false, false, false, true,//question 1
        true, false, false, false,
        true, false, false, false,
        false, true, false, false,
        false, true, false, false,//question 5
        false, false, true, false,
        true, false, false, false,
        false, false, true, false,
        false, true, false, false,
        false, false, true, false,//question 10
        false, false, true, false,
        false, false, false, true,
        true, false, false, false,
        false, true, false, false,
        false, false, true, false,//question 15
        false, false, false, true,
        true, false, false, false,
        false, true, false, false,
        false, false, true, false,
        false, false, false, true //question 20
    ];
        //currently missing structs from C++ :/
        //Answer object constructor -- if the answer is correct/incorrect (boolean) and then the string content of the answer
        function Answer(isCorrect, stringContent){
            this.isCorrect = isCorrect;
            this.stringContent = stringContent;
        }
        
        //populating Answer objects (data members of QuestionSet)
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

        //using QuestionSet object to more easily organize information, better datastructure, includes Question string and Answer data members
        //QuestionSet constructor
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
    
    //**tricky loop indexing**
    //populating array of QuestionSets aka the quiz is the array of QuestionSets
    var counter = 0;
    for(i=0;i<qAndA.length-4;i+=5){
        let y = counter * 4;
        let x = new QuestionSet(qAndA[i],answers[y],answers[y+1],answers[y+2],answers[y+3]);
        questions[counter]=x;
        counter++;
    }
    //Start the quiz button triggers the first painting of a random question with answer choices and event listeners to interact with the quiz taker
    //No reason to load this on the front end HTML since the user may just be checking the leaderboard and not taking the quiz
    var progressWidth = 0.0;
    var percentTracker = 0.0;
    $("#startQuizButton").click(function(){
        $("#hiddenOncePlayed").css('display','none');
        jQuery('<div/>',{
            id: 'quizContent'
        }).appendTo('#mainTextArea');

        jQuery('<div/>',{
            id: 'timer'
        }).appendTo('#quizContent');

        jQuery('<div/>',{
            id: 'progressBar',
            class: 'progress'
        }).appendTo('#quizContent');//physical indicator of progress

        $('#progressBar').append("<div class='progress-bar' role='progressbar' aria-valuenow='0' aria-valuemin='0' aria-valuemax='100' style='width:0%'>0%</div>");
       
        //The percent tracker can be used later to fill value field in leaderboard
        jQuery('<div/>',{
            id: 'percentTracker'
        }).appendTo('#quizContent');
        $('#percentTracker').text('Percent: ' + percentTracker + "%").css('color','green');

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
        ifAnAnswerSelectedThenUnselect();
        if($(this).attr('class')==='list-group-item active'){
            answerSelected = null;
            $(this).removeClass('list-group-item active');
            $(this).addClass('list-group-item');
        }
        else{
        $(this).toggleClass('list-group-item active', true);
        //the [0] in the below line took a very long time to figure out, sometimes it worked wihtout, please leave!
        answerSelected = $(this)[0];
        $('#errorSubmit').remove();
        }
    });
    
    //toggleClass doesn't seem to work sometimes so I used a more verbose method below
    function ifAnAnswerSelectedThenUnselect(){
        if($('#firstElement').hasClass('list-group-item active')){
            $('#firstElement').removeClass('list-group-item active');
            $('#firstElement').addClass('list-group-item');
        }
        if($('#secondElement').hasClass('list-group-item active')){
            $('#secondElement').removeClass('list-group-item active');
            $('#secondElement').addClass('list-group-item');
        }
        if($('#thirdElement').hasClass('list-group-item active')){
            $('#thirdElement').removeClass('list-group-item active');
            $('#thirdElement').addClass('list-group-item');
        }
        if($('#fourthElement').hasClass('list-group-item active')){
            $('#fourthElement').removeClass('list-group-item active');
            $('#fourthElement').addClass('list-group-item');
        }
    }

    //TODO: need to unbind from document, cannot get any other binding method to work
    $(document).on('click','#submit',function(){
        submitFunction();
    });
    // $('#textContent').on('click', '#submit', function(){
    //     $(submitFunction());
    // });
    // $('#submit').on('click', submitFunction());
        
    function submitFunction(){    
        if($('#firstElement, #secondElement, #thirdElement, #fourthElement').hasClass('list-group-item active')){
            //do stuff to log if answer was correct etc or subtract time
            
            if(checkAnswer(answerSelected)==='correctAnswer'){
                movePercent('correct'); 
                
            }
            else{
                movePercent('wrong');
                // console.log("wrong");
            }
            ifAnAnswerSelectedThenUnselect();
            moveProgressBar();
            populateQuiz();
        }
        else if($('#errorSubmit').length === 0){
            $('#listContent').append(
                '<li id="errorSubmit" class="list-group-item">Please Select An Answer!</li>'
            );
            $('#errorSubmit').css({'color':'purple', 'font-size':'120%', 'font-weight': 'bold'});
        }
    }

    var numberCorrect = 0;
    var numberWrong = 0;
    function movePercent(correctness){
        if(correctness === 'correct'){
            numberCorrect++;
        }
        else if(correctness === 'wrong'){
            numberWrong++;
        }
        percentTracker = (numberCorrect/(numberCorrect+numberWrong))*100;
        percentTracker = parseFloat(percentTracker.toFixed(1));
        $('#percentTracker').text('Percent: ' + percentTracker + "%");
    }

    //double rounding is okay for now, but this should be changed later for best practice
    //do operations and round last to minimize floating point round-off
    function moveProgressBar(){
        progressWidth+=(Math.round((1/questions.length)*1000))/10;
        progressWidth = parseFloat(progressWidth.toFixed(3));//using toFixed() because if the array changes size it might not be a nice answer
        $('.progress-bar').css('width', progressWidth + '%');
        $('.progress-bar').text(progressWidth + '%');
    }

    //this function was incredibly difficult to figure out, but I learned a ton about Objects in JS
    function checkAnswer(answerSelected){
        let correctText = '';
        
        for(i=0;i<Object.keys(questions[randomQ]).length;i++){
            if((Object.values(questions[randomQ])[i]).isCorrect === true){
                correctText = (Object.values(questions[randomQ])[i]).stringContent;
            }
        }    
        if(answerSelected.textContent === correctText){
        return 'correctAnswer';
        }
        else return 'wrongAnswer';
    }

    //var used instead of let so that current question object can be accessed in other functions
    var chosenQuestions = [];
    var randomQ;
    function populateQuiz(){
        //random question from array of questions that way students can't cheat as easily, hard coded for 20 questions
        console.log(chosenQuestions); 
        if(chosenQuestions.length<questions.length){
        randomQ = giveRandomQuestion();
        chosenQuestions.push(randomQ);
        }
        else{
            $('#submit').remove();
            $('#listContent').append(
                '<li id="endOfQuiz" class="list-group-item">That&#146s all for now!</li>'
            );
            $('#endOfQuiz').css({'color':'purple', 'font-size':'120%', 'font-weight': 'bold'});
        }      

        $('#questionSpace').text(questions[randomQ].question);
        $('#firstElement').text(questions[randomQ].firstAnswer.stringContent);
        $('#secondElement').text(questions[randomQ].secondAnswer.stringContent);
        $('#thirdElement').text(questions[randomQ].thirdAnswer.stringContent);
        $('#fourthElement').text(questions[randomQ].fourthAnswer.stringContent);

    }
    function giveRandomQuestion(){
        let x = Math.floor(Math.random() * questions.length); 
            while(chosenQuestions.includes(x)===true){
                x = Math.floor(Math.random() * questions.length);  
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

        $('#timer').css({'color':'red','font-weight':'bold'});
        $('#timer').text(hours + ' hours ' + minutes + ' minutes ' + seconds + ' seconds ');
      }
});