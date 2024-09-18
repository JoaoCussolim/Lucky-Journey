//wait function

function wait(millis) {
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while (curDate - date < millis);
};



//random number function
RandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

//Draw Line function
function line(x, y, fx, fy) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(fx, fy);
    ctx.strokeStyle = 'white';

    ctx.stroke();
};



// Mouse Colide Function

let mouse = {
    x: undefined,
    y: undefined
};

let textSize = (size) =>{
    ctx.font = size + "px Pixeloid"
}


canvas.onmousemove = function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
};

let shootAngle;

let getMouseAngle = () => {
    if (mouse.x >= screenToWorldX(player.position.x)) {
        shootAngle = Math.atan((mouse.y - screenToWorldY(player.position.y)) / (mouse.x - screenToWorldX(player.position.x)));
    } else {
        shootAngle = (Math.atan((mouse.y - screenToWorldY(player.position.y)) / (mouse.x - screenToWorldX(player.position.x)))) + Math.PI;
    }
}

let isInsideButton = (rect = { x: 0, y: 0, width: 0, height: 0 }) => {
    return mouse.x > rect.x && mouse.x < rect.x + rect.width && mouse.y < rect.y + rect.height && mouse.y > rect.y;
};


// Colide Circle Function

let circleCollision = (circle1, circle2) => {
    let xDiff = circle2.pos.x - circle1.pos.x;
    let yDiff = circle2.pos.y - circle1.pos.y;

    let diff = Math.sqrt((xDiff ** 2) + (yDiff ** 2));

    if (diff <= circle1.radius + circle2.radius) {

        return true;
    }
    return false;
};


let makeEnemies = (quantity) => {
    for (let i = 0; i < quantity; i++) {
        let cordinatesValuex = RandomInt(0, canvas.width);
        let cordinatesValuey = RandomInt(0, canvas.height);
        enemies.push(new Enemy({ position: { x: cordinatesValuex, y: cordinatesValuey }, dimensions: { width: 100, height: 100 } }))
    };
};

function drawBorder(x, y, width, height, borderSize, borderColor) {
    // Draw the outer border using stroke
    ctx.beginPath();
    ctx.save()
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = borderSize;

    // Draw the rectangle border
    ctx.rect(x, y, width, height);
    ctx.stroke();
    ctx.restore()
    ctx.closePath()
}

function drawTriangle(x1, y1, x2, y2, x3, y3) {
    ctx.beginPath();
    ctx.moveTo(x1, y1); // Move to the first vertex
    ctx.lineTo(x2, y2); // Draw a line to the second vertex
    ctx.lineTo(x3, y3); // Draw a line to the third vertex
    ctx.closePath(); // Close the path to create the triangle shape
    ctx.stroke(); // Draw the outline of the triangle
    ctx.fill();   // Fill the triangle (optional)
}