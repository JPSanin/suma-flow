//Variable declaration
let pantalla = 4;

/* None is 0
Selecting is 1
*/
let gameMode = 0;

let selectedI = 0;
let selectedJ = 0;

let pselectedI = 0;
let pselectedJ = 0;

// instructions map
let instMap = [
    [17, 0, 20],
    [7, 10, 7],
    [0, 7, 6],
];

let instMapType = [
    [3, 1, 3],
    [2, 2, 2],
    [1, 2, 2],
];


let level1Map = [
    [34, 9, 2, 8, 4],
    [7, 10, 4, 6, 7],
    [0, 7, 0, 3, 4],
    [10, 3, 0, 8, 0],
    [12, 8, 4, 5, 43],
];

let level1MapType = [
    [3, 2, 2, 2, 2],
    [2, 2, 2, 2, 2],
    [1, 2, 1, 2, 2],
    [3, 2, 1, 2, 1],
    [3, 2, 2, 2, 3],
];




let sumBlocks = [];

function preload() {
    nunito = loadFont('fonts/nunito-bold.ttf');
    home1 = loadImage("images/start1.png");
    home2 = loadImage("images/start2.png");
    inst1 = loadImage("images/inst1.png");
    inst2 = loadImage("images/inst2.png");
    tut = loadImage("images/tutblock.png");
    tutReady = loadImage("images/tutReady.png");
    tutReady1 = loadImage("images/tutReady1.png");
    level1 = loadImage("images/level1.png");
}

function setup() {
    createCanvas(1280, 720);
    createMap(instMap, instMapType);
    setupTutorialMap(instMap);

    createMapLevel1(level1Map, level1MapType);
    setupLevel1Map(level1Map);

}

function draw() {
    switch (pantalla) {
        case 0:
            image(home1, 0, 0);

            if (474 < mouseX && mouseX < 805 && 513 < mouseY && mouseY < 591) {
                image(home2, 0, 0);
            }
            break;
        case 1:
            image(inst1, 0, 0);
            if (128 < mouseX && mouseX < 128 + 293 && 555 < mouseY && mouseY < 555 + 47) {
                image(inst2, 0, 0);
            }

            break;

        case 2:
            image(tut, 0, 0);
            drawMap(instMap, pantalla);

            break;
        case 3:
            image(tutReady, 0, 0);
            if (128 < mouseX && mouseX < 128 + 197 && 547 < mouseY && mouseY < 547 + 47) {
                image(tutReady1, 0, 0);
            }
            break;
        case 4:
            image(level1, 0, 0);
            drawMapLevel1(level1Map, pantalla);
            break;

    }

    textSize(16);
    fill(255);
    text(mouseX + "," + mouseY, mouseX, mouseY);


}


