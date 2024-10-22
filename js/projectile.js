class Projectile extends Sprite {
    constructor({ position = { x: 0, y: 0 }, dimensions = { width: 0, height: 0 }, velocity = { x: 0, y: 0 } }) {
        super({ position, dimensions });
        this.damage = 1;
        this.shouldRemove = false;
        this.velocity = velocity;
        this.center = {
            x: this.position.x - this.dimensions.width / 2,
            y: this.position.y - this.dimensions.height / 2,
        };
        this.hitbox = {
            position: {
                x: this.center.x - 20,
                y: this.center.y - 20,
            },
            dimensions: {
                width: this.dimensions.width + 20 * 2,
                height: this.dimensions.height + 20 * 2,
            }
        };
    };

    aim() {
        const aux = {
            x: player.velocity.x,
            y: player.velocity.y
        }

        if (player.colliding.left || player.colliding.right) aux.x = 0
        if (player.colliding.up || player.colliding.down) aux.y = 0

        this.position.x += this.velocity.x - aux.x * deltaTime_Mult;
        this.position.y += this.velocity.y - aux.y * deltaTime_Mult;
    };

    updateHitbox() {
        this.center = {
            x: this.position.x - this.dimensions.width / 2,
            y: this.position.y - this.dimensions.height / 2,
        };
        this.hitbox = {
            position: {
                x: this.center.x - 20,
                y: this.center.y - 20,
            },
            dimensions: {
                width: this.dimensions.width + 20 * 2,
                height: this.dimensions.height + 20 * 2,
            }
        };
    };

    draw() {
        ctx.fillStyle = 'black';
        ctx.fillRect(this.center.x, this.center.y, this.dimensions.width, this.dimensions.height);
        // ctx.fillStyle = 'yellow';
        // ctx.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.dimensions.width, this.hitbox.dimensions.height);
    };

    autoRemove() {
        if (!this.shouldRemove) {
            setTimeout(() => {
                this.shouldRemove = true;
            }, 5000);
        };
    };

    update() {
        this.updateHitbox();
        this.applyVelocity();
        this.draw();
        this.aim();
        this.autoRemove();
    };
};

class magePower extends Projectile{
    constructor({ position = { x: 0, y: 0 }, dimensions = { width: 0, height: 0 }, velocity = { x: 0, y: 0 } }){
    super({ position, dimensions,velocity });
    }

    draw(){
        let image = new Image();
        image.src = './assets/projectiles/MagoAtaque.png';
        ctx.drawImage(image,this.center.x,this.center.y, this.dimensions.width, this.dimensions.height)
    }

    update() {
        this.updateHitbox();
        this.applyVelocity();
        this.draw();
        this.aim();
        this.autoRemove();
    };
}

class Arrow extends Projectile{
    constructor({ position = { x: 0, y: 0 }, dimensions = { width: 0, height: 0 }, velocity = { x: 0, y: 0 }, angle }){
    super({ position, dimensions,velocity });
    this.angle = angle
    }

    draw(){
        ctx.save();
        ctx.translate(this.position.x,this.position.y)
        ctx.rotate(this.angle - Math.PI)

        let image = new Image();
        image.src = './assets/projectiles/arrow.png';
        ctx.drawImage(image,0,0, this.dimensions.width, this.dimensions.height)
        ctx.restore()
    }

    update() {
        this.updateHitbox();
        this.applyVelocity();
        this.draw();
        this.aim();
        this.autoRemove();
    };
}