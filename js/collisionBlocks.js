class CollisionBlock {
    constructor({ position = { x: 0, y: 0 }, size }) {
        this.position = position
        this.size = size
        this.colliding = false
    }

    update(collisionObject) {
        const sign = (Math.sign(collisionObject.position.x) * Math.sign(collisionObject.position.y)) > 0 ? 1 : -1;
        const radius = this.size - collisionObject.dimensions.width / 2;
        const wtsX = worldToScreenX(this.position.x);
        const wtsY = worldToScreenY(this.position.y);
        if ((wtsX + radius > collisionObject.hitbox.position.x && wtsX - radius < collisionObject.hitbox.position.x) &&
            (wtsY + radius > collisionObject.hitbox.position.y && wtsY - radius < collisionObject.hitbox.position.y) &&
            !this.colliding && !collisionObject.colliding
        ) {
            collisionObject.colliding = true;
            this.colliding = true;
            collisionObject.position.x -= sign * collisionObject.velocity.x;
            collisionObject.position.y -= sign * collisionObject.velocity.y;
        }
        else {
            this.colliding = false;
        }
    }
}

class CollisionBlocks {
    constructor() {
        this.collisionBlocksList = collisionBlocksList
    }

    createBlock({ position = { x: 0, y: 0 }, size = 0 }) {
        const collisionBlock = new CollisionBlock({ position, size })
        this.collisionBlocksList.push(collisionBlock)
    }

    update(collisionObject) {
        for (let i = this.collisionBlocksList.length - 1; i >= 0; i--) {
            const block = this.collisionBlocksList[i]
            block.update(collisionObject)
        }
    }
}

const collisionBlocksList = []
const collisionBlocksClass = new CollisionBlocks()