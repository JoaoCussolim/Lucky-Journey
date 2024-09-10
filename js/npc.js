class NonPlayableCharacter extends Sprite {
    constructor({ position = { x: 0, y: 0 }, dimensions = { width: 0, height: 0 }, dialog = [], name = '', src = '' }) {
        super(position, dimensions)
        this.dialog = dialog
        this.name = name
        this.image = new Image()
        this.image.src = src
        this.talking = false
        this.talked = false
    }
    talk() {
        if (!this.talked) {
            dialogActive = true
            this.talking = true
            this.talked = true
            actualDialogBox = new DialogBox({ dialog: this.dialog, speaker: this.name, src: this.image.src });
        }else{
            this.talking = true
            dialogActive = true
            actualDialogBox = new DialogBox({ dialog: this.dialog, speaker: this.name, src: this.image.src });
            actualDialogBox.generic = true
        }
    }
    draw() {
        ctx.drawImage(this.image, worldToScreenX(this.position.x), worldToScreenY(this.position.y), 100, 100)
    }
}

let testNpc = new NonPlayableCharacter({ position: { x: player.position.x + 10, y: player.position.y + 10 }, dimensions: { width: 500, height: 500 }, dialog: ['Eu sou um npc de teste', 'Eu sou uma criação de Deus', 'Agora calma'], name: 'Test', src: './assets/mage/idle/forward.png' })
