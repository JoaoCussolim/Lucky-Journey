let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let background = new Image();
background.src = "./assets/background.png"

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



let scale = 4

let scaledCanvas = {
    width: canvas.width / scale,
    height: canvas.height / scale
}

let backgroundPositions = {
    x: 0,
    y: 0
}

let backgroundVelocity = {
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

    getMouseAngle();

    for (let i = projectiles.length - 1; i >= 0; i--) {
        projectile = projectiles[i]
        projectile.update()
        console.log(projectile)
        if (projectile.shouldRemove) projectiles.splice(i, 1)
    }

    player.update();

    for(let i = enemies.length - 1; i >= 0; i--){
        enemy = enemies[i]
        enemy.update()
    }
    //dice.update();

    //characterSelection();
    //button.update();
};

setTimeout(() => {
    animate();
}, 500);