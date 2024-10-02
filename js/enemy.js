class Enemy extends AnimatedSprite {
    constructor({ position = { x: 0, y: 0 }, dimensions = { width: 0, height: 0 }, source, frameRate = 1, frameBuffer = 3, scale = 1, animations = {} }) {
        super({ position, dimensions, source, frameRate, frameBuffer, scale, animations });
        this.dead = false;
        this.playerOnRange = false;
        this.health = 100;
        this.attackCooldown = 100;
        this.healthbar = new Healthbar({
            maxHealth: this.health,
            pos: { x: this.position.x, y: this.position.y - 50 },
            size: { w: this.dimensions.width, h: 20 }

        });
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
        this.velocity = {
            x: 0,
            y: 0
        }
        this.colliding = {
            left: false,
            right: false,
            up: false,
            down: false
        };
        this.canAttack = false;
    };

    applyVelocity() {
        if (this.velocity.x === 0 && this.velocity.y === 0 && player.velocity.x + player.velocity.y != 0) {
            this.position.x += this.velocity.x - player.velocity.x * 5 * deltaTime_Mult;
            this.position.y += this.velocity.y - player.velocity.y * 5 * deltaTime_Mult;
        } else if (!this.colliding.left && !this.colliding.right && !this.colliding.up && !this.colliding.down) {
            this.position.x += this.velocity.x - player.velocity.x * 1 * deltaTime_Mult;
            this.position.y += this.velocity.y - player.velocity.y * 1 * deltaTime_Mult;
        };
    };

    receivingDamage(damage) {
        this.health -= damage;
        if (this.health <= 0) {
            this.health = 0;
            this.dead = true;
        }
    }

    handleCollision() {
        let isCollidingLeft = false;
        let isCollidingRight = false;
        let isCollidingUp = false;
        let isCollidingDown = false;

        let bonusSize = 0;

        const stwSpriteX = screenToWorldX(this.position.x);
        const stwSpriteY = screenToWorldY(this.position.y);
        const stwSpriteWidth = screenToWorldX(this.position.x + this.dimensions.width);
        const stwSpriteHeight = screenToWorldY(this.position.y + this.dimensions.height);

        for (let i = 0; i < collisionBlocks.length; i++) {
            const collisionBlock = collisionBlocks[i];
            if (collisionBlock) {

                if (collisionBlock.name === 'tree') {
                    bonusSize = 30
                } else {
                    bonusSize = 0
                }

                const wtsCollisionBlockX = worldToScreenX(collisionBlock.position.x + bonusSize);
                const wtsCollisionBlockY = worldToScreenY(collisionBlock.position.y + bonusSize);
                const wtsCollisionBlockWidth = worldToScreenX(collisionBlock.position.x + collisionBlock.size + bonusSize);
                const wtsCollisionBlockHeight = worldToScreenY(collisionBlock.position.y + collisionBlock.size + bonusSize);

                if (stwSpriteX < wtsCollisionBlockWidth &&
                    stwSpriteWidth > wtsCollisionBlockX &&
                    stwSpriteY < wtsCollisionBlockHeight &&
                    stwSpriteHeight > wtsCollisionBlockY) {

                    if ((this.velocity.x > 0 || this.colliding.right) && !this.colliding.down && !this.colliding.up) {
                        isCollidingRight = true;
                    }

                    if ((this.velocity.x < 0 || this.colliding.left) && !this.colliding.down && !this.colliding.up) {
                        isCollidingLeft = true;
                    }

                    if ((this.velocity.y > 0 || this.colliding.down) && !this.colliding.right && !this.colliding.left) {
                        isCollidingDown = true;
                    }

                    if ((this.velocity.y < 0 || this.colliding.up) && !this.colliding.right && !this.colliding.left) {
                        isCollidingUp = true;
                    }
                }
            }
        }

        this.colliding.left = isCollidingLeft;
        this.colliding.right = isCollidingRight;
        this.colliding.up = isCollidingUp;
        this.colliding.down = isCollidingDown;

    }

    detectPlayer() {
        if (screenToWorldX(this.position.x + this.dimensions.width / 2) < 0 ||
            screenToWorldX(this.position.x - this.dimensions.width / 2) > canvas.width ||
            screenToWorldY(this.position.y + this.dimensions.height / 2) < 0 ||
            screenToWorldY(this.position.y - this.dimensions.height / 2) > canvas.height
        ) this.playerOnRange = false
        else this.playerOnRange = true
    }

    followPlayer() {
        if (!this.dead && this.playerOnRange) {
            const playerWorldX = screenToWorldX(player.position.x);
            const playerWorldY = screenToWorldY(player.position.y);
            const enemyWorldX = screenToWorldX(this.position.x);
            const enemyWorldY = screenToWorldY(this.position.y);

            // Move Right if player is to the right, but stop if colliding on the right
            if (playerWorldX > enemyWorldX + this.dimensions.width && !this.colliding.right) {
                this.velocity.y = 0; // Stop vertical movement
                this.velocity.x = 5 * deltaTime_Mult; // Move right
            }
            // Move Left if player is to the left, but stop if colliding on the left
            else if (playerWorldX < enemyWorldX - this.dimensions.width && !this.colliding.left) {
                this.velocity.y = 0; // Stop vertical movement
                this.velocity.x = -5 * deltaTime_Mult; // Move left
            }

            // Move Down if player is below, but stop if colliding on the bottom
            if (playerWorldY > enemyWorldY + this.dimensions.height && !this.colliding.down) {
                this.velocity.x = 0; // Stop horizontal movement
                this.velocity.y = 5 * deltaTime_Mult; // Move down
            }
            // Move Up if player is above, but stop if colliding on the top
            else if (playerWorldY < enemyWorldY - this.dimensions.height && !this.colliding.up) {
                this.velocity.x = 0; // Stop horizontal movement
                this.velocity.y = -5 * deltaTime_Mult; // Move up
            }
        }
    }

    calculateDistance(){
        const dx = screenToWorldX(this.position.x) - screenToWorldX(player.position.x);
        const dy = screenToWorldY(this.position.y) - screenToWorldY(player.position.y);
        return Math.sqrt(dx * dx + dy * dy);
    }

    CanAttack() {
        if (this.calculateDistance() < 100 ){
            if(this.attackCooldown > 0)this.attackCooldown -= deltaTime_Mult;
            else {this.canAttack = true;
                this.attackCooldown = 100;
            }
        }
        
    }

    Attack() {
        if (this.canAttack) {
            player.receivingDamage(10);
            this.canAttack = false;
        }

    }

    DestroyEnemies() {
        if (this.healthbar.healthTaken <= 0) {
            let eIndex = enemies.findIndex(enemy => {
                return enemy.position.x === this.position.x && enemy.position.y === this.position.y
            })
            enemies.splice(eIndex, 1);
        }
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
        this.center = {
            x: this.position.x - this.dimensions.width / 2,
            y: this.position.y - this.dimensions.height / 2,
        };

        //ctx.fillStyle = 'blue';
        //ctx.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.dimensions.width, this.hitbox.dimensions.height);
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

        ctx.drawImage(this.image, (cropbox.position.x), (cropbox.position.y), cropbox.width, cropbox.height, screenToWorldX(this.center.x - this.width / 2 + this.width / 10), screenToWorldY(this.center.y - this.height / 2 + this.height / 10), this.width, this.height)

        //healthBar
        this.healthbar.update();
    };

    update() {
        this.velocity.x = 0;
        this.velocity.y = 0;
        this.updateBoxes();
        this.draw();
        this.detectPlayer();
        this.followPlayer();
        this.applyVelocity();
        this.updateFrames();
        this.DestroyEnemies();
        this.handleCollision();
        this.CanAttack();
        this.Attack();
        this.healthbar.updateValues({ pos: { x: screenToWorldX(this.position.x - 70), y: screenToWorldY(this.position.y - 100) }, health: this.health });
    };
}

