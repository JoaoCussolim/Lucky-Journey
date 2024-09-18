let drawLine = (x1, y1, x2, y2, color) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.stroke();
}

let scale = 1;

let screenToWorldX = (x) => {
    return (x / scale) + backgroundPositions.x;
};

let screenToWorldY = (y) => {
    return (y / scale) + backgroundPositions.y;
};

let worldToScreenX = (x) => {
    return (x - backgroundPositions.x) * scale;
};

let worldToScreenY = (y) => {
    return (y - backgroundPositions.y) * scale;
};

let lineSpace = 30;

let width = screenToWorldX(canvas.width) + lineSpace;
let height = screenToWorldY(canvas.height) + lineSpace;

let canvasResize = (window) => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    width = screenToWorldX(canvas.width) + lineSpace;
    height = screenToWorldY(canvas.height) + lineSpace;
}

let drawSquares = (x, y) => {
    const seed = x * 100000 + y;
    let rng = new RandomNumberGenerator(seed)
    let position = { x: x, y: y }
    let size = lineSpace * scale
    let r = rng.nextInt(0, 255);
    let g = rng.nextInt(0, 255);
    let b = rng.nextInt(0, 255);
    ctx.fillStyle = `rgba(${r}, ${g}, ${b})`
    ctx.fillRect(worldToScreenX(position.x), worldToScreenY(position.y), size, size)
}

let drawGrid = () => {
    const stw0x = screenToWorldX(0);
    const stw0y = screenToWorldY(0);

    const initialX = Math.floor(stw0x / lineSpace) * lineSpace;
    const initialY = Math.floor(stw0y / lineSpace) * lineSpace;

    const stw1x = screenToWorldX(canvas.width);
    const stw1y = screenToWorldY(canvas.height);

    const finalX = Math.ceil(stw1x / lineSpace) * lineSpace;
    const finalY = Math.ceil(stw1y / lineSpace) * lineSpace;

    for (let y = initialY; y < finalY; y += lineSpace) {
        drawLine(0, worldToScreenY(y), canvas.width, worldToScreenY(y), 'white')
    }

    for (let x = initialX; x < finalX; x += lineSpace) {
        drawLine(worldToScreenX(x), 0, worldToScreenX(x), canvas.height, 'white')
    }
}

let drawPixels = () => {
    const stw0x = screenToWorldX(0);
    const stw0y = screenToWorldY(0);

    const initialX = Math.floor(stw0x / lineSpace) * lineSpace;
    const initialY = Math.floor(stw0y / lineSpace) * lineSpace;

    const stw1x = screenToWorldX(canvas.width);
    const stw1y = screenToWorldY(canvas.height);

    const finalX = Math.ceil(stw1x / lineSpace) * lineSpace;
    const finalY = Math.ceil(stw1y / lineSpace) * lineSpace;

    for (let y = initialY; y < finalY; y += lineSpace) {
        for (let x = initialX; x < finalX; x += lineSpace) {
            drawSquares(x, y);
        }
    }
}

const rng = new RandomNumberGenerator()

const directory = './assets/images/'

const greenBiome = {
    terrainImages: [directory + 'grass.png', directory + 'tallgrass.png', directory + 'flower.png', directory + 'flower2.png', directory + 'mushroom.png', directory + 'mushroom2.png', directory + 'stones.png', directory + 'stones2.png'],
    treeImages: [directory + 'tree1.png'],
    lakeImages: [directory + 'waterborderleft.png', directory + 'grassborderleftup.png', directory + 'grassborderleftdown.png', directory + 'waterborderright.png', directory + 'grassborderrightup.png', directory + 'grassborderrightdown.png', directory + 'waterborderup.png', directory + 'waterborderdown.png', directory + 'water.png'],
    blockRarities: [0, 0.2, 0.98, 0.98, 0.99, 0.98, 0.98, 0.98],
    isInfinite: true,
}

const biome = new Biome({ biome: greenBiome })