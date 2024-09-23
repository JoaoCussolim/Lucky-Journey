let lockCamera;

class Player extends Sprite {
    constructor({ position = { x: 0, y: 0 }, dimensions = { width: 0, height: 0 } }) {
        super({ position, dimensions });
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

        this.inventory = new inventory()
    };

    shouldPanCameraHorizontal() {
        // Move background and player if no collision horizontally
        if (!this.colliding || this.velocity.x === 0) {
            backgroundVelocity.x = this.velocity.x;
            if(!backgroundLocked) backgroundPositions.x += backgroundVelocity.x;
            this.position.x -= this.velocity.x; // Move player
        }
    }
    
    shouldPanCameraVertical() {
        // Move background and player if no collision vertically
        if (!this.colliding || this.velocity.y === 0) {
            backgroundVelocity.y = this.velocity.y;
            if(!backgroundLocked) backgroundPositions.y += backgroundVelocity.y;
            this.position.y -= this.velocity.y; // Move player
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

        this.shouldPanCameraHorizontal();
        this.shouldPanCameraVertical();

        this.inventory.update()
        this.detectColliding()
        // this.applyVelocity()
    };
};

let player = new Player({ position: { x: 950, y: 600 }, dimensions: { width: 50, height: 50 } });

let acceptedKeys = {
    ArrowUp(player) {
        player.velocity.x = 0;
        player.velocity.y = -5 * deltaTime_Mult;
    },
    ArrowDown(player) {
        player.velocity.x = 0;
        player.velocity.y = 5 * deltaTime_Mult;
    },
    ArrowLeft(player) {
        player.velocity.y = 0;
        player.velocity.x = -5 * deltaTime_Mult;
    },
    ArrowRight(player) {
        player.velocity.y = 0;
        player.velocity.x = 5 * deltaTime_Mult;
    }
};

let keyUpKeys = {
    ArrowUp(player) {
        if (player.velocity.y < 0) player.velocity.y = 0;
    },
    ArrowDown(player) {
        if (player.velocity.y > 0) player.velocity.y = 0;
    },
    ArrowLeft(player) {
        if (player.velocity.x < 0) player.velocity.x = 0;
    },
    ArrowRight(player) {
        if (player.velocity.x > 0) player.velocity.x = 0;
    }
};

let projectiles = [];

