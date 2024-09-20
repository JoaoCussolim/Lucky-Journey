class Sprite {
    constructor({ position = { x: 0, y: 0 }, dimensions = { width: 0, height: 0 } }) {
        this.position = position;
        this.dimensions = dimensions;
        this.velocity = {
            x: 0,
            y: 0
        };
        this.colliding = false;
    };

    draw() {
        ctx.fillStyle = 'black';
        ctx.fillRect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
    };

    detectColliding() {
        this.colliding = false; // Reset collision status
        for (const block of collisionBlocksList) {
            if (this.collidesWith(block)) {
                this.colliding = true;
                this.handleCollision(block);
                break;
            }
        }
    }

    collidesWith(block) {
        const collide =
            screenToWorldX(this.position.x) + this.dimensions.width > block.size &&
            block.size + worldToScreenX(block.position.x) > screenToWorldX(this.position.x) &&
            screenToWorldY(this.position.y) + this.dimensions.height > block.size &&
            block.size + worldToScreenY(block.position.y) > screenToWorldY(this.position.y)
        console.log(collide)

    }


    handleCollision(block) {
        // Horizontal collision
        if (Math.sign(this.velocity.x) != Math.sign(backgroundPositions.x)) {
            this.position.x -= this.velocity.x;
            this.velocity.x = 0;
        }

        // Vertical collision (falling down)
        if (this.velocity.y > 0) {
            this.position.y -= this.velocity.y;
            this.velocity.y = 0; // Stop downward motion
        }
        // Vertical collision (going up)
        else if (this.velocity.y < 0) {
            this.position.y -= this.velocity.y;
            this.velocity.y = 0; // Stop upward motion
        }
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