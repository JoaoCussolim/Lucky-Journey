class Enemy extends Sprite {
    constructor({ position = { x: 0, y: 0 }, dimensions = { width: 0, height: 0 } }) {
        super({ position, dimensions });
        this.dead = false;
        this.playerOnRange = false;
        this.health = 100;
        this.healthbar = new Healthbar({
            maxHealth: 100,
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
    };

    applyVelocity() {
        if (this.velocity.x === 0 && this.velocity.y === 0) {
            this.position.x += this.velocity.x - player.velocity.x * 5 * deltaTime_Mult;
            this.position.y += this.velocity.y - player.velocity.y * 5 * deltaTime_Mult;
        } else {
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

    detectPlayer() {
        if (screenToWorldX(this.position.x + this.dimensions.width / 2) < 0 ||
            screenToWorldX(this.position.x - this.dimensions.width / 2) > canvas.width ||
            screenToWorldY(this.position.y + this.dimensions.height / 2) < 0 ||
            screenToWorldY(this.position.y - this.dimensions.height / 2) > canvas.height
        ) this.playerOnRange = false
        else this.playerOnRange = true
    }

    followPlayer() {
        if (!this.dead & this.playerOnRange) {
            if (screenToWorldX(player.position.x) > screenToWorldX(this.position.x + this.dimensions.width)) {
                this.velocity.y = 0;
                this.velocity.x = 5 * deltaTime_Mult;
            };
            if (screenToWorldX(player.position.x) < screenToWorldX(this.position.x - this.dimensions.width)) {
                this.velocity.y = 0;
                this.velocity.x = -5 * deltaTime_Mult;
            };
            if (screenToWorldY(player.position.y) > screenToWorldY(this.position.y + this.dimensions.height)) {
                this.velocity.x = 0;
                this.velocity.y = 5 * deltaTime_Mult;
            };
            if (screenToWorldY(player.position.y) < screenToWorldY(this.position.y - this.dimensions.height)) {
                this.velocity.x = 0;
                this.velocity.y = -5 * deltaTime_Mult;
            };
        };
    };


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
        ctx.fillStyle = 'cyan';
        ctx.fillRect(screenToWorldX(this.center.x), screenToWorldY(this.center.y), this.dimensions.width, this.dimensions.height);

        //healthBar
        this.healthbar.update();

    };

    update() {
        this.velocity.x = 0;
        this.velocity.y = 0;
        this.updateBoxes()
        this.draw();
        this.detectPlayer()
        this.followPlayer()
        this.applyVelocity();
        this.DestroyEnemies()
        this.healthbar.updateValues({ pos: { x: screenToWorldX(this.position.x - 50), y: screenToWorldY(this.position.y - 100) }, health: this.health });
    };
};

let enemies = [];