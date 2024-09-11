class NonPlayableCharacter extends Sprite {
    constructor({ position = { x: 0, y: 0 }, dimensions = { width: 0, height: 0 }, dialog = [], name = '', src = '' }) {
        super({position, dimensions})
        this.center = {
            x: this.position.x - this.dimensions.width / 2,
            y: this.position.y - this.dimensions.height / 2
        }
        this.dialog = dialog
        this.name = name
        this.image = new Image()
        this.image.src = src
        this.talking = false
        this.talked = false
        this.talkable = false
        this.talkButton = new Image()
        this.talkButton.src = './assets/talkButton.png'
    }
    talk() {
        if (!this.talked) {
            dialogActive = true
            this.talking = true
            this.talked = true
            actualDialogBox = new DialogBox({ dialog: this.dialog, speaker: this.name, src: this.image.src });
        } else {
            this.talking = true
            dialogActive = true
            actualDialogBox = new DialogBox({ dialog: this.dialog, speaker: this.name, src: this.image.src });
            actualDialogBox.generic = true
        }
    }
    keyWarn() {
        if (this.talkable) {
            ctx.drawImage(this.talkButton, worldToScreenX(this.center.x), worldToScreenY(this.center.y) - 100, 250, 100)
        }
    }
    updateCenter() {
        this.center = {
            x: this.position.x - this.dimensions.width / 2,
            y: this.position.y - this.dimensions.height / 2
        }
    }
    playerProximity() {
        let distanceX = worldToScreenX(this.position.x) - screenToWorldX(player.position.x)
        let distanceY = worldToScreenY(this.position.y) - screenToWorldY(player.position.y)
        if (Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2)) < 200) {
            this.talkable = true
        }
        else this.talkable = false
    }
    draw() {
        ctx.drawImage(this.image, worldToScreenX(this.center.x), worldToScreenY(this.center.y), this.dimensions.width, this.dimensions.height)
    }
    update() {
        this.updateCenter()
        this.draw()
        this.playerProximity()
        this.keyWarn()  
    }
}

let actualNpc = new NonPlayableCharacter({ position: { x: player.position.x - 100, y: player.position.y - 1200 }, dimensions: { width: 200, height: 200 }, dialog: ['Eu sou um npc de teste', 'Eu sou uma criação de Deus', 'Agora calma'], name: 'Test', src: './assets/mage/idle/forward.png' })