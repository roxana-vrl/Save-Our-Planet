// ==================================================
// ECOQUEST
// Environmental Science Game
// ==================================================


// ==================================================
// GLOBAL VARIABLES
// ==================================================

// Current level
let currentLevel = 1;


// Player score
let score = 0;


// Player lives
let lives = 3;


// Time for current level
let levelTime = 0;


// Total game time
let totalTime = 0;


// Stores the timer
let timerID;


// Number of correct answers
let correctCount = 0;


// Number of mistakes
let mistakes = 0;


// Checks if game is running
let gameStarted = false;


// Player name
let playerName = "";


// Selected avatar
let selectedAvatar = "";



// Correct answers needed
// for each level

let levelTargets = [
    7,
    4,
    4,
    6
];



// Positive messages

let correctMessages = [

    "Great job!",

    "Correct!",

    "Well done!",

    "Excellent!",

    "Great work!"
];



// ==================================================
// SELECT AVATAR
// ==================================================

function selectAvatar(avatarName) {

    // Save selected avatar
    selectedAvatar =
        avatarName;


    // Remove selection
    // from both avatars
    $(".avatar-card")
        .removeClass(
            "selected"
        );


    // Select clicked avatar
    $("#" + avatarName + "Card")
        .addClass(
            "selected"
        );


    // Clear error
    $("#playerError")
        .text("");
}



// ==================================================
// PLAY SOUND
// ==================================================

function playSound(soundID) {

    let sound =
        document.getElementById(
            soundID
        );


    if (sound) {

        sound.currentTime = 0;


        sound.play()
            .catch(
                function () {

                    // Game continues
                    // if sound cannot play
                }
            );
    }
}



// ==================================================
// SHOW SCREEN
// ==================================================

function showScreen(screenID) {

    // Hide all screens
    $(".screen")
        .removeClass(
            "active"
        );


    // Show selected screen
    $("#" + screenID)
        .addClass(
            "active"
        );
}



// ==================================================
// START GAME
// ==================================================

function startGame() {

   // Get player name
playerName =
    document
        .getElementById(
            "playerName"
        )
        .value
        .trim();


// Make first letter uppercase
if (playerName != "") {

    playerName =
        playerName.charAt(0).toUpperCase()
        +
        playerName.slice(1).toLowerCase();
}


    // Check name
    if (
        playerName == ""
    ) {

        document
            .getElementById(
                "playerError"
            )
            .innerText =
                "Please enter your name!";


        return;
    }


    // Check avatar
    if (
        selectedAvatar == ""
    ) {

        document
            .getElementById(
                "playerError"
            )
            .innerText =
                "Please choose your avatar!";


        return;
    }


    // Clear error
    document
        .getElementById(
            "playerError"
        )
        .innerText = "";


    // Reset game values
    currentLevel = 1;

    score = 0;

    lives = 3;

    levelTime = 0;

    totalTime = 0;

    correctCount = 0;

    mistakes = 0;

    gameStarted = true;


    // Play sound
    playSound(
        "startSound"
    );


    // Show first level
    showScreen(
        "level1"
    );


    // Start timer
    startTimer();


    // Prepare level
    setupLevel1();


    // Update HUD
    updateHUD();
}



// ==================================================
// TIMER
// ==================================================

function startTimer() {

    // Reset level time
    levelTime = 0;


    // Stop old timer
    clearInterval(
        timerID
    );


    // Start timer
    timerID =
        setInterval(

            function () {

                levelTime =
                    levelTime + 1;


                totalTime =
                    totalTime + 1;


                updateHUD();

            },

            1000
        );
}



// ==================================================
// UPDATE HUD
// ==================================================

function updateHUD() {

    $(".score")
        .text(
            score
        );


    $(".lives")
        .text(
            lives
        );


    $(".time")
        .text(
            levelTime
        );
}



// ==================================================
// SHOW MESSAGE
// ==================================================

function showMessage(message) {

    $(".screen.active .game-message")
        .text(
            message
        );
}



// ==================================================
// RANDOM CORRECT MESSAGE
// ==================================================

function getCorrectMessage() {

    let randomNumber =
        Math.floor(

            Math.random() *

            correctMessages.length
        );


    return correctMessages[
        randomNumber
    ];
}



// ==================================================
// CORRECT ANSWER
// ==================================================

function correctAnswer(points) {

    // Add points
    score =
        score + points;


    // Add correct answer
    correctCount =
        correctCount + 1;


    // Sound
    playSound(
        "correctSound"
    );


    // Message
    showMessage(
        getCorrectMessage()
    );


    updateHUD();
}



// ==================================================
// WRONG ANSWER
// ==================================================

