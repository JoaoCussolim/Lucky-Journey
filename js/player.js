class Player extends Sprite{
    constructor({position = {x: 0, y: 0}, dimensions = {width: 0, height: 0}}){
        super({position, dimensions});
        this.cameraBox = {
            x: this.position.x,
            y: this.position.y,
            width: this.dimensions.width * 2,
            height: this.dimensions.height * 2
        };
    };
    updateCameraBox(){
        this.cameraBox = {
            x: this.position.x - (this.dimensions.width * 1.5),
            y: this.position.y - (this.dimensions.height * 1.5),
            width: this.dimensions.width * 4,
            height: this.dimensions.height * 4
        };
    };

    shouldPanCameraVertical(){
        let cameraBoxRightSide = this.cameraBox.x + this.cameraBox.width

        if(cameraBoxRightSide > canvas.width) {camera.x -= 1}

        if(cameraBoxRightSide > scaledCanvas.width + Math.abs(camera.x)) camera.x -= this.velocity.x

        //if(camera.x < scaledCanvas.width) camera.x -= this.velocity.x        
    }

    shouldPanCameraHorizontal(){
        let cameraBoxRightSide = this.cameraBox.y + this.cameraBox.height

        if(cameraBoxRightSide > canvas.height) {camera.y -= 1}

        if(cameraBoxRightSide > scaledCanvas.height + Math.abs(camera.y)){
            camera.y -= this.velocity.y
        }
        //if(camera.y < scaledCanvas.height) camera.y -= this.velocity.y
        //else if(this.cameraBox.y - this.cameraBox.height < canvas.height) camera.y -= this.velocity.y
    }

    update(){
        this.draw();
        this.shouldPanCameraHorizontal();
        this.shouldPanCameraVertical();
        this.updateCameraBox();
    };
};

let player = new Player({ position: { x: 500, y: 300 }, dimensions: { width: 100, height: 100 } });

let acceptedKeys = {
    ArrowUp(player) {
        player.velocity.x = 0;
        player.velocity.y = -5;
    },
    ArrowDown(player) {
        player.velocity.x = 0;
        player.velocity.y = 5;
    },
    ArrowLeft(player) {
        player.velocity.y = 0;
        player.velocity.x = -5;
    },
    ArrowRight(player) {
        player.velocity.y = 0;
        player.velocity.x = 5;
    }
};

let keyUpKeys = {
    ArrowUp(player) {
        if(player.velocity.y < 0) player.velocity.y = 0;
    },
    ArrowDown(player) {
        if(player.velocity.y > 0) player.velocity.y = 0;
    },
    ArrowLeft(player) {
        if(player.velocity.x < 0) player.velocity.x = 0;
    },
    ArrowRight(player) {
        if(player.velocity.x > 0) player.velocity.x = 0;
    }
};

addEventListener('keydown', (e) => {
    if(acceptedKeys[e.key]) acceptedKeys[e.key](player);
    if(e.key === 'k') dice.rollable = true;
});

addEventListener('keyup', (e) => {
    if(acceptedKeys[e.key]) keyUpKeys[e.key](player);
});