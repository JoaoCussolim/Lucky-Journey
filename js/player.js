let lockCamera

class Player extends Sprite {
    constructor({ position = { x: 0, y: 0 }, dimensions = { width: 0, height: 0 } }) {
        super({ position, dimensions });
        this.center = {
            x: this.position.x + this.dimensions.width/2,
            y: this.position.y + this.dimensions.height/2,
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

    shouldPanCameraVertical() {
        let translateVar = backgroundPositions.x <= -canvas.width + scaledCanvas.width === true ? -1 : 1;
        if (backgroundPositions.x <= -canvas.width + scaledCanvas.width || backgroundPositions.x >= 0){
            backgroundPositions.x -= translateVar;
            backgroundVelocity.x = translateVar;
        }
        else{
            backgroundPositions.x -= this.velocity.x;
            backgroundVelocity.x = this.velocity.x;
        };
    };

    shouldPanCameraHorizontal() {

        //Futuramente será utilizado blocos de colisão, basicamente, na criação de um mapa você pode exportar o modelo de blocos
        //Estes blocos da camada colisão serão utilizados para localização do mapa e conseguir saber até onde o player pode ir
        //Isso vai fazer com que mesmo que o mapa mude sua camera ou seja posicionado, o player só vai parar quando bater no bloco de colisao
        //Que na maioria das vezes estará presente nas bordas do mapa ou então em cercas, árvores, qualquer coisa colidivel
        //Na teoria parece mais complicado porém com esse modelo de código, qualquer bloco de colisão vai fazer o player colidir
        //Sendo assim, da pra fazer colisões aleatorias que não tem a ver com a borda do mapa em si, melhorando o sistema

        let translateVar = backgroundPositions.y <= 0 === true ? -1 : 1;
        if (backgroundPositions.y + this.dimensions.height <= 0 || backgroundPositions.y + this.dimensions.height >= canvas.height / 1.46){
            backgroundPositions.y -= translateVar;
            backgroundVelocity.y = translateVar;
        }
        else{
            backgroundPositions.y -= this.velocity.y;
            backgroundVelocity.y = this.velocity.y;
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

    draw() {
        this.center = {
            x: this.position.x + this.dimensions.width/2,
            y: this.position.y + this.dimensions.height/2,
        }
        
        //ctx.fillStyle = 'green';    
        //ctx.fillRect(this.attackbox.position.x, this.attackbox.position.y, this.attackbox.dimensions.width, this.attackbox.dimensions.height)
        //ctx.fillStyle = 'purple';
        //ctx.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.dimensions.width, this.hitbox.dimensions.height)
        ctx.fillStyle = 'white';
        ctx.fillRect(this.center.x, this.center.y, this.dimensions.width, this.dimensions.height);
    };

    update() {
        this.draw();
        this.updateBoxes();
        this.shouldPanCameraHorizontal();
        this.shouldPanCameraVertical();
    };
};

let player = new Player({ position: { x: 950, y: 500 }, dimensions: { width: 100, height: 100 } });

let acceptedKeys = {
    ArrowUp(player) {
        player.velocity.x = 0;
        player.velocity.y = -5
    },
    ArrowDown(player) {
        player.velocity.x = 0;
        player.velocity.y = 5
    },
    ArrowLeft(player) {
        player.velocity.y = 0;
        player.velocity.x = -5
    },
    ArrowRight(player) {
        player.velocity.y = 0;
        player.velocity.x = 5
    }
};

let keyUpKeys = {
    ArrowUp(player) {
        if (player.velocity.y < 0) player.velocity.y = 0;
    },
    ArrowDown(player) {
        if (player.velocity.y > 0) player.velocity.y = 0;
    },
    ArrowLeft(player) {
        if (player.velocity.x < 0) player.velocity.x = 0;
    },
    ArrowRight(player) {
        if (player.velocity.x > 0) player.velocity.x = 0;
    }
};

let projectiles = [];

