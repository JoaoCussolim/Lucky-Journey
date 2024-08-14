let acceptedKeys = {
    ArrowUp(player){
        player.velocity.y = 5;
    },
    ArrowDown(player){
        player.velocity.y = -5;
    },
    ArrowLeft(player){
        player.velocity.x = 5;
    },
    ArrowRight(player){
        player.velocity.x = -5;
    }
};

class Sprite{
    constructor({position = {x: 0, y: 0}, dimensions = {width: 0, height: 0}}){
        this.position = position;
        this.dimensions = dimensions;
        this.velocity = {
            x: 0,
            y: 0
        };
    }

    draw(){
        ctx.fillStyle = 'black';
        ctx.fillRect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
    }

    applyVelocity(){
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    update(){
        this.applyVelocity();
        this.draw();
    }
}

let player = new Sprite({position: {x: 100, y: 100}, dimensions: {width: 100, height: 100}})

addEventListener('keydown', (e) => {
    acceptedKeys(e.key)
})