function wrongAnswer(message) {

    // Count mistake
    mistakes =
        mistakes + 1;


    // Lose life
    lives =
        lives - 1;


    // Wrong sound
    playSound(
        "wrongSound"
    );


    // Message
    showMessage(
        message
    );


    updateHUD();


    // Check lives
    if (
        lives <= 0 &&
        gameStarted == true
    ) {

        gameOver();
    }
}



// ==================================================
// SAVE ORIGINAL POSITION
// ==================================================

function saveOriginalPosition(object) {

    let position =
        object.position();


    object.data(
        "originalLeft",
        position.left
    );


    object.data(
        "originalTop",
        position.top
    );
}



// ==================================================
// RETURN OBJECT
// ==================================================

function returnObject(object) {

    object.animate({

        left:
            object.data(
                "originalLeft"
            ),

        top:
            object.data(
                "originalTop"
            )

    }, 450);
}



// ==================================================
// LEVEL 1 RUBBISH POSITIONS
// ==================================================

function positionLevel1Rubbish() {

    /*
       Safe positions on the grass.

       The positions are shuffled
       every time the game starts.
    */

    let positions = [

        {
            left: "12%",
            top: "62%"
        },

        {
            left: "25%",
            top: "70%"
        },

        {
            left: "38%",
            top: "61%"
        },

        {
            left: "49%",
            top: "70%"
        },

        {
            left: "61%",
            top: "61%"
        },

        {
            left: "72%",
            top: "70%"
        },

        {
            left: "83%",
            top: "61%"
        }
    ];


    // Shuffle array
    positions.sort(

        function () {

            return (
                Math.random() - 0.5
            );
        }
    );


    // Loop through rubbish
    $(".rubbish").each(

        function (index) {

            $(this).css({

                left:
                    positions[index].left,

                top:
                    positions[index].top
            });
        }
    );
}



// ==================================================
// LEVEL 1
// CLEAN THE PARK
// ==================================================

function setupLevel1() {

    correctCount = 0;

    lives = 3;


    updateHUD();


    // Position rubbish
    positionLevel1Rubbish();


    // Show rubbish
    $(".rubbish").show();


    // Save positions
    $(".rubbish").each(

        function () {

            saveOriginalPosition(
                $(this)
            );
        }
    );


    // Make rubbish draggable
    $(".rubbish").draggable({

        revert: false,

        containment:
            "#level1",

        start:
            function () {

                $(this).css(
                    "z-index",
                    "700"
                );
            }
    });


    // Make bins droppable
    $(".bin").droppable({

        tolerance:
            "pointer",

        hoverClass:
            "drop-hover",


        drop:
            function (
                event,
                ui
            ) {

                let rubbishType =
                    ui.draggable.attr(
                        "data-type"
                    );


                let binType =
                    $(this).attr(
                        "data-type"
                    );


                // Correct bin
                if (
                    rubbishType ==
                    binType
                ) {

                    correctAnswer(
                        10
                    );


                    ui.draggable
                        .draggable(
                            "disable"
                        );


                    ui.draggable
                        .fadeOut(
                            300
                        );


                    checkLevelComplete();
                }


                // Wrong bin
                else {

                    wrongAnswer(
                        "Wrong bin! Try again."
                    );


                    returnObject(
                        ui.draggable
                    );
                }
            }
    });
}



// ==================================================
// LEVEL 2 POSITIONS
// ==================================================

function positionLevel2Objects() {

    /*
       Four safe pollution
       positions.
    */

    let pollutionPositions = [

        {
            left: "13%",
            top: "58%"
        },

        {
            left: "29%",
            top: "68%"
        },

        {
            left: "43%",
            top: "58%"
        },

        {
            left: "60%",
            top: "67%"
        }
    ];


    // Shuffle positions
    pollutionPositions.sort(

        function () {

            return (
                Math.random() - 0.5
            );
        }
    );


    // Position pollution
    $(".pollution").each(

        function (index) {

            $(this).css({

                left:
                    pollutionPositions[
                        index
                    ].left,

                top:
                    pollutionPositions[
                        index
                    ].top
            });
        }
    );


    // Fish stays in water
    $("#oceanFish").css({

        left: "52%",

        top: "55%"
    });


    // Seashell stays on beach
    $("#oceanShell").css({

        left: "22%",

        top: "61%"
    });
}



// ==================================================
// LEVEL 2
// CLEAN THE OCEAN
// ==================================================

