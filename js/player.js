class Player extends AnimatedSprite {
    constructor({ position = { x: 0, y: 0 }, dimensions = { width: 0, height: 0 }, source, frameRate = 1, frameBuffer = 3, scale = 1, animations = {}, name = 'Delta'}) {
        super({ position, dimensions, source, frameRate, frameBuffer, scale, animations });
        this.center = {
            x: this.position.x - this.dimensions.width / 2,
            y: this.position.y - this.dimensions.height / 2,
        };
        this.hitbox = {
            position: {
                x: 0,
                y: 0,
            },
            dimensions: {
                width: 0,
                height: 0,
            }
        };
        this.attackbox = {
            position: {
                x: 0,
                y: 0,
            },
            dimensions: {
                width: 0,
                height: 0,
            }
        }

        this.direction = 'forward'
        this.attacking = false;
        this.attackInCooldown = false;
        this.inCombat = false;
        this.name = name;

        this.inventory = new inventory()
        this.health = 100;
        this.maxhealth = 100;
        this.dead = false;
        this.mana = 100;
        this.maxmana = 100;
    };

    shouldPanCameraHorizontal() {
        if (this.velocity.x < 0 && !this.colliding.left) {
            backgroundVelocity.x = this.velocity.x;
            backgroundPositions.x += backgroundVelocity.x;
            this.position.x -= this.velocity.x;
        }

        if (this.velocity.x > 0 && !this.colliding.right) {
            backgroundVelocity.x = this.velocity.x;
            backgroundPositions.x += backgroundVelocity.x;
            this.position.x -= this.velocity.x;
        }
    }

    shouldPanCameraVertical() {
        if (this.velocity.y < 0 && !this.colliding.up) {
            backgroundVelocity.y = this.velocity.y;
            backgroundPositions.y += backgroundVelocity.y;
            this.position.y -= this.velocity.y;
        }

        if (this.velocity.y > 0 && !this.colliding.down) {
            backgroundVelocity.y = this.velocity.y;
            backgroundPositions.y += backgroundVelocity.y;
            this.position.y -= this.velocity.y;
        }
    }


    receivingDamage(damage) {
        this.health -= damage;
        if (this.health <= 0) {
            this.health = 0;
            this.dead = true;
        }
    }

    attackCooldown() {
        setTimeout(() => {
            this.attackInCooldown = false;
        }, 2000);
        setTimeout(() => {
            this.attacking = false
            switch (player.direction) {
                case 'behind': player.switchSprite('IdleBehind'); break;
                case 'forward': player.switchSprite('IdleForward'); break;
                case 'side': player.switchSprite('IdleSide'); break;
                case 'sideLeft': player.switchSprite('IdleSideLeft'); break;
            }
        }, 500);
    }

    combatMode() {
        if (!this.inCombat) {
            this.inCombat = true;
            setTimeout(() => {
                this.inCombat = false
            }, 20000);
        }
    }

    death() {
        if(this.dead){
            deathScreen();
        }
    }

    Regen(){
        if(this.health < this.maxhealth){
            this.health += deltaTime_Mult * 0.03;
        }
        if(this.mana < this.maxmana){
            this.mana += deltaTime_Mult * 0.03;
        }
        if(this.mana > this.maxmana){
            this.mana = this.maxmana
        }
        if(this.health > this.maxhealth){
            this.health = this.maxhealth
        }
    }

    HealthUI(){
        const UIimage = new Image();
        const playerImage = new Image();
        UIimage.src = './assets/ui/healthUI.png';
        playerImage.src = '';
        
        ctx.fillStyle = 'rgb(100,100,100)';
        ctx.fillRect(150,75,317.1,45);
        ctx.fillStyle = 'red';
        ctx.fillRect(150,75,(this.health/this.maxhealth)*317.1,45);
        ctx.fillStyle = 'rgb(150,150,150)';
        ctx.fillRect(150,45,166.5,25.5);
        ctx.drawImage(UIimage,0,0,500,250);
        ctx.drawImage(playerImage,50,50,130,130);
        ctx.fillStyle = 'black';
        ctx.textAlign ='center'
        ctx.font ="20px Pixeloid"
        ctx.fillText(this.name,250,65)

        
    }

    ManaUI(){
        ctx.fillStyle = 'rgb(100,100,100)';
        ctx.fillRect(150,125,317.1,45)
        ctx.fillStyle = 'rgb(51, 191, 226)';
        ctx.fillRect(150,125,(this.mana/this.maxmana)*317.1,45)
    }


    updateBoxes() {
        this.hitbox = {
            position: {
                x: screenToWorldX(this.center.x - 20),
                y: screenToWorldY(this.center.y - 20),
            },
            dimensions: {
                width: this.dimensions.width + 20 * 2,
                height: this.dimensions.height + 20 * 2,
            }
        };
        this.attackbox = {
            position: {
                x: screenToWorldX(this.center.x - 50),
                y: screenToWorldY(this.center.y - 50),
            },
            dimensions: {
                width: this.dimensions.width + 50 * 2,
                height: this.dimensions.height + 50 * 2,
            }
        }
    }

    draw() {
        this.ManaUI();
        this.HealthUI();
        this.center = {
            x: this.position.x - this.dimensions.width / 2,
            y: this.position.y - this.dimensions.height / 2,
        }

        // ctx.fillStyle = 'green'; 
        //ctx.fillRect(this.attackbox.position.x, this.attackbox.position.y, this.attackbox.dimensions.width, this.attackbox.dimensions.height)
        //ctx.fillStyle = 'purple';
        //ctx.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.dimensions.width, this.hitbox.dimensions.height)
        ctx.fillStyle = 'white';
        ctx.fillRect(screenToWorldX(this.center.x), screenToWorldY(this.center.y), this.dimensions.width, this.dimensions.height);

    };

    update() {
        this.draw();
        this.updateBoxes();
        this.death();
        this.shouldPanCameraHorizontal();
        this.shouldPanCameraVertical();
        this.handleCollision()
        this.Regen();
        this.inventory.update()
        // this.applyVelocity()
    };
};

