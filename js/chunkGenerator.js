const chunkSize = 20; // Size of each chunk
const viewDistance = 0.5;

// Number of chunks to load around the player

let chunks = {}; // Object to store generated chunks

function generateChunk(x, y) {
    // Placeholder for chunk generation logic
    let chunk = [];
    for (let i = 0; i < chunkSize; i++) {
        chunk[i] = [];
        for (let j = 0; j < chunkSize; j++) {
            chunk[i][j] = Math.random() > 0.5 ? 1 : 0; // Simple example: 1 or 0
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
    let startX = Math.floor(player.position.x - viewDistance);
    let startY = Math.floor(player.position.y - viewDistance);
    let endX = Math.floor(player.position.x + viewDistance);
    let endY = Math.floor(player.position.y + viewDistance);

    console.log('Loading chunks from', startX, startY, 'to', endX, endY);

    // Load new chunks
    for (let x = startX; x <= endX; x++) {
        for (let y = startY; y <= endY; y++) {
            if (!chunks[`${x},${y}`]) {
                chunks[`${x},${y}`] = generateChunk(x, y);
            }
        }
    }

    // Draw chunks
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let x = startX; x <= endX; x++) {
        for (let y = startY; y <= endY; y++) {
            if (chunks[`${x},${y}`]) {
                drawChunk(chunks[`${x},${y}`], x, y);
            }
        }
    }
}



// KJADSFHBAILJSDHALIJSDH BALDHBALIUS