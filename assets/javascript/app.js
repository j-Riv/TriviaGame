var triviaGame = {
    correctCount: 0,
    incorrectCount: 0,
    correctAnswerMsg: 'You are correct',
    incorrectAnswerMsg: 'You have selected the wrong answer',
    timesUpMsg: 'You are too slow, you have run out of time',
    gameOverMsg: '',
    currentSide: 'front',
    currentQuestion: 0,
    currentQuestionIdx: 0,
    questions: [{
            question: 'Who plays the character of Elliott Alderson in the hit tv show Mr. Robot?',
            answer1: 'Christian Slater',
            answer2: 'Michael Cristofer',
            answer3: 'Rami Malek',
            answer4: 'Martin Wallström',
            correctAnswer: 'Rami Malek'
        },
        {
            question: 'What Linux distro does Mr Robot use?',
            answer1: 'Ubuntu',
            answer2: 'Arch Linux',
            answer3: 'Kali Linux',
            answer4: 'Fedora',
            correctAnswer: 'Kali Linux'
        },
        {
            question: 'What is the name of the group of hackers Mr. Robot created?',
            answer1: 'Anonymous',
            answer2: 'E Corp',
            answer3: 'LulzSec',
            answer4: 'F Society',
            correctAnswer: 'F Society'
        },
        {
            question: 'What is Elliot Alderson\'s dog named?',
            answer1: 'Skipper',
            answer2: 'Spot',
            answer3: 'Flipper',
            answer4: 'Hunter',
            correctAnswer: 'Flipper'
        },
        {
            question: 'What is the name of the shows creator?',
            answer1: 'George Lucas',
            answer2: 'Steven Spielberg',
            answer3: 'Quentin Tarentino',
            answer4: 'Sam Esmail',
            correctAnswer: 'Sam Esmail'
        },
        {
            question: 'What is Elliots day job?',
            answer1: 'Hacker',
            answer2: 'Cyber Security Engineer',
            answer3: 'Web Developer',
            answer4: 'Receptionist',
            correctAnswer: 'Cyber Security Engineer'
        },
        {
            question: 'Who implemented the hack that Elliot found on Allsafe\'s Servers in season 1',
            answer1: 'Tyrell Wellick',
            answer2: 'Darlene',
            answer3: 'Elliot',
            answer4: 'Gideon',
            correctAnswer: 'Elliot'
        },
        {
            question: 'Who is Mr. Robot?',
            answer1: 'Elliot\'s Dad',
            answer2: 'A delusion of Elliot\'s Mind',
            answer3: 'Elliot',
            answer4: 'All of the Above',
            correctAnswer: 'All of the Above'
        },
        {
            question: 'What did the Five/Nine hack actually do?',
            answer1: 'Fried the electrical grid',
            answer2: 'Hijacked nuclear missiles',
            answer3: 'Erased everyone\'s financial debt',
            answer4: 'Crashed all the computers on earth',
            correctAnswer: 'Erased everyone\'s financial debt'
        },
        {
            question: 'What is "Stage 2" of Elliot\'s plan',
            answer1: 'Hack the Chinese Government',
            answer2: 'Blow up the buildings housing E Corp\'s paper records',
            answer3: 'Delete their identities and disappear',
            answer4: 'Open an arcade at Coney Island',
            correctAnswer: 'Blow up the buildings housing E Corp\'s paper records'
        }
    ],
    shuffle: function(arr) {
        var currentIdx = arr.length;
        var temp;
        var randomIdx;
        // while there remain elements to shuffle
        while (0 !== currentIdx) {
            randomIdx = Math.floor(Math.random() * currentIdx);
            currentIdx -= 1;

            // And swap it with the current element.
            temp = arr[currentIdx];
            arr[currentIdx] = arr[randomIdx];
            arr[randomIdx] = temp;
        }
        return arr;
    }
}

// dom selectors
var wrapper = $('#Wrapper');
var questionDisplay = $('.question-display');
var card = $('.flip-card');
var cardInner = $('.flip-card-inner');
var front = $('.flip-card-front');
var back = $('.flip-card-back');
var time = 20;
var countdown;
var flipMe;