class Mage extends Player {
    constructor({ position = { x: 0, y: 0 }, dimensions = { width: 0, height: 0 }, source = './assets/mage/idle/forward.png', frameRate = 1, frameBuffer = 1, scale = 0.3, name = 'Delta', animations = {
        IdleForward: {
            source: './assets/mage/idle/forward.png',
            frameBuffer: 1,
            frameRate: 1,
            image: new Image()
        },
        IdleSide: {
            source: './assets/mage/idle/side.png',
            frameBuffer: 1,
            frameRate: 1,
            image: new Image()

        },
        IdleSideLeft: {
            source: './assets/mage/idle/sideleft.png',
            frameBuffer: 1,
            frameRate: 1,
            image: new Image()

        },
        IdleBehind: {
            source: './assets/mage/idle/behind.png',
            frameBuffer: 1,
            frameRate: 1,
            image: new Image()
        },

        WalkingForward: {
            source: './assets/mage/walking/forward.png',
            frameBuffer: 8,
            frameRate: 4,
            image: new Image()
        },

        WalkingSide: {
            source: './assets/mage/walking/side.png',
            frameBuffer: 8,
            frameRate: 4,
            image: new Image()
        },

        WalkingSideLeft: {
            source: './assets/mage/walking/sideLeft.png',
            frameBuffer: 8,
            frameRate: 4,
            image: new Image()
        },

        WalkingBehind: {
            source: './assets/mage/walking/behind.png',
            frameBuffer: 8,
            frameRate: 4,
            image: new Image()
        },

        AttackingForward: {
            source: './assets/mage/attacking/forward.png',
            frameBuffer: 10,
            frameRate: 5,
            image: new Image()
        },

        AttackingSide: {
            source: './assets/mage/attacking/side.png',
            frameBuffer: 10,
            frameRate: 5,
            image: new Image()
        },

        AttackingSideLeft: {
            source: './assets/mage/attacking/sideLeft.png',
            frameBuffer: 10,
            frameRate: 5,
            image: new Image()
        },

        AttackingBehind: {
            source: './assets/mage/attacking/behind.png',
            frameBuffer: 10,
            frameRate: 5,
            image: new Image()
        },

    } }) {
        super({ position, dimensions, source, frameRate, frameBuffer, scale, animations,name });
    }
    
