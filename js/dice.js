class Dice{
    constructor({ sides, addiction, pos = { x: (window.innerWidth / 2) - 100, y: (window.innerHeight / 2) - 100 } }) {
        this.sides = sides;
        this.numberDisplay = 0;
        this.pos = { x: (window.innerWidth / 2) - 100, y: (window.innerHeight / 2) - 100 };
        this.rolling = true;
        this.rollInterval = 0;
        this.rollTimer = this.rollInterval;
        this.rolledNumber = 0;
        this.addiction = addiction;
    };

    draw() {
        ctx.textBaseline = 'alphabetic'
        ctx.textAlign = "center"
        ctx.fillStyle = 'black';
        ctx.fillRect(this.pos.x, this.pos.y, 100, 100);
        ctx.fillStyle = 'white';
        ctx.font = "50px Pixeloid";
        ctx.fillText(this.numberDisplay, this.pos.x + 50, this.pos.y + 65);
    };

    update() {
        this.draw();
        this.roll();
    };

    roll() {
        if (this.rolling) {
            if (this.rollInterval < 35) {
                if (this.rollTimer === 0) {
                    this.numberDisplay = RandomInt(1, this.sides);
                    this.rollTimer = this.rollInterval;
                    this.rollInterval += 2;
                } else {
                    this.rollTimer -= 1;
                }
            } else {
                if (this.addiction != undefined) {
                    if (RandomInt(1, this.addiction.rate) != 1) {
                        this.numberDisplay = this.addiction.number
                    }
                }
                this.rolledNumber = this.numberDisplay;
                this.rolling = false;
                this.rollInterval = 0;
                this.rollTimer = 0;
            };
        };
    };
};


let dice = new Dice({
    sides: 20,
    pos: { x: 600, y: 200 },



});
