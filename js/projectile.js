class Projectile extends Sprite{
    constructor({ position = { x: 0, y: 0 }, dimensions = { width: 0, height: 0 }, velocity = {x: 0, y: 0} }){
        super({position, dimensions});
        this.damage = 1;
        this.shouldRemove = false;
        this.velocity = velocity;
        this.center = {
            x: this.position.x + this.dimensions.width/2,
            y: this.position.y + this.dimensions.height/2,
        };
        this.hitbox = {
            position: {
                x: this.center.x - 20,
                y: this.center.y - 20,
            },
            dimensions:{
                width: this.dimensions.width + 20 * 2,
                height: this.dimensions.height + 20 * 2,
            }
        };
    };

    aim(){
        this.position.x += this.velocity.x - backgroundVelocity.x * deltaTime_Mult;
        this.position.y += this.velocity.y - backgroundVelocity.y * deltaTime_Mult;
    };

    updateHitbox(){
        this.center = {
            x: this.position.x + this.dimensions.width/2,
            y: this.position.y + this.dimensions.height/2,
        };
        this.hitbox = {
            position: {
                x: this.center.x - 20,
                y: this.center.y - 20,
            },
            dimensions:{
                width: this.dimensions.width + 20 * 2,
                height: this.dimensions.height + 20 * 2,
            }
        };
    };

    draw() {
        ctx.fillStyle = 'black';
        ctx.fillRect(this.center.x, this.center.y, this.dimensions.width, this.dimensions.height);
        //ctx.fillStyle = 'yellow';
        //ctx.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.dimensions.width, this.hitbox.dimensions.height);
    };

    autoRemove(){
        if(!this.shouldRemove){
            setTimeout(() => {
                this.shouldRemove = true;
            }, 5000);
        };
    };

    update(){
        this.updateHitbox();
        this.applyVelocity();
        this.draw();
        this.aim();
        this.autoRemove();
    };
};