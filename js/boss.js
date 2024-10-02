class bossAttack extends AnimatedSprite {
    constructor({ position = { x: 0, y: 0 }, dimensions = { width: 0, height: 0 }, source, frameRate = 1, frameBuffer = 3, scale = 1, animations = {}, damage = 0 }) {
        super({ position, dimensions, source, frameRate, frameBuffer, scale, animations })
        this.damage = damage
        this.active = false;
        this.shouldRemove = false;
    }

    draw() {
        if (!this.image) return;

        let cropbox = {
            position: {
                x: this.currentFrame * (this.image.width / this.frameRate),
                y: 0
            },
            width: this.image.width / this.frameRate,
            height: this.image.height
        };

        ctx.drawImage(this.image, cropbox.position.x, cropbox.position.y, cropbox.width, cropbox.height, worldToScreenX(this.position.x - this.width / 2 + this.width / 10), worldToScreenY(this.position.y - this.height / 2 + this.height / 10), this.width, this.height)
    }


    update() {
        this.draw()
        this.updateFrames()
    }

}

class Boss extends Enemy {
    constructor({ position = { x: 0, y: 0 }, dimensions = { width: 0, height: 0 }, source, frameRate = 1, frameBuffer = 3, scale = 1, animations = {} }) {
        super({ position, dimensions, source, frameRate, frameBuffer, scale, animations });
        this.health = 1000;
        this.healthbar = new Healthbar({
            maxHealth: this.health,
            pos: { x: this.position.x, y: this.position.y - 50 },
            size: { w: this.dimensions.width, h: 20 }

        });
        this.damage = 20;
        this.rangedAttackRange = 100
        this.meleeAttackRange = 10
        this.attackType = 'ranged'
        this.attackSprite = new bossAttack({
            position: player.position,
            dimensions: { width: 100, height: 100 },
            source: './assets/enemies/kinggoblin/attack.png',
            frameBuffer: 12,
            frameRate: 3,
            scale: 0.5,
            animations: {
                Base: {
                    source: './assets/enemies/kinggoblin/attack.png',
                    frameBuffer: 3,
                    frameRate: 3,
                    image: new Image()
                }
            }
        })
    }

    rangedAttack() {
        if (!this.attackSprite.active) {
            this.attackSprite = new bossAttack({
                position: player.position,
                dimensions: { width: 100, height: 100 },
                source: './assets/enemies/kinggoblin/attack.png',
                frameBuffer: 12,
                frameRate: 3,
                scale: 0.5,
                animations: {
                    Base: {
                        source: './assets/enemies/kinggoblin/attack.png',
                        frameBuffer: 3,
                        frameRate: 3,
                        image: new Image()
                    }
                }
            })
            this.attackSprite.position = { x: this.position.x, y: this.position.y };
            this.attackSprite.active = true;
            activeAttacks[0] = this.attackSprite;
            setTimeout(() => {
                this.attackSprite.active = false;
                activeAttacks = []
            }, 1000);
        }
    }

    meleeAttack() {
        console.log('Boss is attacking with a melee attack!')
    }

    checkAttack() {
        const distance = this.calculateDistance();

        if (this.attackType == 'ranged') {
            if (distance <= this.rangedAttackRange) {
                this.rangedAttack();
            } else {
                console.log("Player is out of range for a ranged attack.");
            }
        } else if (this.attackType == 'melee') {
            if (distance <= this.meleeAttackRange) {
                this.meleeAttack();
            } else {
                console.log("Player is out of range for a melee attack.");
            }
        }
    }

    updateBoxes() {
        this.hitbox = {
            position: {
                x: worldToScreenX(this.center.x - 90),
                y: worldToScreenY(this.center.y - 110),
            },
            dimensions: {
                width: this.dimensions.width + 20 * 2,
                height: this.dimensions.height + 20 * 2,
            }
        };
        this.attackbox = {
            position: {
                x: worldToScreenX(this.center.x - 50),
                y: worldToScreenY(this.center.y - 50),
            },
            dimensions: {
                width: this.dimensions.width + 50 * 2,
                height: this.dimensions.height + 50 * 2,
            }
        }
    }

    draw() {
        this.center = {
            x: this.position.x - this.dimensions.width / 2,
            y: this.position.y - this.dimensions.height / 2,
        };

        // ctx.fillStyle = 'blue';
        // ctx.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.dimensions.width, this.hitbox.dimensions.height);
        //ctx.fillStyle = 'brown';
        //ctx.fillRect(this.attackbox.position.x, this.attackbox.position.y, this.attackbox.dimensions.width, this.attackbox.dimensions.height);

        if (!this.image) return;

        let cropbox = {
            position: {
                x: this.currentFrame * (this.image.width / this.frameRate),
                y: 0
            },
            width: this.image.width / this.frameRate,
            height: this.image.height
        };

        ctx.drawImage(this.image, (cropbox.position.x), (cropbox.position.y), cropbox.width, cropbox.height, worldToScreenX(this.center.x - this.width / 2 + this.width / 10), worldToScreenY(this.center.y - this.height / 2 + this.height / 10), this.width, this.height)

        //healthBar
        this.healthbar.update();
    };

    calculateDistance() {
        const dx = worldToScreenX(this.position.x) - screenToWorldX(player.position.x);
        const dy = worldToScreenY(this.position.y) - screenToWorldY(player.position.y);
        return Math.sqrt(dx * dx + dy * dy);
    }

    update() {
        this.velocity.x = 0;
        this.velocity.y = 0;
        this.checkAttack()
        this.updateBoxes()
        this.draw();
        this.detectPlayer()
        this.followPlayer()
        this.updateFrames();
        this.DestroyEnemies()
        this.handleCollision()
        this.healthbar.updateValues({ pos: { x: worldToScreenX(this.position.x - 110), y: worldToScreenY(this.position.y - 200) }, health: this.health });
    };
}

let kingGoblin = new Boss({
    position: { x: 200, y: 200 },
    dimensions: { width: 100, height: 100 },
    source: './assets/enemies/kinggoblin/fullset.png',
    frameRate: 4,
    frameBuffer: 12,
    scale: 0.5,
    animations: {
        Idle: {
            source: "./assets/enemies/kinggoblin/fullset.png",
            frameBuffer: 12,
            frameRate: 4,
            image: new Image()
        },
    }
})

let activeAttacks = []

enemies.push(kingGoblin)