'use strict'

var gCorrectSound = new Audio('audio/correct.wav');
var gWrongSound = new Audio('audio/wrong.mp3');
var gWinSound = new Audio('audio/win.wav');

var gQuests = createQuests();
var gOptsCount = gQuests[0].opts.length;
var gCurrQstIdx;

function init() {
    gCurrQstIdx = 0;
    renderQuest(gCurrQstIdx);
    for (let i = 0; i < gOptsCount; i++) {
        var elOptsContainer = document.querySelector(`.opt${i + 1}-container`);
        elOptsContainer.style.display = 'block';
    }
    var elWinnerModal = document.querySelector('.winner-modal');
    elWinnerModal.style.display = 'none';
    var elReplayBtn = document.querySelector('.replay-btn');
    elReplayBtn.style.display = 'none';
}


function endGame() {
    var elImgContainer = document.querySelector('.img-container');
    elImgContainer.innerHTML = `<img src="img/win.gif" />`;
    for (let i = 0; i < gOptsCount; i++) {
        var elOptsContainer = document.querySelector(`.opt${i + 1}-container`);
        elOptsContainer.classList.remove('wrong');
        elOptsContainer.style.display = 'none';
    }
    var elWinnerModal = document.querySelector('.winner-modal');
    elWinnerModal.style.display = 'block';
    var elReplayBtn = document.querySelector('.replay-btn');
    elReplayBtn.style.display = 'block';
    setTimeout(function () { gWinSound.play(); }, 750)
}


function renderQuest(qstIdx) {
    var elImgContainer = document.querySelector('.img-container');
    elImgContainer.innerHTML = `<img src="img/${qstIdx}.png" />`;
    for (let i = 0; i < gOptsCount; i++) {
        var elOptsContainer = document.querySelector(`.opt${i + 1}-container`);
        elOptsContainer.classList.remove('wrong');
        elOptsContainer.innerText = gQuests[qstIdx].opts[i];
    }
}


function checkAnswer(optIdx) {

    if (optIdx === gQuests[gCurrQstIdx].correctOptIndex) {
        gCurrQstIdx++;
        gCorrectSound.play();
        if (gCurrQstIdx > gQuests.length - 1) return endGame();
        renderQuest(gCurrQstIdx);
    } else {
        var elOptsContainer = document.querySelector(`.opt${optIdx + 1}-container`);
        elOptsContainer.classList.add('wrong');
        gWrongSound.play();
    }
}

function createQuests() {
    var quests = [];
    quests.push({ id: 0, opts: ['USA', 'Canada'], correctOptIndex: 0 });
    quests.push({ id: 1, opts: ['India', 'China'], correctOptIndex: 1 });
    quests.push({ id: 2, opts: ['Brazil', 'Mexico'], correctOptIndex: 0 });
    return quests;
}