function mousePressed() {
    switch (pantalla) {
        case 0:
            if (474 < mouseX && mouseX < 805 && 513 < mouseY && mouseY < 591) {
                pantalla = 1;
            }
            break;
        case 1:
            if (128 < mouseX && mouseX < 128 + 293 && 555 < mouseY && mouseY < 555 + 47) {
                pantalla = 2;
            }
            break;

        case 2:
            if (720 < mouseX && mouseX < 1128 && 157 < mouseY && mouseY < 565) {

                selectedI = Math.floor((mouseY - 157) / 140);
                selectedJ = Math.floor((mouseX - 720) / 140);

                if (instMap[selectedI][selectedJ].getType() == 1 && gameMode == 0) {

                    resetMapTut(instMap);
                    sumBlocks.push(instMap[selectedI][selectedJ]);
                    console.log(sumBlocks);
                    gameMode = 1;

                } else if (instMap[selectedI][selectedJ].getType() == 1 && gameMode == 1) {
                    console.log(selectedI, selectedJ);
                    resetMapTut(instMap);
                    gameMode = 0;

                } else if (instMap[selectedI][selectedJ].getType() == 3 && gameMode == 1) {
                    let sum = 0;
                    for (let i = 0; i < sumBlocks.length; i++) {
                        sum += sumBlocks[i].getNumber();
                    }

                    if (sum == instMap[selectedI][selectedJ].getNumber()) {
                        console.log(sumBlocks);
                        console.log(instMap[selectedI][selectedJ]);
                        instMap[selectedI][selectedJ].changeType(5);
                        while (sumBlocks.length > 0) {
                            sumBlocks[sumBlocks.length - 1].changeColor(instMap[selectedI][selectedJ].getColor());
                            sumBlocks[sumBlocks.length - 1].changeType(5);
                            sumBlocks.pop();
                        }
                        resetMapTut(instMap);
                        console.log(instMap);
                    }else{
                        resetMapTut(instMap); 
                    }
                } else if ((selectedI == 0 && selectedJ == 1) || (selectedI == 2 && selectedJ == 0)) {
                    gameMode = 0;
                    resetPathM1(instMap);
                }

            } else {
                resetMapTut(instMap);
                gameMode = 0;
            }


            break;

        case 3:
            if (128 < mouseX && mouseX < 128 + 197 && 547 < mouseY && mouseY < 547 + 47) {
                pantalla = 4;
            }
            break;
        case 4:
            console.log(level1Map);
            if (387 < mouseX && mouseX < 387+506 && 138 < mouseY && mouseY < 138+506) {

                selectedI = Math.floor((mouseY - 155) / 97);
                selectedJ = Math.floor((mouseX - 403) / 97);
                console.log(selectedI, selectedJ);
                if (level1Map[selectedI][selectedJ].getType() == 1 && gameMode == 0) {

                    resetMap1(level1Map);
                    sumBlocks.push(level1Map[selectedI][selectedJ]);
                    console.log(sumBlocks);
                    gameMode = 1;

                } else if (level1Map[selectedI][selectedJ].getType() == 1 && gameMode == 1) {
                    console.log(selectedI, selectedJ);
                    resetMap1(level1Map);
                    gameMode = 0;

                } else if (level1Map[selectedI][selectedJ].getType() == 3 && gameMode == 1) {
                    let sum = 0;
                    for (let i = 0; i < sumBlocks.length; i++) {
                        sum += sumBlocks[i].getNumber();
                    }

                    if (sum == level1Map[selectedI][selectedJ].getNumber()) {
                        console.log(sumBlocks);
                        console.log(level1Map[selectedI][selectedJ]);
                        level1Map[selectedI][selectedJ].changeType(5);
                        while (sumBlocks.length > 0) {
                            sumBlocks[sumBlocks.length - 1].changeColor(level1Map[selectedI][selectedJ].getColor());
                            sumBlocks[sumBlocks.length - 1].changeType(5);
                            sumBlocks.pop();
                        }
                        resetMap1(level1Map);
                        console.log(level1Map);
                    }else{
                        resetMap1(level1Map);
                    }
                } else if ((selectedI == 2 && selectedJ == 0) || (selectedI == 2 && selectedJ == 2)
                || (selectedI == 3 && selectedJ == 2) || (selectedI == 3 && selectedJ == 4)) {
                    gameMode = 0;
                    resetPathMap1(level1Map);
                }

            } else {
                resetMap1Full(level1Map);
                setupLevel1Map(level1Map);
                gameMode = 0;
            }
            break;
    }
}


function createMap(m, t) {
    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[i].length; j++) {
            //console.log(m[i][j]);
            if (t[i][j] == 1) {
                m[i][j] = new Square(780 + (j * 120) + (j * 25), 217 + (i * 120) + (i * 25), "#D8A0FF", 120, 25, m[i][j], 1)
            } else if (t[i][j] == 2) {
                m[i][j] = new Square(780 + (j * 120) + (j * 25), 217 + (i * 120) + (i * 25), "#5B4A67", 120, 25, m[i][j], 2)
            } else if (t[i][j] == 3) {
                m[i][j] = new Square(780 + (j * 120) + (j * 25), 217 + (i * 120) + (i * 25), "#5B4A67", 120, 25, m[i][j], 3)
            }

        }
    }
    //console.log(m);
}


