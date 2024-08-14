class Dice {
    constructor({ sides }) {
        this.sides = sides;
        this.numberDisplay = 0;
        this.pos = { x: (window.innerWidth / 2) - 100, y: (window.innerHeight / 2) - 100 };
        this.rollable = true;
        this.rollInterval = 0;
        this.rollTimer = this.rollInterval;
        this.rolledNumber = 0;
    };

    draw() {
        ctx.textAlign = "center"
        ctx.fillStyle = 'black';
        ctx.fillRect(this.pos.x, this.pos.y, 100, 100);
        ctx.fillStyle = 'white';
        ctx.font = "50px Arial";
        ctx.fillText(this.numberDisplay, this.pos.x + 50, this.pos.y + 65);
    };

    update() {
        this.draw();
        this.roll();
    };

    roll() {
        if(this.rollable){
        if (this.rollInterval < 35) {
            if (this.rollTimer === 0) {
                this.numberDisplay = RandomInt(1, this.sides);
                this.rollTimer = this.rollInterval;
                this.rollInterval += 2;
            } else {
                this.rollTimer -= 1;
            }
        } else{
            this.rolledNumber = this.numberDisplay;
            this.rollable = false;
            this.rollInterval = 0;
            this.rollTimer = 0;
        };
    };
    };
};