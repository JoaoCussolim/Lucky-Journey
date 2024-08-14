let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let background = new Image();
background.src = "./assets/background.png"

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let scale = 4

let scaledCanvas = {
    width: canvas.width/scale,
    height: canvas.height/scale
}

let backgroundPositions = {
    x: 0,
    y: 0
}

let dice = new Dice({
    sides: 20
});

let animate = () => {
    requestAnimationFrame(animate)
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(scale, scale);
    ctx.translate(0, -scaledCanvas.width - 100);
    ctx.drawImage(background, backgroundPositions.x, backgroundPositions.y, canvas.width, canvas.height);
    ctx.restore();


    player.update();
    //dice.update();
    //testEnemy.update();
};

setTimeout(() => {
    animate();
}, 500);