    HealthUI(){
        const UIimage = new Image();
        const playerImage = new Image();
        UIimage.src = './assets/ui/healthUI.png';
        playerImage.src = './assets/mage/menu/icon.png';
        
        ctx.fillStyle = 'rgb(100,100,100)';
        ctx.fillRect(150,75,317.1,45);
        ctx.fillStyle = 'red';
        ctx.fillRect(150,75,(this.health/this.maxhealth)*317.1,45);
        ctx.fillStyle = 'rgb(150,150,150)';
        ctx.fillRect(150,45,166.5,25.5);
        ctx.drawImage(UIimage,0,0,500,250);
        ctx.drawImage(playerImage,50,50,130,130);
        ctx.fillStyle = 'black';
        ctx.textAlign ='center'
        ctx.font ="20px Pixeloid"
        ctx.fillText(this.name,250,65)

        
    }

    draw() {
        this.ManaUI();
        this.HealthUI();
        this.center = {
            x: this.position.x - this.dimensions.width / 2,
            y: this.position.y - this.dimensions.height / 2,
        }

        if (!this.image) return;

        let cropbox = {
            position: {
                x: this.currentFrame * (this.image.width / this.frameRate),
                y: 0
            },
            width: this.image.width / this.frameRate,
            height: this.image.height
        };


        // ctx.fillStyle = 'green'; 
        // ctx.fillRect(this.attackbox.position.x, this.attackbox.position.y, this.attackbox.dimensions.width, this.attackbox.dimensions.height)
        // ctx.fillStyle = 'purple';
        // ctx.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.dimensions.width, this.hitbox.dimensions.height)

        ctx.drawImage(
            this.image,
            cropbox.position.x,
            cropbox.position.y,
            cropbox.width,
            cropbox.height,
            screenToWorldX(this.position.x - this.width / 2 + this.width / 3),
            screenToWorldY(this.position.y - this.height / 2 + this.height / 5),
            this.width,
            this.height
        );
    }

    attackCooldown() {
        setTimeout(() => {
            this.attackInCooldown = false;
        }, 2000);
        setTimeout(() => {
            this.attacking = false
            switch (player.direction) {
                case 'behind': player.switchSprite('IdleBehind'); break;
                case 'forward': player.switchSprite('IdleForward'); break;
                case 'side': player.switchSprite('IdleSide'); break;
                case 'sideLeft': player.switchSprite('IdleSideLeft'); break;
            }
        }, 500);
    }

    update() {
        this.draw();
        this.updateBoxes();
        this.death();
        this.updateFrames();
        this.shouldPanCameraHorizontal();
        this.shouldPanCameraVertical();
        this.handleCollision();
        this.Regen();
        this.inventory.update();
        // this.applyVelocity()
    };
}

