class Healthbar{
constructor({maxHealth, pos, size}){
this.maxHealth = maxHealth;
this.health = maxHealth;
this.healthTaken = 0;
this.pos = pos;
this.size = size;
this.healthBefore = this.health;
}

draw(){
    // draw the health bar

    ctx.fillStyle = 'black';
    ctx.fillRect(this.pos.x - 1,this.pos.y - 1,this.size.w + 2,this.size.h + 2);
    
    //damage bar
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.pos.x,this.pos.y,this.size.w * (this.healthTaken/this.maxHealth),this.size.h);

    //current life bar
    ctx.fillStyle = "green";
    ctx.fillRect(this.pos.x,this.pos.y,this.size.w * (this.health/this.maxHealth),this.size.h);
}


updateValues({pos,health}){
    this.pos = pos;
    this.health = health;
}

update(){
    this.draw();
    //console.table({health: this.health, healthBefore:this.healthBefore})
    if(!(this.health < this.healthBefore)){
        if(this.healthTaken > this.health){
            this.healthTaken -= 1;
        }
    }
    

    this.healthBefore = this.health;

}
}