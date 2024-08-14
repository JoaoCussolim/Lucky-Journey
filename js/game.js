let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');


let dice = new Dice({
    sides: 20
});


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let animate = () => {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    player.update();
    dice.update();
    testEnemy.update();
};

setTimeout(() => {
    animate();
}, 500);