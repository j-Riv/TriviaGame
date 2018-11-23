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
            answers: [
                'Christian Slater',
                'Michael Cristofer',
                'Rami Malek',
                'Martin Wallström'
            ],
            correctAnswer: 'Rami Malek'
        },
        {
            question: 'What Linux distro does Mr Robot use?',
            answers: [
                'Ubuntu',
                'Arch Linux',
                'Kali Linux',
                'Fedora',
            ],
            correctAnswer: 'Kali Linux'
        },
        {
            question: 'What is the name of the group of hackers Mr. Robot created?',
            answers: [
                'Anonymous',
                'E Corp',
                'LulzSec',
                'F Society',
            ],
            correctAnswer: 'F Society'
        },
        {
            question: 'What is Elliot Alderson\'s dog named?',
            answers: [
                'Skipper',
                'Spot',
                'Flipper',
                'Hunter',
            ],
            correctAnswer: 'Flipper'
        },
        {
            question: 'What is the name of the shows creator?',
            answers: [
                'George Lucas',
                'Steven Spielberg',
                'Quentin Tarentino',
                'Sam Esmail',
            ],
            correctAnswer: 'Sam Esmail'
        },
        {
            question: 'What is Elliots day job?',
            answers: [
                'Hacker',
                'Cyber Security Engineer',
                'Web Developer',
                'Receptionist',
            ],
            correctAnswer: 'Cyber Security Engineer'
        },
        {
            question: 'Who implemented the hack that Elliot found on Allsafe\'s Servers in season 1',
            answers: [
                'Tyrell Wellick',
                'Darlene',
                'Elliot',
                'Gideon',
            ],
            correctAnswer: 'Elliot'
        },
        {
            question: 'Who is Mr. Robot?',
            answers: [
                'Elliot\'s Dad',
                'A delusion of Elliot\'s Mind',
                'Elliot',
                'All of the Above',
            ],
            correctAnswer: 'All of the Above'
        },
        {
            question: 'What did the Five/Nine hack actually do?',
            answers: [
                'Fried the electrical grid',
                'Hijacked nuclear missiles',
                'Erased everyone\'s financial debt',
                'Crashed all the computers on earth',
            ],
            correctAnswer: 'Erased everyone\'s financial debt'
        },
        {
            question: 'What is "Stage 2" of Elliot\'s plan',
            answers: [
                'Hack the Chinese Government',
                'Blow up the buildings housing E Corp\'s paper records',
                'Delete their identities and disappear',
                'Open an arcade at Coney Island',
            ],
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

// dom selectors & variables
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
    // shuffle answers
    triviaGame.questions.forEach(question => {
        question.answers = triviaGame.shuffle(question.answers);
    });
    cardFront(0, 0);
    cardBack(1, 1400);
    triviaGame.currentQuestion = 1;
    time = 20;
    countdown = setInterval(timer, 1000);
}

// create the front of the card
// f: question index, t: time delay
function cardFront(f, t) {
    var frontContent = `
            <input id="fQid" class="hidden" type="text" name="question-index" value="${f}" hidden>
            <h2 class="the-question">${triviaGame.questions[f].question}</h2>
            <div class="radio"><label><input class="answer front-answer" type="radio" name="front-answer" value="${triviaGame.questions[f].answers[0]}"> <span class="h4"> ${triviaGame.questions[f].answers[0]}</span></label></div>
            <div class="radio"><label><input class="answer front-answer" type="radio" name="front-answer" value="${triviaGame.questions[f].answers[1]}"> <span class="h4"> ${triviaGame.questions[f].answers[1]}</span></label></div>
            <div class="radio"><label><input class="answer front-answer" type="radio" name="front-answer" value="${triviaGame.questions[f].answers[2]}"> <span class="h4"> ${triviaGame.questions[f].answers[2]}</span></label></div>
            <div class="radio"><label><input class="answer front-answer" type="radio" name="front-answer" value="${triviaGame.questions[f].answers[3]}"> <span class="h4"> ${triviaGame.questions[f].answers[3]}</span></label></div>
            <button id="SubmitFront" class="btn btn-trivia" onclick="submitFront()">Submit</button>
    `;
    setTimeout(function() { front.html(frontContent) }, t);
}

// create the back of the card
// f: question index, t: time delay
function cardBack(b, t) {
    var backContent = `
            <input id="bQid" class="hidden" type="text" name="question-index" value="${b}" hidden>
            <h2 class="the-question">${triviaGame.questions[b].question}</h2>
            <div class="radio"><label><input class="answer back-answer" type="radio" name="back-answer" value="${triviaGame.questions[b].answers[0]}"> <span class="h4"> ${triviaGame.questions[b].answers[0]}</span></label></div>
            <div class="radio"><label><input class="answer back-answer" type="radio" name="back-answer" value="${triviaGame.questions[b].answers[1]}"> <span class="h4"> ${triviaGame.questions[b].answers[1]}</span></label></div>
            <div class="radio"><label><input class="answer back-answer" type="radio" name="back-answer" value="${triviaGame.questions[b].answers[2]}"> <span class="h4"> ${triviaGame.questions[b].answers[2]}</span></label></div>
            <div class="radio"><label><input class="answer back-answer" type="radio" name="back-answer" value="${triviaGame.questions[b].answers[3]}"> <span class="h4"> ${triviaGame.questions[b].answers[3]}</span></label></div>
            <button id="SubmitBack" class="btn btn-trivia" onclick="submitBack()">Submit</button>
    `;
    setTimeout(function() { back.html(backContent) }, t);
}

