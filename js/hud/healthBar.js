class Healthbar {
    constructor({ maxHealth, pos, size }) {
        this.maxHealth = maxHealth;
        this.health = maxHealth;
        this.healthTaken = maxHealth;
        this.pos = pos;
        this.size = size;
        this.healthBefore = this.health;
        this.delay = 30;
    }

    draw() {
        // draw the health bar

        ctx.fillStyle = 'black';
        ctx.fillRect(this.pos.x - 1, this.pos.y - 1, this.size.w + 2, this.size.h + 2);

        //damage bar
        ctx.fillStyle = "rgb(255,255,55)";
        ctx.fillRect(this.pos.x, this.pos.y, this.size.w * (this.healthTaken / this.maxHealth), this.size.h);

        //current life bar
        ctx.fillStyle = "red";
        ctx.fillRect(this.pos.x, this.pos.y, this.size.w * (this.health / this.maxHealth), this.size.h);
    }


    updateValues({ pos, health }) {
        this.pos = pos;
        this.health = health;
    }

    update() {
        this.draw();
        //console.table({health: this.health, healthBefore:this.healthBefore})
        if (!(this.health < this.healthBefore)) {
            if (this.healthTaken > this.health) {
                if (this.delay <= 0) {
                    this.healthTaken -= 2;
                } else this.delay--;
            }
        }


        this.healthBefore = this.health;

    }
}