function gameInit() {
    // audio
    var audio = new Audio('assets/sounds/mr-robot-theme.mp3');
    cardInner.toggleClass('flipped');
    audio.play();
    // shuffle questions
    triviaGame.questions = triviaGame.shuffle(triviaGame.questions);
    // setup cards
    cardFront(0);
    cardBack(1);
    triviaGame.currentQuestion = 1;
    time = 20;
    countdown = setInterval(timer, 1000);
}

function cardFront(f) {
    var frontContent = `
            <input id="fQid" class="hidden" type="text" name="question-index" value="${f}" hidden>
            <h2 class="the-question">${triviaGame.questions[f].question}</h2>
            <div class="radio"><label><input class="front-answer" type="radio" name="front-answer" value="${triviaGame.questions[f].answer1}"> <span class="h4"> ${triviaGame.questions[f].answer1}</span></label></div>
            <div class="radio"><label><input class="front-answer" type="radio" name="front-answer" value="${triviaGame.questions[f].answer2}"> <span class="h4"> ${triviaGame.questions[f].answer2}</span></label></div>
            <div class="radio"><label><input class="front-answer" type="radio" name="front-answer" value="${triviaGame.questions[f].answer3}"> <span class="h4"> ${triviaGame.questions[f].answer3}</span></label></div>
            <div class="radio"><label><input class="front-answer" type="radio" name="front-answer" value="${triviaGame.questions[f].answer4}"> <span class="h4"> ${triviaGame.questions[f].answer4}</span></label></div>
            <button id="SubmitFront" class="btn btn-trivia" onclick="submitFront()">Submit</button>
    `;
    front.html(frontContent);
}

function cardBack(b) {
    var backContent = `
            <input id="bQid" class="hidden" type="text" name="question-index" value="${b}" hidden>
            <h2 class="the-question">${triviaGame.questions[b].question}</h2>
            <div class="radio"><label><input class="back-answer" type="radio" name="back-answer" value="${triviaGame.questions[b].answer1}"> <span class="h4"> ${triviaGame.questions[b].answer1}</span></label></div>
            <div class="radio"><label><input class="back-answer" type="radio" name="back-answer" value="${triviaGame.questions[b].answer2}"> <span class="h4"> ${triviaGame.questions[b].answer2}</span></label></div>
            <div class="radio"><label><input class="back-answer" type="radio" name="back-answer" value="${triviaGame.questions[b].answer3}"> <span class="h4"> ${triviaGame.questions[b].answer3}</span></label></div>
            <div class="radio"><label><input class="back-answer" type="radio" name="back-answer" value="${triviaGame.questions[b].answer4}"> <span class="h4"> ${triviaGame.questions[b].answer4}</span></label></div>
            <button id="SubmitBack" class="btn btn-trivia" onclick="submitBack()">Submit</button>
    `;
    back.html(backContent);
}

function submitFront() {
    clearInterval(countdown);
    var idx = $('#fQid').val();
    var answer = null;
    var content = '';
    if ($('.front-answer').is(':checked')) {
        answer = $('.front-answer:checked').val();
    }
    if (answer === triviaGame.questions[idx].correctAnswer) {
        content = `
        <h1>${triviaGame.correctAnswerMsg}</h1>
        <button id="Next" class="btn btn-trivia" onclick="flip()">Next</button>
    `;
        triviaGame.correctCount++;
    } else {
        content = `
        <h1>${triviaGame.incorrectAnswerMsg}</h1>
        <p>The correct answer was</p>
        <p class="correct-answer">${triviaGame.questions[idx].correctAnswer}</p>
        <button id="Next" class="btn btn-trivia" onclick="flip()">Next</button>
    `;
        triviaGame.incorrectCount++;
    }
    front.html(content);

    // end game
    if (triviaGame.currentQuestionIdx >= triviaGame.questions.length - 1) {
        gameOver();
    }
}

function submitBack() {
    clearInterval(countdown);
    var idx = $('#bQid').val();
    var answer = null;
    var content = '';
    if ($('.back-answer').is(':checked')) {
        answer = $('.back-answer:checked').val();
    }
    if (answer === triviaGame.questions[idx].correctAnswer) {
        content = `
                <h1>${triviaGame.correctAnswerMsg}</h1>
                <button id="Next" class="btn btn-trivia" onclick="flip()">Next</button>
            `;
        triviaGame.correctCount++;
    } else {
        content = `
                <h1>${triviaGame.incorrectAnswerMsg}</h1>
                <p>The correct answer was</p>
                <p class="correct-answer">${triviaGame.questions[idx].correctAnswer}</p>
                <button id="Next" class="btn btn-trivia" onclick="flip()">Next</button>
            `;
        triviaGame.incorrectCount++;
    }
    back.html(content);
    // end game
    if (triviaGame.currentQuestionIdx >= triviaGame.questions.length - 1) {
        gameOver();
    }
}

