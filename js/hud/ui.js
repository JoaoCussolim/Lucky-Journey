function RandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

let nameSelect = () => {
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(46, 70, 89, 1)";
    ctx.fillRect(30, 30, canvas.width - 60, canvas.height - 60);
    ctx.fillStyle = "rgba(237, 172, 74, 1)";
    ctx.font = "50px Pixeloid";
    ctx.textAlign = "center";
    ctx.fillText("Qual o seu Nome?", canvas.width / 2, 100);
    ctx.strokeStyle = 'rgb(237, 172, 74)'
    ctx.rect(200, 200, canvas.width / 1.25, 100)
    ctx.lineWidth = 10
    ctx.stroke();
    ctx.fillStyle = 'rgb(94, 120, 140)'
    ctx.fillRect(200, 200, canvas.width / 1.25, 100)



    ConfirmButton.update();

}


let characterSelection = () => {
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(46, 70, 89, 1)";
    ctx.fillRect(30, 30, canvas.width - 60, canvas.height - 60);
    ctx.fillStyle = "rgba(237, 172, 74, 1)";
    ctx.font = "50px Pixeloid";
    ctx.textAlign = "center";
    ctx.fillText("Escolha Seu Personagem", canvas.width / 2, 100);
    ctx.font = "50px Pixeloid";
    ctx.fillText("Mago", 225, 700);
    ctx.fillText("Clérigo", 650, 700);
    ctx.fillText("Arqueiro", 1150, 700);
    ctx.fillText("Guerreiro", 1600, 700);

    mageButton.update();
    clericButton.update();
    ArqueiroButton.update();
    GuerreiroButton.update();
}


backgroundColor = RandomInt(1, 4)

let mainMenu = () => {
    switch (backgroundColor) {
        case 1:
            ctx.fillStyle = "rgb(255, 253, 74)";
            break;

        case 2:
            ctx.fillStyle = "pink";
            break;

        case 3:
            ctx.fillStyle = "lightblue"
            break;

        case 4:
            ctx.fillStyle = "lightgreen";
            break;
    }


    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(canvas.width / 2 - 250, canvas.height / 2 - 300, 500, 300)
    ctx.fillStyle = 'black';
    SPnum1.update();
    SPnum2.update();
    SPnum3.update();
    SPnum4.update();
    SPnum5.update();
    SlotMachine.update();
    if (!played) {
        playbtn.update();
        controlsbtn.update();
        creditsbtn.update();
    }
    if (played) playedClicked_UI();
}

let played = false;
let alphaColor = 0


let pushStoped = false;

let playedClicked_UI = () => {
    if (SlotMachine.currentFrame == 11) {
        SlotMachine.switchSprite("Idle");
        pushStoped = true;
    }
    if (pushStoped) {
        SPnum1.stop()
        SPnum2.stop()
        SPnum3.stop()
        SPnum4.stop()
        SPnum5.stop()
    }


    if (SPnum5.stoped) {
        ctx.fillStyle = `rgba(255,255,255,${alphaColor})`
        ctx.fillRect(0, 0, innerWidth, innerHeight)
        alphaColor += 0.01
        if (alphaColor >= 1.5) started = true
    }

}

let deathScreen = () => {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'white';
    ctx.font = '100px Tales';
    ctx.fillText('VOCÊ   MORREU!', canvas.width / 2, canvas.height / 2)
}