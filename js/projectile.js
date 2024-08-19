class Projectile extends Sprite{
    constructor({ position = { x: 0, y: 0 }, dimensions = { width: 0, height: 0 }, velocity = {x: 0, y: 0} }){
        super({position, dimensions});
        this.damage = 10;
        this.shouldRemove = false;
        this.velocity = velocity;
    };
    aim(){
        this.position.x += this.velocity.x - backgroundVelocity.x;
        this.position.y += this.velocity.y - backgroundVelocity.y;
    };    
    draw() {
        ctx.fillStyle = 'black';
        ctx.fillRect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
    };
    autoRemove(){
        if(!this.shouldRemove){
            setTimeout(() => {
                this.shouldRemove = true
            }, 5000);
        }
    }
    update(){
        this.applyVelocity();
        this.draw();
        this.aim();
        this.autoRemove();
    };
};