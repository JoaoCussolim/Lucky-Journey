class Enemy extends Sprite{
    constructor({position = {x: 0, y: 0}, dimensions = {width: 0, height: 0}}){
        super(position, dimensions);
    }

    draw(){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
    }
};

let testEnemy = new Enemy({position: {x: 100, y: 200}, dimensions: {width: 100, height: 100}})