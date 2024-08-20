class Enemy extends Sprite{
    constructor({position = {x: 0, y: 0}, dimensions = {width: 0, height: 0}}){
        super({position, dimensions});
        this.health = 100;
        this.healthbar = new Healthbar({
            maxHealth:100,
            pos:{x:this.position.x, y:this.position.y - 50},
            size: {w:this.dimensions.width, h:20}
            
        });
        this.center = {
            x: this.position.x - this.dimensions.width/2,
            y: this.position.y - this.dimensions.height/2,
        };
        this.hitbox = {
            position: {
                x: 0,
                y: 0,
            },
            dimensions:{
                width: 0,
                height: 0,
            }
        };
        this.attackbox = {
            position: {
                x: 0,
                y: 0,
            },
            dimensions:{
                width: 0,
                height: 0,
            }
        }
    };

    applyVelocity(){
        if(this.velocity.x === 0 && this.velocity.y === 0){
            this.position.x += this.velocity.x - backgroundVelocity.x * 5 * deltaTime_Mult;
            this.position.y += this.velocity.y - backgroundVelocity.y * 5 * deltaTime_Mult;
        }else{
            this.position.x += this.velocity.x - backgroundVelocity.x * 2 * deltaTime_Mult;
            this.position.y += this.velocity.y - backgroundVelocity.y * 2 * deltaTime_Mult;
        };
    };

    receivingDamage(damage){
        this.health -= damage;
        if(this.health <= 0){
            let eIndex = enemies.findIndex(enemy => {
                return enemy.position.x === this.position.x && enemy.position.y === this.position.y
            })
            enemies.splice(eIndex, 1)
        }
    }

    followPlayer(){
        if(player.position.x > this.position.x + this.dimensions.width){
            this.velocity.y = 0;
            this.velocity.x = 5;
        };
        if(player.position.x < this.position.x - this.dimensions.width){
            this.velocity.y = 0;
            this.velocity.x = -5;
        };
        if(player.position.y > this.position.y + this.dimensions.width){
            this.velocity.x = 0;
            this.velocity.y = 5;
        };
        if(player.position.y < this.position.y - this.dimensions.width){
            this.velocity.x = 0;
            this.velocity.y = -5;
        };
    };

    updateBoxes(){
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
        this.attackbox = {
            position: {
                x: this.center.x - 50,
                y: this.center.y - 50,
            },
            dimensions:{
                width: this.dimensions.width + 50 * 2,
                height: this.dimensions.height + 50 * 2,
            }
        }
    }

    draw(){
        this.center = {
            x: this.position.x - this.dimensions.width/2,
            y: this.position.y - this.dimensions.height/2,
        };
        //ctx.fillStyle = 'blue';
        //ctx.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.dimensions.width, this.hitbox.dimensions.height);
        //ctx.fillStyle = 'brown';
        //ctx.fillRect(this.attackbox.position.x, this.attackbox.position.y, this.attackbox.dimensions.width, this.attackbox.dimensions.height);
        ctx.fillStyle = 'red';
        ctx.fillRect(this.center.x, this.center.y, this.dimensions.width, this.dimensions.height);

        //healthBar
        this.healthbar.update();

    };

    update(){
        this.velocity.x = 0;
        this.velocity.y = 0;
        this.updateBoxes()
        this.draw();
        this.followPlayer()
        this.applyVelocity();
        this.healthbar.updateValues({pos:{x:this.position.x - 50,y:this.position.y - 100}, health: this.health});
    };
};

let enemies = [];