function timeUp() {
    console.log('Time is up.');
    var content = '';
    var idx;
    if (triviaGame.currentSide === 'Front') {
        idx = $('#fQid').val();
    } else {
        idx = $('#bQid').val();
    }
    idx = idx - 1;
    content = `
            <div class="times-up">
                <h1>${triviaGame.timesUpMsg}</h1>
                <p>The correct answer was</p>
                <p class="correct-answer">${triviaGame.questions[idx].correctAnswer}</p>
                <button id="Next" class="btn btn-trivia" onclick="flip()">Next</button>
            </div>
        `;
    triviaGame.incorrectCount++;
    // check what side of card is visible
    if (cardInner.hasClass('flipped')) {
        // back

        back.html(content);
    }
    // front
    else {
        front.html(content);
    }
    // check if game is over
    if (triviaGame.currentQuestionIdx >= triviaGame.questions.length - 1) {
        // game over after 3s
        setTimeout(gameOver, 3000);
    }
    // flip to continue
    else {
        time = 7;
        flipMe = setInterval(timerFlip, 1000);
    }
}

function flip() {
    cardInner.toggleClass('flipped');
    triviaGame.currentQuestion = triviaGame.currentQuestion + 1;
    triviaGame.currentQuestionIdx = triviaGame.currentQuestionIdx + 1;
    if (triviaGame.currentQuestion < triviaGame.questions.length) {
        var nextQuestion = triviaGame.currentQuestion;
        if (cardInner.hasClass('flipped')) {
            cardFront(nextQuestion);
            triviaGame.currentSide = 'Front';
        } else {
            cardBack(nextQuestion);
            triviaGame.currentSide = 'Back';
        }
    }
    time = 20;
    countdown = setInterval(timer, 1000);
}

function gameOver() {
    // empty card
    cardInner.removeClass('flipped');
    front.hide();
    back.hide();
    var content = `
        <div id="Results">
            <h1>Results</h1>
            <p>Questions Answered Correctly <span class="count">${triviaGame.correctCount}</span></p>
            <p>Questions Answered Incorrectly <span class="count">${triviaGame.incorrectCount}</span></p>
            <button id="Reset" class="btn btn-trivia" onclick="resetGame()">Restart</button>
        </div>
    `;
    cardInner.append(content);
}

function resetGame() {
    triviaGame.correctCount = 0;
    triviaGame.incorrectCount = 0;
    triviaGame.currentQuestionIdx = 0;
    triviaGame.currentQuestion = 0;
    $('#Results').remove();
    front.show();
    back.show();
    // setup cards
    cardFront(0);
    cardBack(1);
    triviaGame.currentQuestion = 1;
}

function timer() {
    if (time > 0) {
        time--;
        $('.timer').text(time);
    } else {
        clearInterval(countdown);
        timeUp();
    }
}

function timerFlip() {
    if (time > 0) {
        time--;
        $('.timer').text(time);
    } else {
        clearInterval(flipMe);
        flip();
    }
}

// var displayName = <? php echo json_encode($displayName); ?>;
// showText("#greeting", "Hello, " + displayName + '. Please select the Dept you want to view Requests for. Your Dept has been set as the default view.', 0, 100);


function showText(target, message, index, interval) {
    if (index < message.length) {
        jQuery(target).append(message[index++]);
        setTimeout(function() {
            showText(target, message, index, interval);
        }, interval);
    }
}


// gameInit();
function start() {
    var content = `
    <div id="Start">
        <img src="assets/images/fsociety.jpg" alt="F Society" />
        <p id="Msg"></p>
        <button id="Start" class="btn btn-trivia" onclick="gameInit()">Start</button>
        <script>showText("#Msg", "Destruction Initiated", 0, 200);</script>
    </div>
    `;
    back.html(content);
}

start();