class Archer extends Player {
    constructor({ position = { x: 0, y: 0 }, dimensions = { width: 0, height: 0 }, source = './assets/archer/Parado/forward.png', frameRate = 1, frameBuffer = 1, scale = 0.3, name = 'Delta', animations = {
        IdleForward: {
            source: './assets/archer/Parado/forward.png',
            frameBuffer: 1,
            frameRate: 1,
            image: new Image()

        },
        IdleSide: {
            source: './assets/archer/Parado/side.png',
            frameBuffer: 1,
            frameRate: 1,
            image: new Image()

        },
        IdleSideLeft: {
            source: './assets/archer/Parado/sideleft.png',
            frameBuffer: 1,
            frameRate: 1,
            image: new Image()

        },
        IdleBehind: {
            source: './assets/archer/Parado/behind.png',
            frameBuffer: 1,
            frameRate: 1,
            image: new Image()
        },

        WalkingForward: {
            source: './assets/archer/Andando/forward.png',
            frameBuffer: 8,
            frameRate: 4,
            image: new Image()
        },

        WalkingSide: {
            source: './assets/archer/Andando/side.png',
            frameBuffer: 8,
            frameRate: 4,
            image: new Image()
        },

        WalkingSideLeft: {
            source: './assets/archer/Andando/sideLeft.png',
            frameBuffer: 8,
            frameRate: 4,
            image: new Image()
        },

        WalkingBehind: {
            source: './assets/archer/Andando/behind.png',
            frameBuffer: 8,
            frameRate: 4,
            image: new Image()
        },

        AttackingForward: {
            source: './assets/archer/attacking/forward.png',
            frameBuffer: 10,
            frameRate: 5,
            image: new Image()
        },

        AttackingSide: {
            source: './assets/archer/attacking/side.png',
            frameBuffer: 10,
            frameRate: 8,
            image: new Image()
        },

        AttackingSideLeft: {
            source: './assets/archer/attacking/sideLeft.png',
            frameBuffer: 10,
            frameRate: 8,
            image: new Image()
        },

        AttackingBehind: {
            source: './assets/archer/attacking/behind.png',
            frameBuffer: 10,
            frameRate: 5,
            image: new Image()
        },

    } }) {
        super({ position, dimensions, source, frameRate, frameBuffer, scale, animations,name });
    }

    HealthUI(){
        const UIimage = new Image();
        const playerImage = new Image();
        UIimage.src = './assets/ui/healthUI.png';
        playerImage.src = './assets/archer/idle/forward.png';
        
        ctx.fillStyle = 'rgb(100,100,100)';
        ctx.fillRect(150,75,317.1,45);
        ctx.fillStyle = 'red';
        ctx.fillRect(150,75,(this.health/this.maxhealth)*317.1,45);
        ctx.fillStyle = 'rgb(150,150,150)';
        ctx.fillRect(150,45,166.5,25.5);
        ctx.drawImage(UIimage,0,0,500,250);
        ctx.drawImage(playerImage,50,50,130,130);
        ctx.fillStyle = 'black';
        ctx.textAlign ='center'
        ctx.font ="20px Pixeloid"
        ctx.fillText(this.name,250,65)

        
    }

    draw() {
        this.ManaUI();
        this.HealthUI();
        this.center = {
            x: this.position.x - this.dimensions.width / 2,
            y: this.position.y - this.dimensions.height / 2,
        }

        if (!this.image) return;

        let cropbox = {
            position: {
                x: this.currentFrame * (this.image.width / this.frameRate),
                y: 0
            },
            width: this.image.width / this.frameRate,
            height: this.image.height
        };


        // ctx.fillStyle = 'green'; 
        // ctx.fillRect(this.attackbox.position.x, this.attackbox.position.y, this.attackbox.dimensions.width, this.attackbox.dimensions.height)
        // ctx.fillStyle = 'purple';
        // ctx.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.dimensions.width, this.hitbox.dimensions.height)

        ctx.drawImage(
            this.image,
            cropbox.position.x,
            cropbox.position.y,
            cropbox.width,
            cropbox.height,
            screenToWorldX(this.position.x - this.width / 1.6 + this.width / 3),
            screenToWorldY(this.position.y - this.height / 2 + this.height / 5),
            this.width,
            this.height
        );
    }

    attackCooldown() {
        setTimeout(() => {
            this.attackInCooldown = false;
        }, 1000);
        setTimeout(() => {
            this.attacking = false
            switch (player.direction) {
                case 'behind': player.switchSprite('IdleBehind'); break;
                case 'forward': player.switchSprite('IdleForward'); break;
                case 'side': player.switchSprite('IdleSide'); break;
                case 'sideLeft': player.switchSprite('IdleSideLeft'); break;
            }
        }, 500);
    }

    update() {
        this.draw();
        this.updateBoxes();
        this.death();
        this.updateFrames();
        this.shouldPanCameraHorizontal();
        this.shouldPanCameraVertical();
        this.handleCollision();
        this.Regen();
        this.inventory.update();
        // this.applyVelocity()
    };
}

