// Game settings
const timeLimitMax      = 60; // time at level
const decreaseTime      = 5; // decreasing time for next level
let timeLimit           = timeLimitMax - 0;
let level               = 1; // start level
let target              = 300; // target points for level
let targetColor         = '#f10101';
// Buttons
let btnStart            = document.querySelector('.start');
let btnNewGame          = document.querySelector('.new-game')
let btnNewGameResult    = document.querySelector('.new-game-result');
let btnContinue         = document.querySelector('.level-up'); 
let btnSaveResult       = document.querySelector('.save-result');
let btnCleanUp          = document.querySelector('.clean-storage');
let btnClose            = document.querySelector('.close');
// Elements
let timeNow             = document.querySelector('.time-left');
let points              = document.querySelector('.points');
let gamePause           = document.querySelector('.game-pause');
let info                = document.querySelector('.info');
let totalTarget         = document.querySelector('.total-target');
let levelInfo           = document.querySelector('.level-now');
let gameLevel           = document.querySelector('.level');
let zoneResult          = document.querySelector('.result-users');
// Popups
let popupResultScore    = document.querySelector('.score');
let popupResult         = document.querySelector('.result');
let popupLevel          = document.querySelector('.next-level');

/**
 * Adding events
 */
(function addEvent() {
    btnStart.addEventListener('click', start);
    btnNewGame.addEventListener('click', clickNewGame); 
    btnSaveResult.addEventListener('click', saveResult);
    btnContinue.addEventListener('click', levelUpdate);
    btnCleanUp.addEventListener('click', cleanSorage);
    btnNewGameResult.addEventListener('click', clickNewGame);
    btnClose.addEventListener('click', closePopup);
})();

/**
 * Preparation the results
 */
(function preapreAllData() {
    renderResult();
})();

/**
 * Start the game
 */
function start() {
    timeNow.textContent = timeLimit;
    levelInfo.textContent = level;
    totalTarget.textContent = ` / ${target}`;
    startClean();
    startGenerateCubes();
    gameTimer();   
    startHelper();
}

/**
 * Helper for the start game
 */
function startClean() {
    timeNow.style.color = '#00000';
    document.querySelector('.press-start').style.display = 'none';
    info.style.display = 'none';
    popupResult.style.display = 'none';
    popupLevel.style.display = 'none';
    btnNewGame.removeAttribute('value');
    gamePause.style.display = 'none';
    points.textContent = '0';
}

/**
 * Helper for the start game
 * Events
 */
function startHelper() {
    btnStart.textContent = 'Pause'
    btnStart.removeEventListener('click', start);
    btnStart.addEventListener('click', toogleBtn);
    btnStart.addEventListener('click', checkedButton);
}

/**
 * Generating cubes
 */
function startGenerateCubes() {
    let zoneGame    = document.querySelector('.row');
    let block       = '';
    let colorCube   = cubesColor();

    for (let i = 0; i < 100; i++) {
        let random = randomNumber(0, 4);

        block += `<div class="cube cube-${i} ${colorCube[random]}"></div>`;
        zoneGame.innerHTML = block;
        setTimeout(function(){
            document.querySelector(`.cube-${i}`).addEventListener('click', clickTarget);
        }, 100)
    }
}

/**
 * Colors setting
 */
function cubesColor() {
    return ['red', 'blue', 'black', 'yellow', 'green'];
}

/**
 * Points setting
 * 
 * @param {*} color 
 */
function pointColor(color) {
    let point = '';
    switch(color) {
        case 'red':
            point = -1;
            break;
        case 'blue':
            point =  1;
            break;
        case 'black':
            point =  2;
            break;
        case 'yellow':
            point =  3;
            break;
        case 'green':
            point =  4;
            break;
    }

    return point;
}

/**
 * Clicking on the cube
 * 
 * @param {*} event 
 */
function clickTarget(event) {
    let target      = event.target;
    let classList   = target.classList;
    let clickNow    = document.querySelector(`.${classList[1]}`);
    let color       = clickNow.classList;
    let pointTarget = pointColor(color[2]);

    removeEventTarget(clickNow);
    clickNow.classList.add('hide');
    point = parseInt(points.innerHTML);
    point = point + pointTarget;
    points.textContent = point;
}

