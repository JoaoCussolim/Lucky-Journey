function RandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


let characterSelection = () => {
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgb(235, 178, 80)";
    ctx.fillRect(30, 30, canvas.width - 60, canvas.height - 60);
    ctx.fillStyle = "black";
    ctx.font = "50px Pixeloid";
    ctx.textAlign = "center";
    ctx.fillText("Escolha Seu Personagem", canvas.width / 2, 100)
    ctx.font = "25px Pixeloid";
    ctx.fillText("Mago", 200, 700)
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
    playbtn.update();
    controlsbtn.update();
    creditsbtn.update();

    if (played) playedClicked_UI();
}

let played = false;
let alphaColor = 0

let playedClicked_UI = () => {
    ctx.fillStyle = `rgba(255,255,255,${alphaColor})`
    ctx.fillRect(0, 0, innerWidth, innerHeight)
    alphaColor += 0.01
    if (alphaColor >= 1.5) started = true

}