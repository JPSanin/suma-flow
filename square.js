class Square {
    constructor(posx, posy, color, size, round, number, type) {

        /* Types
        1 is for start 
        2 is for normal square
        3 is for end square
        4 is for in progress
        5 is for completed
        */
        this.posx = posx;
        this.posy = posy;
        this.size = size;
        this.round = round;
        this.color = color;
        this.type = type;
        this.number = number;
    }

    increaseSize(map) {
        if(map==2){
            if (this.posx-60 < mouseX && mouseX < this.posx-60+this.size && this.posy-60 < mouseY && mouseY < this.posy-60+this.size) {
                this.size=130;
            }else{
                this.size=120;
            }
        }

        if(map==4){
            if (this.posx-40 < mouseX && mouseX < this.posx-40+this.size && this.posy-40 < mouseY && mouseY < this.posy-40+this.size) {
                this.size=90;
            }else{
                this.size=80;
            }
        }

    }

    drawSquare(map) {

        if (map == 2) {
            rectMode(CENTER);
            //Color
            fill(this.color);
            noStroke();
            square(this.posx, this.posy, this.size, this.round);

            //Text
            fill(255);
            textFont(nunito);

            if (this.number == 0) {
                fill("#483B51");
            }

            textSize(this.size / 2);
            if (this.number >= 10) {
                text(this.number, this.posx-this.size / 2 + 25, this.posy + 20);
            } else {
                text(this.number, this.posx -this.size / 2 + 45.5, this.posy + 20);
            }

        }

        if(map==4){
            rectMode(CENTER);
            //Color
            fill(this.color);
            noStroke();
            square(this.posx, this.posy, this.size, this.round);

            //Text
            fill(255);
            textFont(nunito);

            if (this.number == 0) {
                fill("#483B51");
            }

            textSize(this.size / 2);
            if (this.number >= 10) {
                text(this.number, this.posx-this.size / 2 + 15, this.posy + 15);
            } else {
                text(this.number, this.posx -this.size / 2 + 31, this.posy + 15);
            } 
        }

    }

    changeColor(color) {
        this.color=color;
    }

    changeType(type){
        this.type=type;
    }

    getPosx() {
        return this.posx;
    }

    getPosy() {
        return this.posy;
    }
    getSize() {
        return this.size;
    }

    getNumber() {
        return this.number;
    }

    getType() {
        return this.type;
    }

    getColor() {
        return this.color;
    }
}