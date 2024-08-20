const chunkSize = 80;
const viewDistance = 1;

let playerPosition = {x: 0, y:0}

let chunks = {};

function generateChunk(x, y) {
    let chunk = [];
    for (let i = 0; i < chunkSize; i++) {
        chunk[i] = [];
        for (let j = 0; j < chunkSize; j++) {
            chunk[i][j] = Math.random() > 0.5 ? 1 : 0;
        }
    }
    return chunk;
}

function drawChunk(chunk, x, y) {
    // Draw the chunk on the canvas
    for (let i = 0; i < chunkSize; i++) {
        for (let j = 0; j < chunkSize; j++) {
            if (chunk[i][j] === 1) {
                ctx.fillStyle = 'green';
                ctx.fillRect((x * chunkSize + i) * 10, (y * chunkSize + j) * 10, 10, 10);
            }
        }
    }
}

function updateChunks() {
    let startX = Math.floor(playerPosition.x - viewDistance);
    let startY = Math.floor(playerPosition.y - viewDistance);
    let endX = Math.floor(playerPosition.x + viewDistance);
    let endY = Math.floor(playerPosition.y + viewDistance);

    console.log('Loading chunks from', startX, startY, 'to', endX, endY);

    for (let x = startX; x <= endX; x++) {
        for (let y = startY; y <= endY; y++) {
            if (!chunks[`${x},${y}`]) {
                chunks[`${x},${y}`] = generateChunk(x, y);
            }
        }
    }

    for (let x = startX; x <= endX; x++) {
        for (let y = startY; y <= endY; y++) {
            if (chunks[`${x},${y}`]) {
                drawChunk(chunks[`${x},${y}`], x, y);
            }
        }
    }
}