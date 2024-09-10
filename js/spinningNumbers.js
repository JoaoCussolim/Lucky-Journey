possiveisValores = [0,1,2,3,4,5,6,7,8,9,69,'🎰','🍋','B','♀','♪','💀']

class SpinningNumber {
    constructor(pos,finalValue,size,finalY) {
        this.value = [0, 0, 0];
        this.finalValue = finalValue;
        this.finalY = finalY;
        this.pos = pos;
        this.stoped = false;
        this.size = size;
        this.pos2 = {x:pos.x, y:pos.y + 150}
        this.pos3 = {x:pos.x, y:pos.y - 150}
        this.limit = 650
        this.randomizeValue(0);
        this.randomizeValue(2);
        this.randomizeValue(1);
       }

    randomizeValue(index){
        let x = RandomInt(0,possiveisValores.length - 1);
        this.value[index] = possiveisValores[x];
        

    }

    stop(){
        this.stoped = true;
    }

    draw(){
        ctx.font = this.size + 'px arial';
        ctx.fillText(this.value[0],this.pos.x,this.pos.y)
        if(!this.stoped){
        ctx.fillText(this.value[1],this.pos2.x,this.pos2.y)
        ctx.fillText(this.value[2],this.pos3.x,this.pos3.y)
        }
    }

    update(){
        this.draw();

        if(!this.stoped){
        this.pos.y += 25;
        this.pos2.y += 25;
        this.pos3.y += 25;

        if(this.pos.y + this.size >= this.limit){
            this.pos.y = 100;
            this.randomizeValue(0);
        }
        if(this.pos2.y + this.size >= this.limit){
            this.pos2.y = 100;
            this.randomizeValue(1);
        }
        if(this.pos3.y + this.size >= this.limit){
            this.pos3.y = 100;
            this.randomizeValue(3);
        }
    }
    else{
        this.pos.y = this.finalY;
        this.value[0] = this.finalValue;
    }


    }
}