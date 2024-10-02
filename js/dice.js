class Dice extends AnimatedSprite {
    constructor({ position = { x: 0, y: 0 }, source, frameRate = 1, frameBuffer = 3, scale = 1, animations = [], sides, addiction }) {
        super({ position, source, frameRate, frameBuffer, scale, animations });
        this.sides = sides;
        this.numberDisplay = -1;
        this.pos = position;
        this.rolling = true;
        this.rollInterval = 100;
        this.rollTimer = 100
        this.rolledNumber = 0;
        this.addiction = addiction;
        this.doAction = false;
    };

    roll() {
        if (this.rolling) {
            this.switchSprite('roll');
            if (this.rollTimer > 0) this.rollTimer--;
            else {
                if (this.rollTimer > -1) {
                    this.switchSprite('idle');
                    this.rolledNumber = RandomInt(1, this.sides)

                    if (this.addiction != undefined) {
                        if (RandomInt(1, this.addiction.rate) != 1) {
                            this.rolledNumber = this.addiction.number
                        }
                    }

                    this.numberDisplay = this.rolledNumber;
                    this.rollTimer--;
                }
                this.switchSprite('idle');
                if (this.rollInterval > 0) this.rollInterval--;
                else {
                    this.rolling = false;
                    this.doAction = true;
                    this.rollInterval = 100;
                    this.rollTimer = 100;
                    this.rolledNumber = -1
                }


            };

        };
    };


    draw() {
        if (!this.image) return;


        let cropbox = {
            position: {
                x: this.currentFrame * (this.image.width / this.frameRate),
                y: 0
            },
            width: this.image.width / this.frameRate,
            height: this.image.height
        };
        if (this.rolling) {
            ctx.drawImage(this.image, cropbox.position.x, cropbox.position.y, cropbox.width, cropbox.height, this.position.x, this.position.y, this.width, this.height)

            if (this.rolledNumber == this.numberDisplay) {
                ctx.textAlign = 'center';
                ctx.textBaseline = 'alphabetic'
                ctx.fillStyle = 'white';
                textSize(30);
                ctx.fillText(this.numberDisplay, this.position.x + 285, this.position.y + 140)
            }
        }

    }


    update() {
        this.draw()
        this.updateFrames()
        this.roll()
    }


};





let dice = new Dice({
    sides: 20,
    position: { x: 700, y: 200 },
    frames: 1,
    addiction: {rate:1000, number:1},
    frameRate: 1,
    frameBuffer: 1,
    scale: 1,
    source: "./assets/ui/dice/DiceSprite-stoped.png",
    addiction: { rate: 0, number: 10 },
    animations: {
        idle: {
            source: "./assets/ui/dice/DiceSprite-stoped.png",
            frameBuffer: 1,
            frameRate: 1,
            image: new Image()
        },

        roll: {
            source: "./assets/ui/dice/DiceSprite.png",
            frameBuffer: 3,
            frameRate: 12,
        }
    }



});

