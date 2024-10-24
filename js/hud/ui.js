function RandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

let nameSelect = () => {
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const boxPadding = 30;
    const boxWidth = canvas.width - boxPadding * 2;
    const boxHeight = canvas.height - boxPadding * 2;

    ctx.fillStyle = "rgba(46, 70, 89, 1)";
    ctx.fillRect(boxPadding, boxPadding, boxWidth, boxHeight);

    ctx.fillStyle = "rgba(237, 172, 74, 1)";
    ctx.font = "50px Pixeloid";
    ctx.textAlign = "center";
    ctx.fillText("Qual o seu Nome?", canvas.width / 2, boxPadding + 70);

    const inputBoxWidth = boxWidth * 0.75;
    const inputBoxHeight = 100;
    const inputBoxX = canvas.width / 2 - inputBoxWidth / 2;
    const inputBoxY = canvas.height / 2 - inputBoxHeight / 2 - 150;

    ctx.strokeStyle = 'rgb(237, 172, 74)';
    ctx.lineWidth = 10;
    ctx.strokeRect(inputBoxX, inputBoxY, inputBoxWidth, inputBoxHeight);
    ctx.fillStyle = 'rgb(94, 120, 140)';
    ctx.fillRect(inputBoxX, inputBoxY, inputBoxWidth, inputBoxHeight);

    ConfirmButton.update();
}

let newItemAdded = false;
let newItemText = ''



let characterSelection = () => {
    // Estilos e retângulos de fundo
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    ctx.fillStyle = "rgba(46, 70, 89, 1)";
    const boxWidth = window.innerWidth - 60;
    const boxHeight = window.innerHeight - 60;
    ctx.fillRect(30, 30, boxWidth, boxHeight);

    // Título
    ctx.fillStyle = "rgba(237, 172, 74, 1)";
    ctx.font = "50px Pixeloid";
    ctx.textAlign = "center";
    ctx.fillText("Escolha Seu Personagem", window.innerWidth / 2, 100);

    // Nomes dos personagens
    const characterNames = ["Mago", "Clérigo", "Arqueiro", "Guerreiro"];
    const baseX = window.innerWidth / 5;
    const baseY = 700;
    const spacing = 300; // Espaçamento entre os personagens

    characterNames.forEach((name, index) => {
        ctx.fillText(name, baseX + (index * spacing), baseY);
    });

    // Atualiza os botões
    mageButton.update();
    clericButton.update();
    ArqueiroButton.update();
    GuerreiroButton.update();
};

let potionsFrame = () => {
    const backgroundImage = new Image();
    const potionImage = new Image();
    const actualPotion = potions[potionIndex];
    
    backgroundImage.src = './assets/ui/potionsFrame.png';
    potionImage.src = actualPotion.source;
    
    // Fixed pixel values for positions and sizes
    let posX = 50; // Offset for horizontal positioning
    let posY = -80; // Offset for vertical positioning
    
    let largeFrameWidth = 150; // Fixed size for the large frame
    let largeFrameHeight = 200;
    
    let smallFrameWidth = 75; // Fixed size for the small frames
    let smallFrameHeight = 100;

    // Draw the large background frame
    ctx.drawImage(backgroundImage, window.innerWidth - 200 - posX, window.innerHeight - 300 - posY, largeFrameWidth, largeFrameHeight);
    
    // Draw the two small background frames
    ctx.drawImage(backgroundImage, window.innerWidth - 275 - posX, window.innerHeight - 250 - posY, smallFrameWidth, smallFrameHeight);
    ctx.drawImage(backgroundImage, window.innerWidth - 50 - posX, window.innerHeight - 250 - posY, smallFrameWidth, smallFrameHeight);
    
    // Set text properties (fixed font size)
    ctx.fillStyle = "white";
    ctx.font = "50px Pixeloid"; // Fixed font size
    ctx.textAlign = "center";
    
    // Draw the potion control labels (A, D, W)
    ctx.fillText('A', window.innerWidth - 235 - posX, window.innerHeight - 180 - posY);
    ctx.fillText('D', window.innerWidth - 10 - posX, window.innerHeight - 180 - posY);
    ctx.fillText('W', window.innerWidth - 120 - posX, window.innerHeight - 110 - posY);
    
    // Smaller font for potion quantity
    ctx.font = "30px Pixeloid"; // Fixed smaller font size for quantity
    ctx.fillText(actualPotion.quantity + 'x', window.innerWidth - 125 - posX, window.innerHeight - 260 - posY, 60);
    
    // Draw the potion image
    ctx.drawImage(potionImage, window.innerWidth - 165 - posX, window.innerHeight - 245 - posY, 80, 80);
};



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