function setupLevel2() {

    correctCount = 0;

    lives = 3;


    updateHUD();


    $("#oceanProgress")
        .text(
            0
        );


    // Position objects
    positionLevel2Objects();


    $(".ocean-object")
        .show();


    // Save original positions
    $(".ocean-object").each(

        function () {

            saveOriginalPosition(
                $(this)
            );
        }
    );


    // Make draggable
    $(".ocean-object").draggable({

        revert: false,

        containment:
            "#level2",

        start:
            function () {

                $(this).css(
                    "z-index",
                    "700"
                );
            }
    });


    // Clean up zone
    $("#oceanBin").droppable({

        tolerance:
            "pointer",

        hoverClass:
            "drop-hover",


        drop:
            function (
                event,
                ui
            ) {

                let objectType =
                    ui.draggable.attr(
                        "data-type"
                    );


                // Pollution
                if (
                    objectType ==
                    "pollution"
                ) {

                    correctAnswer(
                        10
                    );


                    ui.draggable
                        .draggable(
                            "disable"
                        );


                    ui.draggable
                        .fadeOut(
                            300
                        );


                    $("#oceanProgress")
                        .text(
                            correctCount
                        );


                    checkLevelComplete();
                }


                // Nature
                else {

                    wrongAnswer(
                        "Leave nature alone!"
                    );


                    returnObject(
                        ui.draggable
                    );
                }
            }
    });
}



// ==================================================
// LEVEL 3
// RESTORE THE HABITAT
// ==================================================

function setupLevel3() {

    correctCount = 0;

    lives = 3;


    updateHUD();


    // Save healthy item positions
    $(".repair-item").each(

        function () {

            saveOriginalPosition(
                $(this)
            );
        }
    );


    // Make draggable
    $(".repair-item").draggable({

        revert: false,

        containment:
            "#level3",

        start:
            function () {

                $(this).css(
                    "z-index",
                    "1000"
                );
            }
    });


    // Damaged zones
    $(".repair-zone").droppable({

        tolerance:
            "pointer",

        hoverClass:
            "drop-hover",


        drop:
            function (
                event,
                ui
            ) {

                let healthyType =
                    ui.draggable.attr(
                        "data-type"
                    );


                let damagedType =
                    $(this).attr(
                        "data-type"
                    );


                // Correct repair
                if (
                    healthyType ==
                    damagedType
                ) {

                    correctAnswer(
                        10
                    );


                    let damagedImage =
                        $(this).find(
                            "img"
                        );


                    // Replace broken image
                    damagedImage.attr(

                        "src",

                        ui.draggable.attr(
                            "src"
                        )
                    );


                    damagedImage
                        .addClass(
                            "correct-animation"
                        );


                    // Hide inventory object
                    ui.draggable.hide();


                    ui.draggable
                        .draggable(
                            "disable"
                        );


                    $(this)
                        .droppable(
                            "disable"
                        );


                    checkLevelComplete();
                }


                // Wrong repair
                else {

                    wrongAnswer(
                        "That does not fix this habitat!"
                    );


                    returnObject(
                        ui.draggable
                    );
                }
            }
    });
}



// ==================================================
// LEVEL 4
// BUILD A GREEN CITY
// ==================================================

function setupLevel4() {

    correctCount = 0;

    lives = 3;


    updateHUD();


    // Save original positions
    $(".city-item").each(

        function () {

            saveOriginalPosition(
                $(this)
            );
        }
    );


    // Make items draggable
    $(".city-item").draggable({

        revert: false,

        containment:
            "#level4",

        start:
            function () {

                $(this).css(
                    "z-index",
                    "1100"
                );
            }
    });


    // Make city zones droppable
    $(".city-zone").droppable({

        tolerance:
            "pointer",

        hoverClass:
            "drop-hover",


        drop:
            function (
                event,
                ui
            ) {

                let itemType =
                    ui.draggable.attr(
                        "data-type"
                    );


                let zoneType =
                    $(this).attr(
                        "data-type"
                    );


                // Correct place
                if (
                    itemType ==
                    zoneType
                ) {

                    correctAnswer(
                        10
                    );


                    placeCityObject(
                        ui.draggable,
                        $(this)
                    );


                    checkLevelComplete();
                }


                // Wrong place
                else {

                    wrongAnswer(
                        "Try a different place!"
                    );


                    returnObject(
                        ui.draggable
                    );
                }
            }
    });
}



// ==================================================
// PLACE CITY OBJECT
// ==================================================