/**
 * Changing button name
 */
function toogleBtn() {
    if (btnStart.innerHTML == 'Pause' && timeNow.innerHTML > 1) {
        info.innerHTML = '<b>Paused</b>';
        info.style.display = 'flex';
        btnStart.textContent = 'Resume';
    } else if (btnStart.innerHTML == 'Resume') {
        info.style.display = 'none';
        btnStart.textContent = 'Pause';
        gameTimer();
    }
}

/**
 * Helper for the pause and resume game
 */
function checkedButton() {
    let button = btnStart.innerHTML;

    if (button == 'Pause') {
        gamePause.style.display = 'none';
    } else if (button == 'Resume') {
        gamePause.style.display = 'block';
    }
}

/**
 * Helper for the clickTarget()
 * 
 * @param {*} clickNow 
 */
function removeEventTarget(clickNow) {
    clickNow.removeEventListener('click', clickTarget);
}

/**
 * Generating random numbers
 * 
 * @param {*} min 
 * @param {*} max 
 */
function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Game timer and conditions
 */
function gameTimer(){
    let timer = setInterval(function(){
        let time            = parseInt(timeNow.innerHTML);
        let valueNewGame    = btnNewGame.getAttribute('value');
        let but             = btnStart.innerHTML;
        let score           = parseInt(points.innerHTML);

        colorProgress(time, score, timeNow);
        points.style.color = targetColor;

        if (valueNewGame != 'pressed') {
            if (--time >= 0 && but == 'Pause') {
                regenerateCube();
                timeNow.innerHTML = time;
            } else if (--time >= 0 && but == 'Resume') {
                gamePause.style.display = 'block';
                clearInterval(timer);
            } else {
                if (score >= target) {
                    timeLimit = timeLimit - decreaseTime;
                    clearInterval(timer);
                    nextLevel(score, timeLimit);
                } else if (score < target) {
                    timeNow.innerHTML = 0;
                    clearInterval(timer);
                    levelEnd(score);
                }
            }
        } else if (valueNewGame == 'pressed'){
            clearInterval(timer);
        }
    }, 1000)
  }

/**
 * Helper for the gameTimer()
 * 
 * @param {*} time 
 * @param {*} score 
 * @param {*} timeNow 
 */
function colorProgress(time, score, timeNow) {
    if (time <= 5) {
        timeNow.style.color = '#ff7a7a';
    }

    if (score < target) {
        targetColor = '#f10101';
    } else if(score >= target) {
        targetColor = '#009f00';
    }
}

/**
 * Regenerating the cubes
 */
function regenerateCube() {
    let allZindex = document.getElementsByClassName('hide');
    if (allZindex.length >= 3) {
        let random = randomNumber(0, (allZindex.length - 1));
        for (let i = 0; i < randomNumber(1, 3); i++) {
            if (allZindex[random]) {
                let allClass = allZindex[random].classList;
                let updateCube = document.querySelector(`.${allClass[1]}`);

                updateCube.addEventListener('click', clickTarget);
                
                let cube = regenerateColor(allZindex[random]);
                cube.classList.remove('hide');
            } else {
                continue;
            }
        }
    }
}

/**
 * Helper for the regenerateCube()
 * 
 * @param {*} cube 
 */
function regenerateColor(cube) {
    let preColor = cube.classList;
    let color = preColor[2];

    cube.classList.remove(color);

    let colorCube = cubesColor();
    let random = randomNumber(0, 4);

    switch (color) {
        case 'red':
        case 'blue':
        case 'black':
        case 'yellow':
        case 'green':
            cube.classList.add(`${colorCube[random]}`);
            break;
    }

    return cube;
}

/**
 * After ckicked to the button "New game"
 */
