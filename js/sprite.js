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
        let isColliding = false;

        for (const block of collisionBlocksList) {
            if (this.collidesWith(block)) {
                isColliding = true;
                this.colliding = true;
                this.handleCollision(block);
                break;
            }
        }

        if (!isColliding) {
            this.colliding = false;
            backgroundLocked = true;
        }
    }


    collidesWith(block) {
        const stwX = screenToWorldX(this.position.x);
        const stwY = screenToWorldY(this.position.y);
        const stwX2 = screenToWorldX(this.position.x + this.dimensions.width);
        const stwY2 = screenToWorldY(this.position.y + this.dimensions.height);
        const bX = worldToScreenX(block.position.x);
        const bY = worldToScreenY(block.position.y);
        const bX2 = worldToScreenX(block.position.x + block.size);
        const bY2 = worldToScreenY(block.position.y + block.size);

        return stwX2 >= bX
            && stwX <= bX2
            && stwY2 >= bY
            && stwY <= bY2
    }


    handleCollision(block) {
        const playerBottom = screenToWorldY(this.position.y + this.dimensions.height);
        const playerTop = screenToWorldY(this.position.y);
        const playerRight = screenToWorldX(this.position.x + this.dimensions.width);
        const playerLeft = screenToWorldX(this.position.x);

        const blockBottom = worldToScreenY(block.position.y + block.size);
        const blockTop = worldToScreenY(block.position.y);
        const blockRight = worldToScreenX(block.position.x + block.size);
        const blockLeft = worldToScreenX(block.position.x);

        // Check vertical collisions
        if (this.velocity.y > 0 && playerBottom > blockTop && playerTop < blockTop) {
            // Player moving down and hitting the top of the block
            this.position.y -= this.velocity.y; // Set player just above the block
            this.velocity.y = 0; // Stop downward movement
            backgroundLocked = true
        } else if (this.velocity.y < 0 && playerTop < blockBottom && playerBottom > blockBottom) {
            // Player moving up and hitting the bottom of the block
            this.position.y -= this.velocity.y; // Set player just below the block
            this.velocity.y = 0; // Stop upward movement
            backgroundLocked = true
        }

        // Check horizontal collisions
        if (this.velocity.x > 0 && playerRight > blockLeft && playerLeft < blockLeft) {
            // Player moving right and hitting the left side of the block
            this.position.x -= this.velocity.x; // Set player just to the left of the block
            this.velocity.x = 0; // Stop rightward movement
            backgroundLocked = true;
        } else if (this.velocity.x < 0 && playerLeft < blockRight && playerRight > blockRight) {
            // Player moving left and hitting the right side of the block
            this.position.x -= this.velocity.x; // Set player just to the right of the block
            this.velocity.x = 0; // Stop leftward movement
            backgroundLocked = true
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