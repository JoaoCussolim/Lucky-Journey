class CollisionBlock {
    constructor({ position = { x: 0, y: 0 }, size }) {
        this.position = position;
        this.size = size;
    }
}

class CollisionBlocks {
    constructor() {
        this.collisionBlocksList = collisionBlocksList;
    }

    // Add a new collision block
    createBlock({ position = { x: 0, y: 0 }, size = 0 }) {
        const collisionBlock = new CollisionBlock({ position, size });
        this.collisionBlocksList.push(collisionBlock);
    }
}

const collisionBlocksList = []
const collisionBlocksClass = new CollisionBlocks();
