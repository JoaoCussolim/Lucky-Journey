class Button {
    constructor({ txtType, color, color2, size, position, text, source, border, borderColor, effect, originalSz }) {
        this.txtType = txtType;
        this.colorUsed = color;
        this.color = color;
        this.color2 = color2
        this.size = size;
        this.position = position;
        this.text = text;
        this.border = border;
        this.effect = effect;
        this.originalSz = originalSz;
        this.mouseOn;
        if (borderColor == undefined) {
            this.borderColor = "black";
        } else this.borderColor = borderColor;
        if (!txtType) {
            this.img = new Image();
            this.img.src = source;
        }
    }

    draw() {
        //if its a txt type button
        if (this.txtType) {

            //border
            ctx.fillStyle = this.borderColor;
            ctx.fillRect(this.position.x - this.border, this.position.y - this.border, this.size.w + this.border * 2, this.size.h + this.border * 2);

            //main
            ctx.fillStyle = this.colorUsed;
            ctx.fillRect(this.position.x, this.position.y, this.size.w, this.size.h);
            ctx.fillStyle = this.text.color;
            ctx.font = this.text.size + 'px Pixeloid';
            ctx.fillText(this.text.writing, this.position.x + this.size.w / 2, (this.position.y + this.size.h / 2) + this.text.size /3);
        }
        //if its img type button
        else {
            //border
            ctx.fillStyle = this.borderColor;
            ctx.fillRect(this.position.x - this.border, this.position.y - this.border, this.size.w + this.border * 2, this.size.h + this.border * 2);

            //main
            ctx.drawImage(this.img, this.position.x, this.position.y, this.size.w, this.size.h);
        }
    }

    verifyMouse() {
        //if its a txt type button
        if (this.txtType) {

            //verify if mouse on button
            if (isInsideButton({ x: this.position.x, y: this.position.y, width: this.size.w, height: this.size.h })) {
                //do if mouse on button
                this.colorUsed = this.color2;
                this.mouseOn = true;

            }


            else {
                //do if mouse not on button
                this.colorUsed = this.color;
                this.mouseOn = false;
            }


        }
        //if its a img type button
        else {
            //verify if mouse on button
            if (isInsideButton({ x: this.position.x, y: this.position.y, width: this.size.w, height: this.size.h })) {
                //do if mouse on button
                if (this.size.w < this.effect.w) {
                    this.size.w += (this.effect.w - this.originalSz.w)/10;
                    this.position.x -= (this.effect.w - this.originalSz.w)/20;
                }

                if (this.size.h < this.effect.h) {
                    this.size.h += (this.effect.h - this.originalSz.h)/10;
                    this.position.y -= (this.effect.h - this.originalSz.h)/20;
                }
                this.mouseOn = true;

            }

            else {
                //do if mouse not on button
                if (this.size.w > this.originalSz.w) {
                    this.size.w -= (this.effect.w - this.originalSz.w)/10;
                    this.position.x += (this.effect.w - this.originalSz.w)/20;
                }

                if (this.size.h > this.originalSz.h) {
                    this.size.h -= (this.effect.h - this.originalSz.h)/10;
                    this.position.y += (this.effect.h - this.originalSz.h)/20;
                }
                this.mouseOn = false;
            }

        }

    }


    update() {
        this.draw();
        this.verifyMouse();
    }


}


let button = new Button({
    txtType: false,
    color: 'white',
    color2: 'rgb(200,200,200',
    position: { x: 130, y: 200 },
    size: { w: 150, h: 150 },
    originalSz: { w: 150, h: 150 },
    border: 5,
    text: { writing: 'Click me', size: 30, color: "black" },
    source: "./assets/teste.png",
    effect: { w: 200, h: 200 },

});

let playbtn = new Button({
    txtType: true,
    color: 'white',
    color2: 'rgb(200,200,200',
    position: { x: window.innerWidth/2 - 150, y: window.innerHeight/4 },
    size: { w: 300, h: 100 },
    originalSz: { w: 150, h: 150 },
    border: 5,
    text: { writing: 'PLAY', size: 70, color: "black" },
})


let controlsbtn = new Button({
    txtType: true,
    color: 'white',
    color2: 'rgb(200,200,200',
    position: { x: window.innerWidth/2 - 150, y: window.innerHeight/2 },
    size: { w: 300, h: 100 },
    originalSz: { w: 150, h: 150 },
    border: 5,
    text: { writing: 'CONTROLS', size: 50, color: "black" },
})

let creditsbtn = new Button({
    txtType: true,
    color: 'white',
    color2: 'rgb(200,200,200',
    position: { x: window.innerWidth/2 - 150, y: window.innerHeight/1.325 },
    size: { w: 300, h: 100 },
    originalSz: { w: 150, h: 150 },
    border: 5,
    text: { writing: 'CREDITS', size: 60, color: "black" },
})