function placeCityObject(
    object,
    zone
) {

    // Hide zone label
    zone.find(
        "span"
    ).hide();


    // Remove drop border
    zone.css({

        border:
            "none",

        background:
            "transparent"
    });


    // Put object inside zone
    object.appendTo(
        zone
    );


    // Centre object
    object.css({

        position:
            "absolute",

        left:
            "50%",

        top:
            "50%",

        transform:
            "translate(-50%, -50%)"
    });


    let itemType =
        object.attr(
            "data-type"
        );


    // Solar house
    if (
        itemType ==
        "solar"
    ) {

        object.css({

            width:
                "180px",

            height:
                "150px"
        });
    }


    // Tree
    else if (
        itemType ==
        "tree"
    ) {

        object.css({

            width:
                "145px",

            height:
                "145px"
        });
    }


    // Garden
    else if (
        itemType ==
        "garden"
    ) {

        object.css({

            width:
                "175px",

            height:
                "120px"
        });
    }


    // Recycling
    else if (
        itemType ==
        "recycling"
    ) {

        object.css({

            width:
                "150px",

            height:
                "120px"
        });
    }


    // Bus
    else if (
        itemType ==
        "bus"
    ) {

        object.css({

            width:
                "155px",

            height:
                "100px"
        });
    }


    // Bicycle
    else {

        object.css({

            width:
                "120px",

            height:
                "100px"
        });
    }


    // Disable item
    object.draggable(
        "disable"
    );


    // Disable drop zone
    zone.droppable(
        "disable"
    );
}



// ==================================================
// CHECK LEVEL COMPLETE
// ==================================================

function checkLevelComplete() {

    let target =
        levelTargets[
            currentLevel - 1
        ];


    if (
        correctCount >= target
    ) {

        // Stop timer
        clearInterval(
            timerID
        );


        // Sound
        playSound(
            "levelSound"
        );


        // Message
        showMessage(
            "LEVEL COMPLETE!"
        );


        // Wait before next level
        setTimeout(

            function () {

                nextLevel();

            },

            1400
        );
    }
}



// ==================================================
// NEXT LEVEL
// ==================================================

function nextLevel() {

    currentLevel =
        currentLevel + 1;


    switch (
        currentLevel
    ) {


        // Level 2
        case 2:

            showScreen(
                "level2"
            );


            startTimer();


            setupLevel2();


            break;



        // Level 3
        case 3:

            showScreen(
                "level3"
            );


            startTimer();


            setupLevel3();


            break;



        // Level 4
        case 4:

            showScreen(
                "level4"
            );


            startTimer();


            setupLevel4();


            break;



        // Results
        case 5:

            finishGame();


            break;
    }
}



// ==================================================
// FORMAT TIME
// ==================================================

function formatTime(seconds) {

    // Calculate minutes
    let minutes =
        Math.floor(
            seconds / 60
        );


    // Remaining seconds
    let remainingSeconds =
        seconds % 60;


    // Add zero
    if (
        remainingSeconds < 10
    ) {

        remainingSeconds =
            "0" +
            remainingSeconds;
    }


    return (
        minutes +
        ":" +
        remainingSeconds
    );
}



// ==================================================
// SHOW TROPHY
// ==================================================

function showTrophy() {

    let trophy =
        document.getElementById(
            "trophy"
        );


    let title =
        document.getElementById(
            "trophyTitle"
        );


    /*
       Gold:
       maximum 2 mistakes
       and maximum 3 minutes.
    */

    if (
        mistakes <= 2 &&
        totalTime <= 180
    ) {

        trophy.innerText =
            "🏆";


        title.innerText =
            "GOLD ECO CHAMPION";
    }


    /*
       Silver:
       maximum 5 mistakes.
    */

    else if (
        mistakes <= 5
    ) {

        trophy.innerText =
            "🥈";


        title.innerText =
            "SILVER ECO CHAMPION";
    }


    // Bronze
    else {

        trophy.innerText =
            "🥉";


        title.innerText =
            "BRONZE ECO CHAMPION";
    }
}



// ==================================================
// FINISH GAME
// ==================================================

function finishGame() {

    // Stop timer
    clearInterval(
        timerID
    );


    gameStarted = false;


    // Show results
    showScreen(
        "resultsScreen"
    );


    // Victory sound
    playSound(
        "victorySound"
    );


    // Player name
    document
        .getElementById(
            "resultName"
        )
        .innerText =
            playerName;


    // Player avatar
    document
        .getElementById(
            "resultAvatar"
        )
        .src =
            "images/" +
            selectedAvatar +
            ".png";


    // Final score
    document
        .getElementById(
            "finalScore"
        )
        .innerText =
            score +
            " / 210";


    // Final time
    document
        .getElementById(
            "finalTime"
        )
        .innerText =
            formatTime(
                totalTime
            );


    // Mistakes
    document
        .getElementById(
            "finalMistakes"
        )
        .innerText =
            mistakes;


    // Trophy
    showTrophy();
}



// ==================================================
// GAME OVER
// ==================================================

function gameOver() {

    // Stop timer
    clearInterval(
        timerID
    );


    gameStarted = false;


    // Sound
    playSound(
        "gameOverSound"
    );


    // Wait
    setTimeout(

        function () {

            alert(
                "Game Over! Your score was "
                + score
            );


            restartGame();

        },

        700
    );
}



// ==================================================
// RESTART GAME
// ==================================================

function restartGame() {

    // Reload whole game
    location.reload();
}