let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let background = new Image();
background.src = "./assets/background.png"

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let backgroundPositions = {
    x: 0,
    y: 0
}

let backgroundVelocity = {
    x: 0,
    y: 0
}

let started = false
let SPnum1 = new SpinningNumber({x:400,y:400},"P",50,400)
let SPnum2 = new SpinningNumber({x:475,y:400},"L",50,400)
let SPnum3 = new SpinningNumber({x:550,y:400},"A",50,400)
let SPnum4 = new SpinningNumber({x:625,y:400},"Y",50,400)
let SPnum5 = new SpinningNumber({x:700,y:400},"!",50,400)


let spawnedEnemies = false;
let canSpawnEnemies = false;

let fps = 60;
let frameInterval = 1000 / fps;
let deltaTime_Mult = 1;
let deltaTime = 0;
let lastTime = performance.now();

let menu = (currentTime) => {
    deltaTime = (currentTime - lastTime);
    deltaTime_Mult = deltaTime / frameInterval;

    ctx.imageSmoothingEnabled = false;
    ctx.textAlign = 'center';


    mainMenu();
    SPnum1.update()
    SPnum2.update()
    SPnum3.update()
    SPnum4.update()
    SPnum5.update()

    lastTime = currentTime;


    let frame = requestAnimationFrame(menu);
    if (started) {
        cancelAnimationFrame(frame);
        requestAnimationFrame(game);
    }
}

let game = (currentTime) => {
    deltaTime = (currentTime - lastTime);
    deltaTime_Mult = deltaTime / frameInterval;

    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawInfiniteGrid();

    getMouseAngle();

    for (let i = projectiles.length - 1; i >= 0; i--) {
        projectile = projectiles[i];
        projectile.update();
        if (enemies.length > 0) {
            let hittedEnemies = enemies.filter(enemy => {
                return projectile.hitbox.position.x + projectile.hitbox.dimensions.width >= enemy.hitbox.position.x
                    && projectile.hitbox.position.x <= enemy.hitbox.position.x + enemy.hitbox.dimensions.width
                    && projectile.hitbox.position.y + projectile.hitbox.dimensions.height >= enemy.hitbox.position.y
                    && projectile.hitbox.position.y <= enemy.hitbox.position.y + enemy.hitbox.dimensions.height
            });
            if (hittedEnemies.length > 0) {
                for (let i = hittedEnemies.length - 1; i >= 0; i--) {
                    hittedEnemies[i].receivingDamage(projectile.damage);
                };
            };
        };
        if (projectile.shouldRemove) projectiles.splice(i, 1);
    };

    player.update();
    testNpc.draw();
    if (dialogActive) actualDialogBox.draw()
    if (canvasPromptActive) loadCanvasPrompt()


    for (let i = enemies.length - 1; i >= 0; i--) {
        enemy = enemies[i];
        enemy.update();
    };
    dice.update();


    if (dice.rolling) canSpawnEnemies = true;

    if (!dice.rolling && canSpawnEnemies) {
        spawnedEnemies = false;
        canSpawnEnemies = false;
    }

    if (!spawnedEnemies && dice.rolledNumber != 0) {
        makeEnemies(dice.rolledNumber);
        spawnedEnemies = true;
    };




    // characterSelection();
    // button.update();

    lastTime = currentTime;
    requestAnimationFrame(game);
};

setTimeout(() => {
    menu();
}, 500);