class Cleric extends Player {
    constructor({ position = { x: 0, y: 0 }, dimensions = { width: 0, height: 0 }, source = './assets/cleric/Idle/forward.png', frameRate = 1, frameBuffer = 1, scale = 0.3, name = 'Delta', animations = {
        IdleForward: {
            source: './assets/cleric/Idle/forward.png',
            frameBuffer: 1,
            frameRate: 1,
            image: new Image()

        },
        IdleSide: {
            source: './assets/cleric/Idle/side.png',
            frameBuffer: 1,
            frameRate: 1,
            image: new Image()

        },
        IdleSideLeft: {
            source: './assets/cleric/Idle/sideleft.png',
            frameBuffer: 1,
            frameRate: 1,
            image: new Image()

        },
        IdleBehind: {
            source: './assets/cleric/Idle/behind.png',
            frameBuffer: 1,
            frameRate: 1,
            image: new Image()
        },

        WalkingForward: {
            source: './assets/cleric/walking/forward.png',
            frameBuffer: 8,
            frameRate: 4,
            image: new Image()
        },

        WalkingSide: {
            source: './assets/cleric/walking/side.png',
            frameBuffer: 8,
            frameRate: 4,
            image: new Image()
        },

        WalkingSideLeft: {
            source: './assets/cleric/walking/sideLeft.png',
            frameBuffer: 8,
            frameRate: 4,
            image: new Image()
        },

        WalkingBehind: {
            source: './assets/cleric/walking/behind.png',
            frameBuffer: 8,
            frameRate: 4,
            image: new Image()
        },

        AttackingForward: {
            source: './assets/cleric/attacking/forward.png',
            frameBuffer: 10,
            frameRate: 8,
            image: new Image()
        },

        AttackingSide: {
            source: './assets/cleric/attacking/side.png',
            frameBuffer: 10,
            frameRate: 8,
            image: new Image()
        },

        AttackingSideLeft: {
            source: './assets/cleric/attacking/sideLeft.png',
            frameBuffer: 10,
            frameRate: 8,
            image: new Image()
        },

        AttackingBehind: {
            source: './assets/cleric/attacking/behind.png',
            frameBuffer: 10,
            frameRate: 5,
            image: new Image()
        },

    } }) {
        super({ position, dimensions, source, frameRate, frameBuffer, scale, animations,name });
    }

    HealthUI(){
        const UIimage = new Image();
        const playerImage = new Image();
        UIimage.src = './assets/ui/healthUI.png';
        playerImage.src = './assets/cleric/menu/forward.png';
        
        ctx.fillStyle = 'rgb(100,100,100)';
        ctx.fillRect(150,75,317.1,45);
        ctx.fillStyle = 'red';
        ctx.fillRect(150,75,(this.health/this.maxhealth)*317.1,45);
        ctx.fillStyle = 'rgb(150,150,150)';
        ctx.fillRect(150,45,166.5,25.5);
        ctx.drawImage(UIimage,0,0,500,250);
        ctx.drawImage(playerImage,50,50,130,130);
        ctx.fillStyle = 'black';
        ctx.textAlign ='center'
        ctx.font ="20px Pixeloid"
        ctx.fillText(this.name,250,65)

        
    }

    draw() {
        this.ManaUI();
        this.HealthUI();
        this.center = {
            x: this.position.x - this.dimensions.width / 2,
            y: this.position.y - this.dimensions.height / 2,
        }

        if (!this.image) return;

        let cropbox = {
            position: {
                x: this.currentFrame * (this.image.width / this.frameRate),
                y: 0
            },
            width: this.image.width / this.frameRate,
            height: this.image.height
        };


        // ctx.fillStyle = 'green'; 
        // ctx.fillRect(this.attackbox.position.x, this.attackbox.position.y, this.attackbox.dimensions.width, this.attackbox.dimensions.height)
        // ctx.fillStyle = 'purple';
        // ctx.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.dimensions.width, this.hitbox.dimensions.height)

        ctx.drawImage(
            this.image,
            cropbox.position.x,
            cropbox.position.y,
            cropbox.width,
            cropbox.height,
            screenToWorldX(this.position.x - this.width / 1.6 + this.width / 3),
            screenToWorldY(this.position.y - this.height / 2 + this.height / 5),
            this.width,
            this.height
        );
    }