class Slime extends Enemy {
    constructor({ position = { x: 0, y: 0 }, dimensions = { width: 0, height: 0 }, source = './assets/enemies/slime/action.png', frameRate = 11, frameBuffer = 11, scale = 0.4, animations = {
        Idle: {
            source: './assets/enemies/slime/idle.png',
            frameBuffer: 1,
            frameRate: 1,
            image: new Image()
        },

        Action: {
            source: './assets/enemies/slime/action.png',
            frameBuffer: 11,
            frameRate: 11,
            image: new Image()
        },

    } }) {
        super({ position, dimensions, source, frameRate, frameBuffer, scale, animations });
    }

    draw() {
        this.center = {
            x: this.position.x - this.dimensions.width / 2,
            y: this.position.y - this.dimensions.height / 2,
        };

        if (!this.image) return;

        let cropbox = {
            position: {
                x: this.currentFrame * (this.image.width / this.frameRate),
                y: 0
            },
            width: this.image.width / this.frameRate,
            height: this.image.height
        };

        //ctx.fillStyle = 'blue';
        //ctx.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.dimensions.width, this.hitbox.dimensions.height);
        //ctx.fillStyle = 'brown';
        //ctx.fillRect(this.attackbox.position.x, this.attackbox.position.y, this.attackbox.dimensions.width, this.attackbox.dimensions.height);


        ctx.drawImage(this.image, cropbox.position.x, cropbox.position.y, cropbox.width, cropbox.height, screenToWorldX(this.position.x - this.width / 2 + this.width / 10), screenToWorldY(this.position.y - this.height / 2 + this.height / 10), this.width, this.height)
        this.healthbar.update();
    }

    receivingDamage(damage) {
        this.health -= damage;
        if (this.health <= 0) {
            this.health = 0;
            if (actualMission != '' && !this.dead) {
                actualMission.defeatedTargets++;
            }
            this.dead = true;
            this.switchSprite('Idle')
        }
    }


    update() {
        this.velocity.x = 0;
        this.velocity.y = 0;
        this.updateBoxes()
        this.draw();
        this.detectPlayer()
        this.followPlayer()
        this.applyVelocity();
        this.DestroyEnemies()
        this.handleCollision()
        this.updateFrames();
        this.CanAttack();
        this.Attack();
        this.healthbar.updateValues({ pos: { x: screenToWorldX(this.position.x - 5), y: screenToWorldY(this.position.y - 80) }, health: this.health });
    };
}

let enemies = [];