function clickNewGame() {
    timeBack();
    startClean();
    info.innerHTML = '<b>Please wait...</b>';
    info.style.display = 'flex';
    btnNewGame.setAttribute('value', 'pressed');

    let btnStartStatus = btnStart.innerHTML;

    if (btnStartStatus == 'Resume') {
        info.style.display = 'none';
        start();
    } else if (btnStartStatus == 'Pause' || btnStartStatus == 'Start') {
        setTimeout(function() {
            info.style.display = 'none';
            start();
        }, 1500);
    }
}

/**
 * Next level
 * 
 * @param {*} score 
 */
function nextLevel(score, timeLimit) {
    if (timeLimit == 0 || timeLimit < 0) {
        timeNow.innerHTML = 0;
        levelEnd(score);
    } else {
        congratulation();
        gameLevel.innerHTML = level;
        document.querySelector('.total').innerHTML = score;
        popupLevel.style.display = 'flex';
        gamePause.style.display = 'block';
    }
}

/**
 * Counting level up
 */
function levelUpdate() {
    level++;
    levelInfo.textContent = level;
    start();
}

/**
 * Game over
 * 
 * @param {*} score 
 */
function levelEnd(score) {
    gameOver();
    gameLevel.innerHTML = level;
    popupResultScore.innerHTML = `${score}`;
    popupResult.style.display = 'flex';
    gamePause.style.display = 'block';
}

/**
 * Saving results in the result table
 */
function saveResult() {
    let userName    = document.querySelector('.user-name').value;
    let score       = parseInt(points.innerHTML);
    let userData    = prepareUserData(userName, score, level);
    
    popupResult.style.display = 'none';
    popupLevel.style.display = 'none';
    zoneResult.insertAdjacentHTML('beforeEnd', `<p>${userName}: ${score} lvl: ${level}</p>`);
    
    level = 1;
    timeBack();
    saveLocalStorage(userData);
}

/**
 * Preparation the user data
 * 
 * @param {*} userName 
 * @param {*} score 
 * @param {*} level 
 */
function prepareUserData(userName, score, level) {
    let userData = { 
            name: userName,
            score: score,
            level: level
        };

    return userData;
}

/**
 * Saving in the local storage
 * 
 * @param {*} userData 
 */
function saveLocalStorage(userData) {
    let myStorage   = window.localStorage;
    let resultData  = getLocalStorage();

    resultData.allUsers.push(userData);
    myStorage.setItem('resultData', JSON.stringify(resultData));
}

/**
 * Getting data with local storage
 */
function getLocalStorage() {
    let myStorage = window.localStorage;

    if (myStorage.resultData) {
        return JSON.parse(myStorage.resultData);  
    } else {
        locaStorageTemplate();
        return JSON.parse(myStorage.resultData);
    }
}

/**
 * Helper for the first save
 */
function locaStorageTemplate() {
    localStorage.setItem('resultData', JSON.stringify({allUsers: []}));
}

/**
 * Helper for to the start new game and save result in table results
 */
function timeBack() {
    timeLimit = timeLimitMax;
}

/**
 * Render the table results
 */
function renderResult() {
    let myStorage = window.localStorage;
    let usersData = JSON.parse(myStorage.getItem('resultData'));

    if (usersData) {
        for (let userObject of usersData.allUsers) {
            zoneResult.insertAdjacentHTML(
                'beforeEnd', `<p>${userObject.name}: ${userObject.score} lvl: ${userObject.level}</p>`
            );
        }
    } else {zoneResult.innerHTML = '<p></p>';}
}

/**
 * Cleaning up Local Storage
 */
function cleanSorage() {
    let myStorage = window.localStorage;
    myStorage.clear();
    renderResult();
}

/**
 * Close popup save result
 */
function closePopup() {
    popupResult.style.display = 'none';
}

 /**
  * Sound for the passed level
  */
 function congratulation(){
    let audio = new Audio;
    audio.src = "sound/congratulation.mp3";
    audio.play();
 }

 /**
  * Sound for the close of the game
  */
 function gameOver(){
    let audio = new Audio;
    audio.src = "sound/game-over.mp3";
    audio.play();
 }

//  /**
//   * For the next upgrade
//   * Sound for the click on cube
//   */
//  function saundClick(){
//    let audio = new Audio;
//    audio.src = "sound/click.mp3";
//    audio.play();
// }