// submit answer for the front of the card
function submitFront() {
    // stop timer
    clearInterval(countdown);
    // set vars
    var idx = $('#fQid').val();
    var answer = null;
    var content = '';
    // get answer
    if ($('.front-answer').is(':checked')) {
        answer = $('.front-answer:checked').val();
    }
    // check answer & create card content
    if (answer === triviaGame.questions[idx].correctAnswer) {
        content = `
            <h1>${triviaGame.correctAnswerMsg}</h1>
            <button id="Next" class="btn btn-trivia" onclick="flip()">Next</button>
        `;
        triviaGame.correctCount++;
    }
    // incorrect
    else {
        content = `
            <h1>${triviaGame.incorrectAnswerMsg}</h1>
            <p>The correct answer was</p>
            <p class="correct-answer">${triviaGame.questions[idx].correctAnswer}</p>
            <button id="Next" class="btn btn-trivia" onclick="flip()">Next</button>
        `;
        triviaGame.incorrectCount++;
    }
    // insert card content
    front.html(content);
    // check if game is over
    if (triviaGame.currentQuestionIdx >= triviaGame.questions.length - 1) {
        // end game
        gameOver();
    }
}

// submit answer for the back of the card
function submitBack() {
    // stop timer
    clearInterval(countdown);
    // set vars
    var idx = $('#bQid').val();
    var answer = null;
    var content = '';
    // get answer
    if ($('.back-answer').is(':checked')) {
        answer = $('.back-answer:checked').val();
    }
    // check answer & create card content
    if (answer === triviaGame.questions[idx].correctAnswer) {
        content = `
            <h1>${triviaGame.correctAnswerMsg}</h1>
            <button id="Next" class="btn btn-trivia" onclick="flip()">Next</button>
        `;
        triviaGame.correctCount++;
    }
    // incorrect 
    else {
        content = `
            <h1>${triviaGame.incorrectAnswerMsg}</h1>
            <p>The correct answer was</p>
            <p class="correct-answer">${triviaGame.questions[idx].correctAnswer}</p>
            <button id="Next" class="btn btn-trivia" onclick="flip()">Next</button>
        `;
        triviaGame.incorrectCount++;
    }
    // insert card content
    back.html(content);
    // check if game is over
    if (triviaGame.currentQuestionIdx >= triviaGame.questions.length - 1) {
        // end game
        gameOver();
    }
}

// time is up --> need to fix --> currently checking what side twice.
function timeUp() {
    console.log('Time is up.');
    // set variables
    var content = '';
    var idx;
    // check what side of card is visible
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
    if (triviaGame.currentSide === 'Front') {
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

// flips card
function flip() {
    // flip card
    cardInner.toggleClass('flipped');
    // increase current question & current question index
    triviaGame.currentQuestion = triviaGame.currentQuestion + 1;
    triviaGame.currentQuestionIdx = triviaGame.currentQuestionIdx + 1;
    // if current question is not the last question flip the card
    if (triviaGame.currentQuestion < triviaGame.questions.length) {
        var nextQuestion = triviaGame.currentQuestion;
        if (cardInner.hasClass('flipped')) {
            cardFront(nextQuestion, 1400);
            triviaGame.currentSide = 'Front';
        } else {
            cardBack(nextQuestion, 1400);
            triviaGame.currentSide = 'Back';
        }
    }
    time = 20;
    countdown = setInterval(timer, 1000);
}

function gameOver() {
    // flip card
    cardInner.removeClass('flipped');
    // hide card contents
    front.hide();
    back.hide();
    // create results card content
    var content = `
        <div id="Results">
            <h1>Results</h1>
            <p>Questions Answered Correctly <span class="count">${triviaGame.correctCount}</span></p>
            <p>Questions Answered Incorrectly <span class="count">${triviaGame.incorrectCount}</span></p>
            <button id="Reset" class="btn btn-trivia" onclick="resetGame()">Restart</button>
        </div>
    `;
    // append results card content
    cardInner.append(content);
}

// resets game so you don't have to refresh
function resetGame() {
    // reset variables
    triviaGame.correctCount = 0;
    triviaGame.incorrectCount = 0;
    triviaGame.currentQuestionIdx = 0;
    triviaGame.currentQuestion = 0;
    // remove results card
    $('#Results').remove();
    // shuffle questions
    triviaGame.questions = triviaGame.shuffle(triviaGame.questions);
    // shuffle answers
    triviaGame.questions.forEach(question => {
        question.answers = triviaGame.shuffle(question.answers);
    });
    // display first card
    front.show();
    back.show();
    // setup cards
    cardFront(0, 0);
    cardBack(1, 1400);
    triviaGame.currentQuestion = 1;
}

// timer used to countdown time when answering a question
function timer() {
    if (time > 0) {
        time--;
        $('.timer').text(time);
    } else {
        clearInterval(countdown);
        timeUp();
    }
}

// timer used to flip to next question once you run out of time
function timerFlip() {
    if (time > 0) {
        time--;
        $('.timer').text(time);
    } else {
        clearInterval(flipMe);
        flip();
    }
}

// typewriter style function
function showText(target, message, index, interval) {
    if (index < message.length) {
        jQuery(target).append(message[index++]);
        setTimeout(function() {
            showText(target, message, index, interval);
        }, interval);
    }
}

// start the game and play Mr Robot Theme Song
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

// bind click function to dynamically created radio buttons
$(document).on('click', '.radio', function() {
    console.log('you clicked me.');
    $('.radio').removeClass('selected');
    $(this).addClass('selected');
});

start();