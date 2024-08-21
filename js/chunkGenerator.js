let chunkWidth = 40;
let chunkHeight = 40;
let viewDistanceWidth = 1;
let viewDistanceHeight = 1;

let playerPosition = {x: 0, y:0}

let chunks = {};

let generateChunk = (x, y) => {
    let chunk = [];
    for (let i = 0; i < chunkWidth; i++) {
        chunk[i] = [];
        for (let j = 0; j < chunkHeight; j++) {
            chunk[i][j] = Math.random() > 0.5 ? 1 : 0;
        }
    }
    return chunk;
}

let drawChunk = (chunk, x, y) => {
    for (let i = 0; i < chunkWidth; i++) {
        for (let j = 0; j < chunkHeight; j++) {
            if (chunk[i][j] === 1) ctx.fillStyle = 'green';
            else ctx.fillStyle = 'blue';
            ctx.fillRect((x * chunkWidth + i) * 10, (y * chunkHeight + j) * 10, 10, 10);
        }
    }
}

let updateChunks = () => {
    let startX = Math.floor(playerPosition.x / chunkWidth - viewDistanceWidth);
    let startY = Math.floor(playerPosition.y / chunkHeight - viewDistanceWidth);
    let endX = Math.floor(playerPosition.x / chunkWidth + viewDistanceHeight);
    let endY = Math.floor(playerPosition.y / chunkHeight + viewDistanceHeight);

    console.log('Loading chunks from', startX, startY, 'to', endX, endY);

    for (let x = startX; x <= endX; x++) {
        for (let y = startY; y <= endY; y++) {
            if (!chunks[`${x},${y}`]) {
                chunks[`${x},${y}`] = generateChunk(x, y);
            }
            drawChunk(chunks[`${x},${y}`], x, y);
            console.table({position: `${x},${y}`})
        }
    }
}
    
let movePlayer = (newX, newY) =>{
    if(newX != playerPosition.x){
        playerPosition.x = newX;
    }
    if(newY != playerPosition.y){
        playerPosition.y = newY;
    }
    updateChunks()
}