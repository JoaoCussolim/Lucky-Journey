class Enemy extends Sprite{
    constructor({position = {x: 0, y: 0}, dimensions = {width: 0, height: 0}}){
        super({position, dimensions});
        this.health = 100;
        this.center = {
            x: this.position.x + this.dimensions.width/2,
            y: this.position.y + this.dimensions.height/2,
        };
    }

    applyVelocity(){
        if(this.velocity.x === 0 && this.velocity.y === 0){
            this.position.x += this.velocity.x - backgroundVelocity.x * 5;
            this.position.y += this.velocity.y - backgroundVelocity.y * 5;
        }else{
            this.position.x += this.velocity.x - backgroundVelocity.x * 2;
            this.position.y += this.velocity.y - backgroundVelocity.y * 2;
        }
    }

    followPlayer(){
        if(player.position.x > this.position.x + this.dimensions.width){
            this.velocity.y = 0
            this.velocity.x = 5
        }
        if(player.position.x < this.position.x - this.dimensions.width){
            this.velocity.y = 0
            this.velocity.x = -5
        }
        if(player.position.y > this.position.y + this.dimensions.width){
            this.velocity.x = 0
            this.velocity.y = 5
        }
        if(player.position.y < this.position.y - this.dimensions.width){
            this.velocity.x = 0
            this.velocity.y = -5
        }
    }

    draw(){
        this.center = {
            x: this.position.x + this.dimensions.width/2,
            y: this.position.y + this.dimensions.height/2,
        };
        ctx.fillStyle = 'red';
        ctx.fillRect(this.center.x, this.center.y, this.dimensions.width, this.dimensions.height);
    }

    update(){
        this.velocity.x = 0;
        this.velocity.y = 0;
        this.draw();
        this.followPlayer()
        this.applyVelocity();
    }
};

let testEnemy = new Enemy({position: {x: 500, y: 500}, dimensions: {width: 100, height: 100}})

let enemies = [testEnemy]