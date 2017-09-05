

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
var powerBtn = document.querySelector("#power");
var powerSwitch = document.querySelector("#power-switch");
console.log(powerBtn);
console.log(powerSwitch);
console.log(powerSwitch.getAttribute('x'));


// Game State Variables /////
var sequence = [];
var gameStarted = false;
var playersTurn = false;
var strickMode = false;
var powerOn = false;
var playerMove = '';
var position = 0;
var ongoingTouches = [];

var interval;

function playGreen() {
    greenBtn.style.fill = lightgreen;
    greenSound.start(0);
}

function stopGreen() {
    greenBtn.style.fill = darkgreen;
    greenSound.stop();
    greenSound = audioCtx.createOscillator();
    greenSound.frequency.value = 164.81;
    greenSound.type = 'triangle';
    greenSound.connect(audioCtx.destination);
}

function playRed() {
    redBtn.style.fill = lightred;
    redSound.start(0);
}

function stopRed() {
    redBtn.style.fill = darkred;
    redSound.stop();
    redSound = audioCtx.createOscillator();
    redSound.frequency.value = 440.00;
    redSound.type = 'triangle';
    redSound.connect(audioCtx.destination);
}

function playYellow() {
    yellowBtn.style.fill = lightyellow;
    yellowSound.start(0);
}

function stopYellow() {
    yellowBtn.style.fill = darkyellow;
    yellowSound.stop();
    yellowSound = audioCtx.createOscillator();
    yellowSound.frequency.value = 277.18;
    yellowSound.type = 'triangle';
    yellowSound.connect(audioCtx.destination);
}

function playBlue() {
    blueBtn.style.fill = lightblue;
    blueSound.start(0);
}

function stopBlue() {
    blueBtn.style.fill = darkblue;
    blueSound.stop();
    blueSound = audioCtx.createOscillator();
    blueSound.frequency.value = 329.63;
    blueSound.type = 'triangle';
    blueSound.connect(audioCtx.destination);
}

function playLightAndSound(tile) {
    console.log(tile);
    switch(tile) {
            case 'green-btn':
                playGreen();
                setTimeout(function() {
                    stopGreen();
                }, 500);
                break;
            case 'red-btn':
                playRed();
                setTimeout(function() {
                    stopRed();
                }, 500);
                break;
            case 'yellow-btn':
                playYellow();
                setTimeout(function() {
                    stopYellow();
                }, 500);
                break;
            case 'blue-btn':
                playBlue();
                setTimeout(function() {
                    stopBlue();
                }, 500);
                break;

        }
    
    
}

function wrong() {
    wrongSound.start(0);
    setTimeout(function() {
        wrongSound.stop();
        wrongSound = audioCtx.createOscillator();
        wrongSound.frequency.value = 42;
        wrongSound.type = 'triangle';
        wrongSound.connect(audioCtx.destination);
    }, 1500);
}



function simonSays(tryAgain) {
    
    
    
    
    if(!tryAgain) {
        var newTile = ['green-btn', 'red-btn', 'yellow-btn', 'blue-btn'][Math.floor(Math.random() * 4)];

        sequence.push(newTile);
    }
    
    var count = sequence.length < 10 ? '0' + sequence.length : sequence.length;
    ctrDisplay.textContent = count;
    
    var ctr = 0;
    interval = setInterval(function() {
        playersTurn = false;
        console.log("**Playing ", ctr, " move in the sequence of length", sequence.length, " .");
        console.log("interval id: ", interval);
        playLightAndSound(sequence[ctr]);
        ctr++;
        
        
        
        if(ctr === sequence.length) {
            console.log("INTERVAL CLEARED!!!");
            clearInterval(interval);
            setTimeout(function() {
                playersTurn = true;
                console.log("////IT IS NOW PLAYER'S TURN!!////");
                console.log("Player's turn: ", playersTurn);
            }, 605);
            
        }
        console.log("Player's turn: ", playersTurn);
        
    }, 600);
    

    
    
    
    
}

//simonSays(false);


function checkPlayer() {
    playersTurn = false;
    
    if(playerMove === sequence[position]) {
        position++;
        playersTurn = true;
        console.log("///Correct!");
        console.log("Sequence: ", sequence, " position: ", position);
        // Check if player has won
        if(position === 20) {  // Player has gotten 20 right
            playerWon();
        }
//        if(position === 3) {  // Player has gotten 3 right, for debugging
//            playerWon();
//        }
    } else {
        position = 0;
        playersTurn = false;
        console.log("///Wrong!!!");
        console.log("Sequence: ", sequence, " position: ", position);
        console.log("Wrong player move: ", playerMove, " Correct move: ", sequence[position]);
        setTimeout(function() {
            wrong();
        }, 200);
        // replay sequence, or create new one
        setTimeout(function() {
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
        }, 1700);
        
    }
    
    
    if(position === sequence.length && gameStarted) {
        simonSays(false);
        position = 0;
    }
    
}

