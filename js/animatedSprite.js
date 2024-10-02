class AnimatedSprite extends Sprite{
    constructor({ position = { x: 0, y: 0 }, dimensions = {width: 0, height: 0}, source, frameRate = 1, frameBuffer = 3, scale = 1, animations = {} }) {
        super({position, dimensions})
        this.scale = scale;
        this.loaded = false;
        this.image = new Image();
        this.image.onload = () => {
            this.width = (this.image.width / this.frameRate) * this.scale
            this.height = this.image.height * this.scale
            this.loaded = true
        };
        this.image.src = source;
        this.frameRate = frameRate;
        this.currentFrame = 0;
        this.frameBuffer = frameBuffer;
        this.elapsedFrames = 0;

        this.animations = animations
        if (animations != []) {
            for (let anim in this.animations) {
                let image = new Image()
                image.src = this.animations[anim].source

                this.animations[anim].image = image
            }
        }
    }

    switchSprite(anim) {
        if (this.image === this.animations[anim].image || !this.loaded) return
        this.image = this.animations[anim].image
        this.frameBuffer = this.animations[anim].frameBuffer
        this.frameRate = this.animations[anim].frameRate
    }


    draw() {
        if (!this.image) return;

        let cropbox = {
            position: {
                x: this.currentFrame * (this.image.width / this.frameRate),
                y: 0
            },
            width: this.image.width / this.frameRate,
            height: this.image.height
        };

        ctx.drawImage(this.image, cropbox.position.x, cropbox.position.y, cropbox.width, cropbox.height, this.position.x, this.position.y, this.width, this.height)
    }

    updateFrames() {
        this.elapsedFrames++;
        if (this.elapsedFrames % this.frameBuffer === 0) {
            if (this.currentFrame < this.frameRate - 1) {
                this.currentFrame++;
            } else {
                this.currentFrame = 0;
            }
        }
    }

    update() {
        this.draw()
        this.updateFrames()
    }
}