//Tutorial
function drawMap(m, screen) {

    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[i].length; j++) {
            m[i][j].drawSquare(screen);
            if (m[i][j].getType() == 2) {
                m[i][j].changeColor("#5B4A67");
            }
            if (gameMode == 0) {
                if (m[i][j].getType() == 1) {
                    m[i][j].increaseSize(screen);
                }
            } else {
                if (m[i][j].getType() == 4 || m[i][j].getType() == 3 || m[i][j].getType() == 1) {
                    m[i][j].increaseSize(screen);

                }

            }



        }
    }

    if (gameMode == 1) {
        if (720 < mouseX && mouseX < 1128 && 157 < mouseY && mouseY < 565) {
            selectedI = Math.floor((mouseY - 157) / 140);
            selectedJ = Math.floor((mouseX - 720) / 140);
            //console.log("previous: "+ pselectedI, pselectedJ + " current: "+selectedI, selectedJ);
            //console.log("current type: "+ instMap[selectedI][selectedJ].getType());
            if (selectedI != pselectedI || selectedJ != pselectedJ) {

                if (m[selectedI][selectedJ].getType() != 4) {

                    if (m[selectedI][selectedJ].getType() == 2) {
                        pselectedI = selectedI;
                        pselectedJ = selectedJ;
                        m[selectedI][selectedJ].increaseSize(screen);
                        m[selectedI][selectedJ].changeColor("#D8A0FF");
                        m[selectedI][selectedJ].changeType(4);
                        sumBlocks.push(m[selectedI][selectedJ]);
                        console.log(sumBlocks);
                    }

                    if (m[selectedI][selectedJ].getType() == 1) {
                        if (sumBlocks[0] == m[selectedI][selectedJ]) {
                            sumBlocks[sumBlocks.length - 1].changeType(2);
                            sumBlocks.pop();
                        }

                    }


                } else if (m[pselectedI][pselectedJ].getType() == 4) {
                    //reset to go back
                    console.log("previous: " + pselectedI, pselectedJ + " current: " + selectedI, selectedJ);
                    while (sumBlocks[sumBlocks.length - 1] != m[selectedI][selectedJ]) {
                        sumBlocks[sumBlocks.length - 1].changeType(2);
                        sumBlocks.pop();
                    }
                    console.log(sumBlocks);
                    pselectedI = selectedI;
                    pselectedJ = selectedJ;
                }



            }
            /*else{
                            if( m[selectedI][selectedJ].getType()==4){
                                pselectedI=selectedI;
                                pselectedJ=selectedJ;
                                m[pselectedI][pselectedJ].changeType(2);
                            }
                        }*/


        }
    }

    if (checkWin(m)) {
        pantalla++;
    }

}

function resetPathM1(m) {
    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[i].length; j++) {
            if (m[i][j].getType() == 4) {
                m[i][j].changeType(2);
            }
        }
    }
    if (m[0][1].getType() != 1) {
        m[0][1].changeType(1);
    }
    if (m[2][0].getType() != 1) {
        m[2][0].changeType(1);
    }

}

function resetMapTut(m) {
    gameMode = 0
    /*selectedI = 0;
    selectedJ = 0;

    pselectedI = 0;
    pselectedJ = 0;*/
    sumBlocks = [];
    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[i].length; j++) {
            if (m[i][j].getType() == 4) {
                m[i][j].changeType(2);
            }
        }
    }

    if (m[0][1].getType() != 1 && m[0][1].getType() != 5) {
        m[0][1].changeType(1);
    }
    if (m[2][0].getType() != 1 && m[2][0].getType() != 5) {
        m[2][0].changeType(1);
    }
}

function setupTutorialMap(m) {
    m[0][0].changeColor("#1BCEB4");
    m[0][2].changeColor("#EF891B");
}


//Level 1

function createMapLevel1(m, t) {
    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[i].length; j++) {
            //console.log(m[i][j]);
            if (t[i][j] == 1) {
                m[i][j] = new Square(443 + (j * 80) + (j * 17), 195 + (i * 80) + (i * 17), "#D8A0FF", 80, 15, m[i][j], 1)
            } else if (t[i][j] == 2) {
                m[i][j] = new Square(443 + (j * 80) + (j * 17), 195 + (i * 80) + (i * 17), "#5B4A67", 80, 15, m[i][j], 2)
            } else if (t[i][j] == 3) {
                m[i][j] = new Square(443 + (j * 80) + (j * 17), 195 + (i * 80) + (i * 17), "#5B4A67", 80, 15, m[i][j], 3)
            }

        }
    }
    //console.log(m);
}

function setupLevel1Map(m) {
    m[0][0].changeColor("#EF891B");
    m[3][0].changeColor("#96AC2C");
    m[4][0].changeColor("#D13D23");
    m[4][4].changeColor("#269A90");
}