function playerWon() {
    // Play sequence of sounds if player got 20 in a row
    // Once
    setTimeout(function() {
        playRed();
        setTimeout(function() {
            stopRed();
        }, 100);
    }, 100);
    
    setTimeout(function() {
        playYellow();
        setTimeout(function() {
            stopYellow();
        }, 100);
    }, 300);
    
    setTimeout(function() {
        playBlue();
        setTimeout(function() {
            stopBlue();
        }, 100);
    }, 500);
    
    setTimeout(function() {
        playGreen();
        setTimeout(function() {
            stopGreen();
        }, 100);
    }, 700);
    
    // Twice
    setTimeout(function() {
        playRed();
        setTimeout(function() {
            stopRed();
        }, 100);
    }, 900);
    
    setTimeout(function() {
        playYellow();
        setTimeout(function() {
            stopYellow();
        }, 100);
    }, 1100);
    
    setTimeout(function() {
        playBlue();
        setTimeout(function() {
            stopBlue();
        }, 100);
    }, 1300);
    
    setTimeout(function() {
        playGreen();
        setTimeout(function() {
            stopGreen();
        }, 100);
    }, 1500);
    
    // Three Times
    setTimeout(function() {
        playRed();
        setTimeout(function() {
            stopRed();
        }, 100);
    }, 1700);
    
    setTimeout(function() {
        playYellow();
        setTimeout(function() {
            stopYellow();
        }, 100);
    }, 1900);
    
    setTimeout(function() {
        playBlue();
        setTimeout(function() {
            stopBlue();
        }, 100);
    }, 2100);
    
    setTimeout(function() {
        playGreen();
        setTimeout(function() {
            stopGreen();
            wrongSound.start(0);
            setTimeout(function() {
                wrongSound.stop();
                wrongSound = audioCtx.createOscillator();
                wrongSound.frequency.value = 42;
                wrongSound.type = 'triangle';
                wrongSound.connect(audioCtx.destination);
            }, 3500);
        }, 100);
    }, 2300);
    
    
    
    restartGame();
}

function restartGame() {
    
    sequence = [];
    position = 0;
    gameStarted = false;
    ctrDisplay.textContent = '--';
    playersTurn = false;
    
}
    



if( !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    powerBtn.addEventListener('click', function() {
        powerOn = !powerOn;
        console.log(powerOn);

        if(powerOn) {
            powerSwitch.setAttribute('x', 760);
            restartGame();

        } else {
            powerSwitch.setAttribute('x', 720);
            ctrDisplay.textContent = '';
        }
    });
    
    startBtn.addEventListener('click', function() {
        if(powerOn) {
            if(!gameStarted) simonSays(false);
            gameStarted = true;
        }
    });

    strickBtn.addEventListener('click', function() {
        if(powerOn) {
            if(!gameStarted) {

                strickMode = !strickMode;
                if(strickMode) {
                    strickLight.classList.add('on');
                } else {
                    strickLight.classList.remove('on');
                }

            } 
        }
    });
    
} else {
    powerBtn.addEventListener('touchstart', function() {
        powerOn = !powerOn;
        console.log("Power on:", powerOn);

        if(powerOn) {
            powerSwitch.setAttribute('x', 760);
            restartGame();

        } else {
            powerSwitch.setAttribute('x', 720);
            ctrDisplay.textContent = '';
        }
    });
    
    startBtn.addEventListener('touchstart', function() {
        if(powerOn) {
            if(!gameStarted) simonSays(false);
            gameStarted = true;
        }
    });

    strickBtn.addEventListener('touchstart', function() {
        if(powerOn) {
            if(!gameStarted) {

                strickMode = !strickMode;
                if(strickMode) {
                    strickLight.classList.add('on');
                } else {
                    strickLight.classList.remove('on');
                }

            } 
        }
    });
}

function pushDown(id) {
    if(playersTurn && powerOn) {
        playerMove = id;
        console.log("**Player pushed: ", playerMove);
        switch(id) {
            case 'green-btn':
                playGreen();
                break;
            case 'red-btn':
                playRed();
                break;
            case 'yellow-btn':
                playYellow();
                break;
            case 'blue-btn':
                playBlue();
                break;

        }
    }
}

function liftUp(id) {
    if(playersTurn && powerOn) {
        switch(id) {
            case 'green-btn':
                stopGreen();
                checkPlayer();
                break;
            case 'red-btn':
                stopRed();
                checkPlayer();
                break;
            case 'yellow-btn':
                stopYellow();
                checkPlayer();
                break;
            case 'blue-btn':
                stopBlue();
                checkPlayer();
                break;

        }
    }
}

//window.addEventListener("touchstart", touchHandler, false);
//
//function touchHandler(event){
//    if(event.touches.length > 1){
//        //the event is multi-touch
//        //you can then prevent the behavior
//        event.preventDefault()
//    }
//}

// Mouse Events
if( !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    console.log("Adding Mouse Events!");
    buttons.forEach(function(button) {
        console.log(button.id);

        button.addEventListener('mousedown', function(e) {
            pushDown(button.id);
            console.log(e);
        });

        button.addEventListener('mouseup', function(e) {
            liftUp(button.id); 
            console.log(e);
        });

    });
} else {
    // Touch Events
    console.log("Adding Touch Events!");
    buttons.forEach(function(button) {
        console.log(button.id);

        button.addEventListener('touchstart', function(e) {
            e.stopPropagation();
            
            console.log(e);
            e.preventDefault();
            var touch = e.changedTouches[0];
//            ongoingTouches.push(touch);
//            console.log("Adding ", touches, " to All touches: ", ongoingTouches);
//            var btnID = ongoingTouches.pop()[0].target.id;
//            console.log("Touched: ", btnID);
            pushDown(touch.target.id);
            
        });

        button.addEventListener('touchend', function(e) {
            e.stopPropagation();
            liftUp(button.id);
            console.log(e);
            
            
        });

    });
}


