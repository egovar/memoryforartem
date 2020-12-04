let startButton = document.querySelector('.start-game');
let squares = document.getElementsByClassName('square');
displayCurrent = document.querySelector('.result__current');
displayBest = document.querySelector('.result__best');

let level = 1;
let activeRow = [];
let currentPoints = 0;
let record = 0;
let currentEl = 0;

startButton.addEventListener('click', function() {
    startButton.classList.toggle('start-game_visible');
    activeRow = generateAndHighlight(level);
    console.log(activeRow);
});

function generateAndHighlight(n) {
    let row = new Array(n);
    for (let i = 0; i < n; i++) {
        row[i] = getRandomInt(0, 9);
    }
    highlight(row, 0);
    return row;
}

function highlight(row, start){
    if (start < row.length) {
        squares[row[start]].classList.toggle('square_right');
        setTimeout(function() {
            squares[row[start]].classList.toggle('square_right');
        }, 300);
        setTimeout(function() {
            highlight(row, start + 1);
        }, 450);
    }
}

function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', checkAnswer);
}

function checkAnswer(evt){
    if (Number(evt.target.id) === activeRow[currentEl]) {
        evt.target.classList.toggle('square_right');
        setTimeout(function() {
            evt.target.classList.toggle('square_right');
        }, 200);
        currentPoints += 1;
        displayCurrent.innerText = currentPoints;
        if (currentPoints > record) {
            record = currentPoints;
            displayBest.innerText = record;
        }
        currentEl += 1;
        if (currentEl === activeRow.length) {
            currentEl = 0;
            level += 1;
            setTimeout(function() {
                activeRow = generateAndHighlight(level);
            }, 300);
        }
    } else {
        evt.target.classList.toggle('square_wrong');
        setTimeout(function() {
            evt.target.classList.toggle('square_wrong');
        }, 200);
        currentPoints = 0;
        displayCurrent.innerText = 0;
        currentEl = 0;
        level = 1;
        activeRow = [];
        startButton.classList.toggle('start-game_visible');
    }
}