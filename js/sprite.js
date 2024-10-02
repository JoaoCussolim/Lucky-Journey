class Sprite {
    constructor({ position = { x: 0, y: 0 }, dimensions = { width: 0, height: 0 } }) {
        this.position = position;
        this.dimensions = dimensions;
        this.velocity = {
            x: 0,
            y: 0
        };
        this.colliding = {
            left: false,
            right: false,
            up: false,
            down: false
        };
    };

    draw() {
        ctx.fillStyle = 'black';
        ctx.fillRect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
    };

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
                }else{
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



    applyVelocity() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    };

    update() {
        this.applyVelocity();
        this.draw();
    };
};