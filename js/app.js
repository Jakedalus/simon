

// Sounds /////
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

var greenSound = audioCtx.createOscillator();
greenSound.frequency.value = 164.81;  // E-note, octave lower than blue
greenSound.type = 'triangle';
greenSound.connect(audioCtx.destination);
var redSound = audioCtx.createOscillator();
redSound.frequency.value = 440.00;  // A-note
redSound.type = 'triangle';
redSound.connect(audioCtx.destination);
var yellowSound = audioCtx.createOscillator(); 
yellowSound.frequency.value = 277.18;  // C#-note
yellowSound.type = 'triangle';
yellowSound.connect(audioCtx.destination);
var blueSound = audioCtx.createOscillator();
blueSound.frequency.value = 329.63;  // E-note
blueSound.type = 'triangle';
blueSound.connect(audioCtx.destination);

var wrongSound = audioCtx.createOscillator();
wrongSound.frequency.value = 42;
wrongSound.connect(audioCtx.destination);
wrongSound.type = 'triangle';
//wrongSound.start(0);


// Colors /////
// light colors
var lightgreen = 'rgb(69, 214, 85)';
var lightred = 'rgb(248, 41, 21)';
var lightyellow = 'rgb(255, 247, 50)';
var lightblue = 'rgb(1, 135, 250)';

// dark colors
var darkgreen = 'rgb(55, 171, 68)';
var darkred = 'rgb(176, 29, 15)';
var darkyellow = 'rgb(191, 185, 37)';
var darkblue = 'rgb(1, 109, 186)';

// Button elements /////
var greenBtn = document.querySelector('#green-btn');
var redBtn = document.querySelector('#red-btn');
var yellowBtn = document.querySelector('#yellow-btn');
var blueBtn = document.querySelector('#blue-btn');
var buttons = [greenBtn, redBtn, yellowBtn, blueBtn];
console.log(buttons);

var startBtn = document.querySelector('#start');
var strickBtn = document.querySelector("#strick");
var strickLight = document.querySelector("#strickLight");
var ctrDisplay = document.querySelector('#count');


// Game State Variables /////
var sequence = [];
var gameStarted = false;
var playersTurn = false;
var strickMode = false;
var playerMove = '';
var position = 0;


function playLightAndSound(tile) {
    console.log(tile);
    switch(tile) {
            case 'green-btn':
                greenBtn.style.fill = lightgreen;
                greenSound.start(0);
                setTimeout(function() {
                    greenBtn.style.fill = darkgreen;
                    greenSound.stop();
                    greenSound = audioCtx.createOscillator();
                    greenSound.frequency.value = 164.81;
                    greenSound.type = 'triangle';
                    greenSound.connect(audioCtx.destination);
                }, 500);
                break;
            case 'red-btn':
                redBtn.style.fill = lightred;
                redSound.start(0);
                setTimeout(function() {
                    redBtn.style.fill = darkred;
                    redSound.stop();
                    redSound = audioCtx.createOscillator();
                    redSound.frequency.value = 440.00;
                    redSound.type = 'triangle';
                    redSound.connect(audioCtx.destination);
                }, 500);
                break;
            case 'yellow-btn':
                yellowBtn.style.fill = lightyellow;
                yellowSound.start(0);
                setTimeout(function() {
                    yellowBtn.style.fill = darkyellow;
                    yellowSound.stop();
                    yellowSound = audioCtx.createOscillator();
                    yellowSound.frequency.value = 277.18;
                    yellowSound.type = 'triangle';
                    yellowSound.connect(audioCtx.destination);
                }, 500);
                break;
            case 'blue-btn':
                blueBtn.style.fill = lightblue;
                blueSound.start(0);
                setTimeout(function() {
                    blueBtn.style.fill = darkblue;
                    blueSound.stop();
                    blueSound = audioCtx.createOscillator();
                    blueSound.frequency.value = 329.63;
                    blueSound.type = 'triangle';
                    blueSound.connect(audioCtx.destination);
                }, 500);
                break;

        }
    
    
}



