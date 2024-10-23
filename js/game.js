let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let background = new Image();
background.src = "./assets/background.png"

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let playerName;

let backgroundPositions = {
    x: 0,
    y: 0
};

let newItemCooldown = 0;

let inCharacterSelect = false;
let inNameSelect = true;

let backgroundVelocity = {
    x: 0,
    y: 0,
}

let backgroundLocked = false

let started = false;
let SPnum1 = new SpinningNumber({
    pos: { x: canvas.width / 2 - 205, y: canvas.height / 2 - 350 },
    finalValue: "P",
    size: 50,
    restartY: canvas.height / 2 - 350,
    stopY: canvas.height / 2 - 70,
    limit: canvas.height / 2 + 100,
    delay: 50,
});

let SPnum2 = new SpinningNumber({
    pos: { x: canvas.width / 2 - 105, y: canvas.height / 2 - 350 },
    finalValue: "L",
    size: 50,
    restartY: canvas.height / 2 - 350,
    stopY: canvas.height / 2 - 70,
    limit: canvas.height / 2 + 100,
    delay: 100,
});

let SPnum3 = new SpinningNumber({
    pos: { x: canvas.width / 2 - 5, y: canvas.height / 2 - 350 },
    finalValue: "A",
    size: 50,
    restartY: canvas.height / 2 - 350,
    stopY: canvas.height / 2 - 70,
    limit: canvas.height / 2 + 100,
    delay: 150,
});

let SPnum4 = new SpinningNumber({
    pos: { x: canvas.width / 2 + 95, y: canvas.height / 2 - 350 },
    finalValue: "Y",
    size: 50,
    restartY: canvas.height / 2 - 350,
    stopY: canvas.height / 2 - 70,
    limit: canvas.height / 2 + 100,
    delay: 200
});

let SPnum5 = new SpinningNumber({
    pos: { x: canvas.width / 2 + 195, y: canvas.height / 2 - 350 },
    finalValue: "!",
    size: 50,
    restartY: canvas.height / 2 - 350,
    stopY: canvas.height / 2 - 70,
    limit: canvas.height / 2 + 100,
    delay: 250,
});



let spawnedEnemies = false;
let canSpawnEnemies = false;


let fps = 60;
let frameInterval = 1000 / fps;
let deltaTime_Mult = 1;
let deltaTime = 0;
let lastTime = performance.now();

let SlotMachine = new AnimatedSprite({
    position: { x: canvas.width / 2 - 1010, y: canvas.height / 2 - 530 },
    size: { width: 200, height: 200 },
    frames: 1,
    frameRate: 1,
    source: './assets/slot-machine/SlotMachine-idle(1).png',
    frameBuffer: 1,
    scale: 10,
    animations: {
        Idle: {
            source: "./assets/slot-machine/SlotMachine-idle(1).png",
            frameBuffer: 1,
            frameRate: 1,
            image: new Image()

        },

        Push: {
            source: "./assets/slot-machine/SlotMachine.png",
            frameBuffer: 6,
            frameRate: 12,
            image: new Image()
        }
    }
});


let menu = (currentTime) => {
    deltaTime = (currentTime - lastTime);
    deltaTime_Mult = deltaTime / frameInterval;

    ctx.imageSmoothingEnabled = false;
    ctx.textAlign = 'center';



    mainMenu();


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

    biome.draw();
    if (!inCharacterSelect && !inNameSelect) {

        if (player.inCombat) {
            musicControl.changeMusic({ local: '', name: 'combat' })
        } else {
            musicControl.changeMusic({ local: CurrentMusicLocal, name: CurrentMusicName })
        }

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
                    player.combatMode();
                };
            };
            if (projectile.shouldRemove) projectiles.splice(i, 1);
        };

        for (let i = 0; i <= npcs.length - 1; i++) {
            const npc = npcs[i];
            npc.update();

            const stwPlayerX = screenToWorldX(player.position.x);
            const stwPlayerY = screenToWorldY(player.position.y);
            const stwPlayerWidth = screenToWorldX(player.position.x + player.dimensions.width);
            const stwPlayerHeight = screenToWorldY(player.position.y + player.dimensions.height);

            const bonusSize = 30;

            const wtsNpcX = worldToScreenX(npc.position.x + bonusSize);
            const wtsNpcY = worldToScreenY(npc.position.y + bonusSize);
            const wtsNpcWidth = worldToScreenX(npc.position.x + npc.dimensions.width + bonusSize);
            const wtsNpcHeight = worldToScreenY(npc.position.y + npc.dimensions.height + bonusSize);

            if (stwPlayerX < wtsNpcWidth &&
                stwPlayerWidth > wtsNpcX &&
                stwPlayerY < wtsNpcHeight &&
                stwPlayerHeight > wtsNpcY) {
                actualNpc = npc
            }
        }
        // dice.update()

        for (let i = enemies.length - 1; i >= 0; i--) {
            enemy = enemies[i];
            enemy.update();
        };

        player.update();

        for (let i = activeAttacks.length - 1; i >= 0; i--) {
            const attack = activeAttacks[i];
            attack.update()
        }

        if (actualMission != '') {
            actualMission.update()
        }

        if (dialogActive) actualDialogBox.draw()
        player.inventory.update()


        if(newItemAdded){
            ctx.fillStyle = 'white'
            ctx.fillText('Novo Item adquirido!',800,200)
            if(newItemCooldown <= 100){
                newItemCooldown ++;
            }else{
                newItemCooldown = 0;
                newItemAdded = false;
            }
        }

        dice.update();

        generateNPC()

        if (dice.doAction == true) {
            dice.doAction = false;
            makeEnemies(dice.numberDisplay)
        }
    }
    else if (inNameSelect) {
        nameSelect();
        loadCanvasPrompt()
    } else {
        characterSelection();
    }



    lastTime = currentTime;
    requestAnimationFrame(game);
};

setTimeout(() => {
    menu();
}, 500);