        attackCooldown() {
        setTimeout(() => {
            this.attackInCooldown = false;
        }, 1000);
        setTimeout(() => {
            this.attacking = false
            switch (player.direction) {
                case 'behind': player.switchSprite('IdleBehind'); break;
                case 'forward': player.switchSprite('IdleForward'); break;
                case 'side': player.switchSprite('IdleSide'); break;
                case 'sideLeft': player.switchSprite('IdleSideLeft'); break;
            }
        }, 500);
    }

    update() {
        this.draw();
        this.updateBoxes();
        this.death();
        this.updateFrames();
        this.shouldPanCameraHorizontal();
        this.shouldPanCameraVertical();
        this.handleCollision();
        this.Regen();
        this.inventory.update();
        // this.applyVelocity()
    };
}

class Warrior extends Player {
    constructor({ position = { x: 0, y: 0 }, dimensions = { width: 0, height: 0 }, source = './assets/warrior/Parado/forward.png', frameRate = 1, frameBuffer = 1, scale = 0.3, name = 'Delta', animations = {
        IdleForward: {
            source: './assets/warrior/Parado/forward.png',
            frameBuffer: 1,
            frameRate: 1,
            image: new Image()
        },
        IdleSide: {
            source: './assets/warrior/Parado/side.png',
            frameBuffer: 1,
            frameRate: 1,
            image: new Image()

        },
        IdleSideLeft: {
            source: './assets/warrior/Parado/sideleft.png',
            frameBuffer: 1,
            frameRate: 1,
            image: new Image()

        },
        IdleBehind: {
            source: './assets/warrior/Parado/behind.png',
            frameBuffer: 1,
            frameRate: 1,
            image: new Image()
        },

        WalkingForward: {
            source: './assets/warrior/walking/forward.png',
            frameBuffer: 8,
            frameRate: 4,
            image: new Image()
        },

        WalkingSide: {
            source: './assets/warrior/walking/side.png',
            frameBuffer: 8,
            frameRate: 4,
            image: new Image()
        },

        WalkingSideLeft: {
            source: './assets/warrior/walking/sideLeft.png',
            frameBuffer: 8,
            frameRate: 4,
            image: new Image()
        },

        WalkingBehind: {
            source: './assets/warrior/walking/behind.png',
            frameBuffer: 8,
            frameRate: 4,
            image: new Image()
        },

        AttackingForward: {
            source: './assets/warrior/attacking/forward.png',
            frameBuffer: 10,
            frameRate: 5,
            image: new Image()
        },

        AttackingSide: {
            source: './assets/warrior/attacking/side.png',
            frameBuffer: 10,
            frameRate: 5,
            image: new Image()
        },

        AttackingSideLeft: {
            source: './assets/warrior/attacking/sideLeft.png',
            frameBuffer: 10,
            frameRate: 5,
            image: new Image()
        },

        AttackingBehind: {
            source: './assets/warrior/attacking/behind.png',
            frameBuffer: 10,
            frameRate: 5,
            image: new Image()
        },

    } }) {
        super({ position, dimensions, source, frameRate, frameBuffer, scale, animations,name });
    }
    
    HealthUI(){
        const UIimage = new Image();
        const playerImage = new Image();
        UIimage.src = './assets/ui/healthUI.png';
        playerImage.src = './assets/warrior/idle/icon.png';
        
        ctx.fillStyle = 'rgb(100,100,100)';
        ctx.fillRect(150,75,317.1,45);
        ctx.fillStyle = 'red';
        ctx.fillRect(150,75,(this.health/this.maxhealth)*317.1,45);
        ctx.fillStyle = 'rgb(150,150,150)';
        ctx.fillRect(150,45,166.5,25.5);
        ctx.drawImage(UIimage,0,0,500,250);
        ctx.drawImage(playerImage,50,50,130,130);
        ctx.fillStyle = 'black';
        ctx.textAlign ='center'
        ctx.font ="20px Pixeloid"
        ctx.fillText(this.name,250,65)

        
    }