function simonSays(tryAgain) {
    
    playersTurn = false;
    
    
    if(!tryAgain) {
        var newTile = ['green-btn', 'red-btn', 'yellow-btn', 'blue-btn'][Math.floor(Math.random() * 4)];

        sequence.push(newTile);
    }
    
    var count = sequence.length < 10 ? '0' + sequence.length : sequence.length;
    ctrDisplay.textContent = count;
    
    var ctr = 0;
    var interval = setInterval(function() {
        playLightAndSound(sequence[ctr]);
        ctr++;
        console.log(ctr);
        
        if(ctr >= sequence.length) {
            clearInterval(interval);
            playersTurn = true;
        }

        
    }, 600);
    

    
    
    
    
}

//simonSays(false);


function checkPlayer() {
    
    if(playerMove === sequence[position]) {
        position++;
        console.log("///Correct!");
        console.log("Sequence: ", sequence, " position: ", position);
        // Check if player has won
        if(position === 20) {  // Player has gotten 20 right
            gameOver();
        }
//        if(position === 3) {  // Player has gotten 3 right, for debugging
//            gameOver();
//        }
    } else {
        position = 0;
        console.log("///Wrong!!!");
        console.log("Sequence: ", sequence, " position: ", position);
        console.log("Wrong player move: ", playerMove, " Correct move: ", sequence[position]);
        // replay sequence, or create new one
        if(!strickMode) {
            simonSays(true);  // repeat sequence = true
        } else {
            var newSeq = [];
            for(var i = 0; i < sequence.length; i++) {
                var newTile = ['green-btn', 'red-btn', 'yellow-btn', 'blue-btn'][Math.floor(Math.random() * 4)];

                newSeq.push(newTile);
            }
            sequence = newSeq;
            simonSays(true);
        }
        
    }
    
    
    if(position === sequence.length && gameStarted) {
        simonSays(false);
        position = 0;
    }
    
}

function gameOver() {
    console.log("Player won!");
    
    sequence = [];
    position = 0;
    gameStarted = false;
    ctrDisplay.textContent = '--';
    
}
    

startBtn.addEventListener('click', function() {
    if(!gameStarted) simonSays(false);
    gameStarted = true;
});

strickBtn.addEventListener('click', function() {
    if(!gameStarted) {
        
        strickMode = !strickMode;
        if(strickMode) {
            strickLight.classList.add('on');
        } else {
            strickLight.classList.remove('on');
        }
        
    } 
});


buttons.forEach(function(button) {
    console.log(button.id);
    
    button.addEventListener('mousedown', function() {
        if(playersTurn) {
            playerMove = button.id;
            console.log(playerMove);
            switch(button.id) {
                case 'green-btn':
                    button.style.fill = lightgreen;
                    greenSound.start(0);
                    break;
                case 'red-btn':
                    button.style.fill = lightred;
                    redSound.start(0);
                    break;
                case 'yellow-btn':
                    button.style.fill = lightyellow;
                    yellowSound.start(0);
                    break;
                case 'blue-btn':
                    button.style.fill = lightblue;
                    blueSound.start(0);
                    break;

            }
        }
    });
    
    button.addEventListener('mouseup', function() {
        if(playersTurn) {
            switch(button.id) {
                case 'green-btn':
                    button.style.fill = darkgreen;
                    greenSound.stop();
                    greenSound = audioCtx.createOscillator();
                    greenSound.frequency.value = 164.81;
                    greenSound.type = 'triangle';
                    greenSound.connect(audioCtx.destination);
                    checkPlayer();
                    break;
                case 'red-btn':
                    button.style.fill = darkred;
                    redSound.stop();
                    redSound = audioCtx.createOscillator();
                    redSound.frequency.value = 440.00;
                    redSound.type = 'triangle';
                    redSound.connect(audioCtx.destination);
                    checkPlayer();
                    break;
                case 'yellow-btn':
                    button.style.fill = darkyellow;
                    yellowSound.stop();
                    yellowSound = audioCtx.createOscillator();
                    yellowSound.frequency.value = 277.18;
                    yellowSound.type = 'triangle';
                    yellowSound.connect(audioCtx.destination);
                    checkPlayer();
                    break;
                case 'blue-btn':
                    button.style.fill = darkblue;
                    blueSound.stop();
                    blueSound = audioCtx.createOscillator();
                    blueSound.frequency.value = 329.63;
                    blueSound.type = 'triangle';
                    blueSound.connect(audioCtx.destination);
                    checkPlayer();
                    break;

            }
        }
    });

});
    

