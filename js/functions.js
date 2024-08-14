//wait function

function wait(millis) {
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while (curDate - date < millis);
};



//random number function
function RandomInt(min, max) {
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


canvas.onmousemove = function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
};


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