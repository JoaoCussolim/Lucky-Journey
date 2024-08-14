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