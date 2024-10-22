class Button {
    constructor({ txtType, color, color2, size, position, text, source, border, borderColor, effect, originalSz,backgroundColor }) {
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
        this.backgroundColor = backgroundColor;
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
            ctx.fillText(this.text.writing, this.position.x + this.size.w / 2, (this.position.y + this.size.h / 2) + this.text.size / 3);
        }
        //if its img type button
        else {
            //border
            ctx.fillStyle = this.borderColor;
            drawBorder(this.position.x,this.position.y,this.size.w,this.size.h,this.border,this.borderColor)


            //main
            ctx.fillStyle = this.backgroundColor;
            ctx.fillRect(this.position.x,this.position.y,this.size.w,this.size.h)
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
                    this.size.w += (this.effect.w - this.originalSz.w) / 10;
                    this.position.x -= (this.effect.w - this.originalSz.w) / 20;
                }

                if (this.size.h < this.effect.h) {
                    this.size.h += (this.effect.h - this.originalSz.h) / 10;
                    this.position.y -= (this.effect.h - this.originalSz.h) / 20;
                }
                this.mouseOn = true;

            }

            else {
                //do if mouse not on button
                if (this.size.w > this.originalSz.w) {
                    this.size.w -= (this.effect.w - this.originalSz.w) / 10;
                    this.position.x += (this.effect.w - this.originalSz.w) / 20;
                }

                if (this.size.h > this.originalSz.h) {
                    this.size.h -= (this.effect.h - this.originalSz.h) / 10;
                    this.position.y += (this.effect.h - this.originalSz.h) / 20;
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


let mageButton = new Button({
    txtType: false,
    position: { x: 130, y: 300 },
    size: { w: 200, h: 200 },
    originalSz: { w: 200, h: 200 },
    border: 5,
    source: "./assets/mage/menu/icon.png",
    effect: { w: 220, h: 220 },
    borderColor: 'rgba(237, 172, 74, 1)',
    backgroundColor: 'rgba(67, 93, 115, 1)'

});

let clericButton = new Button({
    txtType: false,
    position: { x: 550, y: 300 },
    size: { w: 200, h: 200 },
    originalSz: { w: 200, h: 200 },
    border: 5,
    source: "./assets/cleric/menu/forward.png",
    effect: { w: 220, h: 220 },
    borderColor: 'rgba(237, 172, 74, 1)',
    backgroundColor: 'rgba(67, 93, 115, 1)'
});

let ArqueiroButton = new Button({
    txtType: false,
    position: { x: 1050, y: 300 },
    size: { w: 200, h: 200 },
    originalSz: { w: 200, h: 200 },
    border: 5,
    source: "./assets/archer/idle/forward.png",
    effect: { w: 220, h: 220 },
    borderColor: 'rgba(237, 172, 74, 1)',
    backgroundColor: 'rgba(67, 93, 115, 1)'

});

let GuerreiroButton = new Button({
    txtType: false,
    position: { x: 1500, y: 300 },
    size: { w: 200, h: 200 },
    originalSz: { w: 200, h: 200 },
    border: 5,
    source: "./assets/warrior/idle/forward.png",
    effect: { w: 220, h: 220 },
    borderColor: 'rgba(237, 172, 74, 1)',
    backgroundColor: 'rgba(67, 93, 115, 1)'

});

let ConfirmButton = new Button({
    txtType: true,
    text: { writing: 'CONFIRM', size: 50, color: "black" },
    position: { x: 1500, y: 350 },
    size: { w: 300, h: 100 },
    border: 5,
    borderColor: 'rgba(237, 172, 74, 1)',
    backgroundColor: 'rgba(67, 93, 115, 1)',
    color: 'rgb(94, 120, 140)',
    color2: 'rgb(84, 110, 130)'

});



let playbtn = new Button({
    txtType: true,
    color: 'white',
    color2: 'rgb(200,200,200',
    position: { x: window.innerWidth / 2 - 150, y: window.innerHeight / 4 },
    size: { w: 300, h: 100 },
    originalSz: { w: 150, h: 150 },
    border: 5,
    text: { writing: 'PLAY', size: 70, color: "black" },
})


let controlsbtn = new Button({
    txtType: true,
    color: 'white',
    color2: 'rgb(200,200,200',
    position: { x: window.innerWidth / 2 - 150, y: window.innerHeight / 2 },
    size: { w: 300, h: 100 },
    originalSz: { w: 150, h: 150 },
    border: 5,
    text: { writing: 'CONTROLS', size: 50, color: "black" },
})

let creditsbtn = new Button({
    txtType: true,
    color: 'white',
    color2: 'rgb(200,200,200',
    position: { x: window.innerWidth / 2 - 150, y: window.innerHeight / 1.325 },
    size: { w: 300, h: 100 },
    originalSz: { w: 150, h: 150 },
    border: 5,
    text: { writing: 'CREDITS', size: 60, color: "black" },
})










