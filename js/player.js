class Player extends Sprite{
    constructor({position = {x: 0, y: 0}, dimensions = {width: 0, height: 0}}){
        super({position, dimensions});
    };
};

let player = new Player({ position: { x: 100, y: 100 }, dimensions: { width: 100, height: 100 } });

let acceptedKeys = {
    ArrowUp(player) {
        player.velocity.x = 0;
        player.velocity.y = -5;
    },
    ArrowDown(player) {
        player.velocity.x = 0;
        player.velocity.y = 5;
    },
    ArrowLeft(player) {
        player.velocity.y = 0;
        player.velocity.x = -5;
    },
    ArrowRight(player) {
        player.velocity.y = 0;
        player.velocity.x = 5;
    }
};

let keyUpKeys = {
    ArrowUp(player) {
        if(player.velocity.y < 0) player.velocity.y = 0;
    },
    ArrowDown(player) {
        if(player.velocity.y > 0) player.velocity.y = 0;
    },
    ArrowLeft(player) {
        if(player.velocity.x < 0) player.velocity.x = 0;
    },
    ArrowRight(player) {
        if(player.velocity.x > 0) player.velocity.x = 0;
    }
};

addEventListener('keydown', (e) => {
    if(acceptedKeys[e.key]) acceptedKeys[e.key](player);
    if(e.key === 'k') dice.rollable = true;
});

addEventListener('keyup', (e) => {
    if(acceptedKeys[e.key]) keyUpKeys[e.key](player);
});