function drawMapLevel1(m, screen) {

    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[i].length; j++) {
            m[i][j].drawSquare(screen);
            if (m[i][j].getType() == 2) {
                m[i][j].changeColor("#5B4A67");
            }
            if (gameMode == 0) {
                if (m[i][j].getType() == 1) {
                    m[i][j].increaseSize(screen);
                }
            } else {
                if (m[i][j].getType() == 4 || m[i][j].getType() == 3 || m[i][j].getType() == 1) {
                    m[i][j].increaseSize(screen);

                }

            }



        }
    }

    if (gameMode == 1) {
        if (405 < mouseX && mouseX < 875 && 160 < mouseY && mouseY < 630) {
            selectedI = Math.floor((mouseY - 155) / 97);
            selectedJ = Math.floor((mouseX - 403) / 97);
            //console.log("previous: "+ pselectedI, pselectedJ + " current: "+selectedI, selectedJ);
            //console.log("current type: "+ level1Map[selectedI][selectedJ].getType());
            if (selectedI != pselectedI || selectedJ != pselectedJ) {
                console.log("previous: "+ pselectedI, pselectedJ + " current: "+selectedI, selectedJ);
                console.log("current type: "+ level1Map[selectedI][selectedJ].getType());
                if (m[selectedI][selectedJ].getType() != 4) {

                    if (m[selectedI][selectedJ].getType() == 2) {
                        pselectedI = selectedI;
                        pselectedJ = selectedJ;
                        m[selectedI][selectedJ].increaseSize(screen);
                        m[selectedI][selectedJ].changeColor("#D8A0FF");
                        m[selectedI][selectedJ].changeType(4);
                        sumBlocks.push(m[selectedI][selectedJ]);
                        console.log(sumBlocks);
                    }

                    if (m[selectedI][selectedJ].getType() == 1) {
                        if (sumBlocks[0] == m[selectedI][selectedJ]) {
                            sumBlocks[sumBlocks.length - 1].changeType(2);
                            sumBlocks.pop();
                        }

                    }


                } else if (m[pselectedI][pselectedJ].getType() == 4) {
                    //reset to go back
                    console.log("previous: " + pselectedI, pselectedJ + " current: " + selectedI, selectedJ);
                    while (sumBlocks[sumBlocks.length - 1] != m[selectedI][selectedJ]) {
                        sumBlocks[sumBlocks.length - 1].changeType(2);
                        sumBlocks.pop();
                    }
                    console.log(sumBlocks);
                    pselectedI = selectedI;
                    pselectedJ = selectedJ;
                }



            }
            /*else{
                            if( m[selectedI][selectedJ].getType()==4){
                                pselectedI=selectedI;
                                pselectedJ=selectedJ;
                                m[pselectedI][pselectedJ].changeType(2);
                            }
                        }*/


        }
    }

    if (checkWin(m)) {
        pantalla++;
    }

}
 

function resetMap1(m) {
    gameMode = 0
    /*selectedI = 0;
    selectedJ = 0;

    pselectedI = 0;
    pselectedJ = 0;*/
    sumBlocks = [];
    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[i].length; j++) {
            if (m[i][j].getType() == 4) {
                m[i][j].changeType(2);
            }
        }
    }

    if (m[2][0].getType() != 1 && m[2][0].getType() != 5) {
        m[2][0].changeType(1);
    }
    if (m[2][2].getType() != 1 && m[2][2].getType() != 5) {
        m[2][2].changeType(1);
    }
    if (m[3][2].getType() != 1 && m[3][2].getType() != 5) {
        m[3][2].changeType(1);
    }
    if (m[3][4].getType() != 1 && m[3][4].getType() != 5) {
        m[3][4].changeType(1);
    }
}


function resetMap1Full(m) {
    gameMode = 0
    /*selectedI = 0;
    selectedJ = 0;

    pselectedI = 0;
    pselectedJ = 0;*/
    sumBlocks = [];
    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[i].length; j++) {
            if (m[i][j].getType() == 4 || m[i][j].getType() == 5) {
                m[i][j].changeType(2);
            }
        }
    }

    if (m[2][0].getType() != 1) {
        m[2][0].changeColor("#D8A0FF");
        m[2][0].changeType(1);
    }
    if (m[2][2].getType() != 1) {
        m[2][2].changeColor("#D8A0FF");
        m[2][2].changeType(1);
    }
    if (m[3][2].getType() != 1) {
        m[3][2].changeColor("#D8A0FF");
        m[3][2].changeType(1);
    }
    if (m[3][4].getType() != 1) {
        m[3][4].changeColor("#D8A0FF");
        m[3][4].changeType(1);
    }

    if (m[0][0].getType() != 3) {
        m[0][0].changeType(3);
    }
    if (m[3][0].getType() != 3) {
        m[2][0].changeType(3);
    }
    if (m[4][0].getType() != 3) {
        m[4][0].changeType(3);
    }
    if (m[4][4].getType() != 3) {
        m[4][4].changeType(3);
    }
}

function resetPathMap1(m) {
    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[i].length; j++) {
            if (m[i][j].getType() == 4) {
                m[i][j].changeType(2);
            }
        }
    }
    if (m[2][0].getType() != 1 && m[2][0].getType() != 5) {
        m[2][0].changeType(1);
    }
    if (m[2][2].getType() != 1 && m[2][2].getType() != 5) {
        m[2][2].changeType(1);
    }
    if (m[3][2].getType() != 1 && m[3][2].getType() != 5) {
        m[3][2].changeType(1);
    }
    if (m[3][4].getType() != 1 && m[3][4].getType() != 5) {
        m[3][4].changeType(1);
    }
}

function checkWin(m) {
    let win = true;
    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[i].length; j++) {
            if (m[i][j].getType() != 5) {
                win = false;
            }
        }
    }

    return win;
}