    draw() {
        this.ManaUI();
        this.HealthUI();
        this.center = {
            x: this.position.x - this.dimensions.width / 2,
            y: this.position.y - this.dimensions.height / 2,
        }

        if (!this.image) return;

        let cropbox = {
            position: {
                x: this.currentFrame * (this.image.width / this.frameRate),
                y: 0
            },
            width: this.image.width / this.frameRate,
            height: this.image.height
        };


        // ctx.fillStyle = 'green'; 
        // ctx.fillRect(this.attackbox.position.x, this.attackbox.position.y, this.attackbox.dimensions.width, this.attackbox.dimensions.height)
        // ctx.fillStyle = 'purple';
        // ctx.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.dimensions.width, this.hitbox.dimensions.height)

        ctx.drawImage(
            this.image,
            cropbox.position.x,
            cropbox.position.y,
            cropbox.width,
            cropbox.height,
            screenToWorldX(this.position.x - this.width / 2 + this.width / 3),
            screenToWorldY(this.position.y - this.height / 2 + this.height / 5),
            this.width,
            this.height
        );
    }

    attackCooldown() {
        setTimeout(() => {
            this.attackInCooldown = false;
        }, 2000);
        setTimeout(() => {
            this.attacking = false
            switch (player.direction) {
                case 'behind': player.switchSprite('IdleBehind'); break;
                case 'forward': player.switchSprite('IdleForward'); break;
                case 'side': player.switchSprite('IdleSide'); break;
                case 'sideLeft': player.switchSprite('IdleSideLeft'); break;
            }
        }, 500);
    }

    update() {
        this.draw();
        this.updateBoxes();
        this.death();
        this.updateFrames();
        this.shouldPanCameraHorizontal();
        this.shouldPanCameraVertical();
        this.handleCollision();
        this.Regen();
        this.inventory.update();
        // this.applyVelocity()
    };
}



let player;

let acceptedKeys = {
    ArrowUp(player) {
        player.velocity.x = 0;
        player.velocity.y = -5 * deltaTime_Mult;
        if (!player.attacking) player.switchSprite('WalkingBehind')
        player.direction = 'behind'
    },
    ArrowDown(player) {
        player.velocity.x = 0;
        player.velocity.y = 5 * deltaTime_Mult;
        if (!player.attacking) player.switchSprite('WalkingForward')
        player.direction = 'forward'
    },
    ArrowLeft(player) {
        player.velocity.y = 0;
        player.velocity.x = -5 * deltaTime_Mult;
        if (!player.attacking) player.switchSprite('WalkingSide')
        player.direction = 'side'
    },
    ArrowRight(player) {
        player.velocity.y = 0;
        player.velocity.x = 5 * deltaTime_Mult;
        if (!player.attacking) player.switchSprite('WalkingSideLeft')
        player.direction = 'sideLeft'
    }
};

let keyUpKeys = {
    ArrowUp(player) {
        if (player.velocity.y < 0) {
            player.velocity.y = 0;
            if (!player.attacking) player.switchSprite('IdleBehind')
        }
    },
    ArrowDown(player) {
        if (player.velocity.y > 0) {
            player.velocity.y = 0;
            if (!player.attacking) player.switchSprite('IdleForward')
        }
    },
    ArrowLeft(player) {
        if (player.velocity.x < 0) {
            player.velocity.x = 0;
            if (!player.attacking) player.switchSprite('IdleSide')
        }
    },
    ArrowRight(player) {
        if (player.velocity.x > 0) {
            player.velocity.x = 0;
            if (!player.attacking) player.switchSprite('IdleSideLeft')
        }
    }
};

let projectiles = [];

