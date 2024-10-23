class Projectile extends AnimatedSprite {
    constructor({ position = { x: 0, y: 0 }, dimensions = {width: 0, height: 0}, source, frameRate = 1, frameBuffer = 3, scale = 1,velocity={x:0, y:0}, animations = {},damage = 1 }) {
        super({ position, dimensions, source, frameRate, frameBuffer, scale, animations  });
        this.damage = damage;
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

class Raio extends Projectile{
    constructor({ position = { x: 0, y: 0 }, dimensions = { width: 0, height: 0 }, source = './assets/projectiles/raio.png', frameRate = 4, frameBuffer = 4, velocity = {x:0, y:0}, scale = 3, animations = {
        Idle: {
            source: './assets/projectiles/raio.png',
            frameBuffer: 4,
            frameRate: 4,
            image: new Image()

        },
    }}){
    super({ position, dimensions,velocity, source, frameRate, frameBuffer, scale, animations  });
    }

    draw(){
        this.center = {
            x: this.position.x - this.dimensions.width / 2,
            y: this.position.y - this.dimensions.height / 2,
        }

        if (!this.image) return;

        let cropbox = {
            position: {
                x: this.currentFrame * (this.image.width / this.frameRate),
                y: 0
            },
            width: this.image.width / this.frameRate,
            height: this.image.height
        };

        ctx.drawImage(
            this.image,
            cropbox.position.x,
            cropbox.position.y,
            cropbox.width,
            cropbox.height,
            (this.position.x - this.width / 2 + this.width / 3),
            (this.position.y - this.height / 2 + this.height / 5),
            this.width,
            this.height
        );
    }

    updateHitbox() {
        this.center = {
            x: this.position.x - this.dimensions.width / 2,
            y: this.position.y - this.dimensions.height / 2,
        };
        this.hitbox = {
            position: {
                x: this.center.x + 120,
                y: this.center.y + 80,
            },
            dimensions: {
                width: this.dimensions.width + 20 * 2,
                height: this.dimensions.height + 20 * 2,
            }
        };
    };

    update() {
        this.updateHitbox();
        this.applyVelocity();
        this.draw();
        this.aim();
        this.autoRemove();
        this.updateFrames();
    };
}

class Swing extends Projectile{
    constructor({ position = { x: 0, y: 0 }, dimensions = { width: 0, height: 0 }, velocity = { x: 0, y: 0 } }){
    super({ position, dimensions,velocity });
    }

    draw(){
        // ctx.fillStyle = 'yellow';
        // ctx.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.dimensions.width, this.hitbox.dimensions.height);
    }
    autoRemove() {
        if (!this.shouldRemove) {
            setTimeout(() => {
                this.shouldRemove = true;
            }, 1000);
        };
    };

    update() {
        this.updateHitbox();
        this.applyVelocity();
        this.draw();
        this.aim();
        this.autoRemove();
    };

}