class NonPlayableCharacter extends Sprite {
    constructor({ position = { x: 0, y: 0 }, dimensions = { width: 0, height: 0 }, imageDimensions = { width: 0, height: 0 }, dialog = [], name = '', src = '', mission = Object }) {
        super({ position, dimensions })
        this.center = {
            x: this.position.x + this.dimensions.width / 2,
            y: this.position.y + this.dimensions.height / 2
        }
        this.imageDimensions = imageDimensions
        this.dialog = dialog;
        this.name = name;
        this.image = new Image();
        this.image.src = src;
        this.talking = false;
        this.talked = false;
        this.talkable = false;
        this.talkButton = new Image();
        this.talkButton.src = './assets/talkButton.png';
        this.mission = mission;
        putCollisionBlock({ position: this.position, size: this.dimensions.width / 2 + this.dimensions.height / 2 })
    }
    talk() {
        if (!this.talked) {
            dialogActive = true;
            this.talking = true;
            this.talked = true;
            actualDialogBox = new DialogBox({ dialog: this.dialog, speaker: this.name, src: this.image.src, imageDimensions: this.imageDimensions, mission: this.mission });
        } else {
            this.talking = true;
            dialogActive = true;
            actualDialogBox = new DialogBox({ dialog: this.dialog, speaker: this.name, src: this.image.src, imageDimensions: this.imageDimensions, mission: this.mission });
            actualDialogBox.generic = true;
        }
    }
    keyWarn() {
        if (this.talkable) {
            const talkbuttonHeight = (this.dimensions.height + 25)
            const talkbuttonWidth = (talkbuttonHeight * 2)
            ctx.drawImage(this.talkButton, worldToScreenX(this.center.x - this.dimensions.width), worldToScreenY(this.center.y - talkbuttonHeight - 10), talkbuttonWidth, talkbuttonHeight)
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

// let npc1 = new NonPlayableCharacter({
//     position: { x: player.position.x - 150, y: player.position.y - 1200 },
//     dimensions: { width: 50, height: 50 },
//     imageDimensions: { width: 180, height: 180 },
//     dialog: ['Eu sou um npc de teste', 'Eu sou uma criação de Deus', 'Agora calma'],
//     name: 'Test',
//     src: './assets/npcs/npc1.png'
// })

// let npc2 = new NonPlayableCharacter({
//     position: { x: player.position.x - 120, y: player.position.y - 1200 },
//     dimensions: { width: 50, height: 50 },
//     imageDimensions: { width: 180, height: 180 },
//     dialog: ['Eu sou um npc de teste', 'Eu sou uma criação de Deus', 'Agora calma'],
//     name: 'Test',
//     src: './assets/npcs/npc2.png'
// })

// let npc3 = new NonPlayableCharacter({
//     position: { x: player.position.x - 100, y: player.position.y - 1200 },
//     dimensions: { width: 50, height: 50 },
//     imageDimensions: { width: 180, height: 180 },
//     dialog: ['Eu sou um npc de teste', 'Eu sou uma criação de Deus', 'Agora calma'],
//     name: 'Test',
//     src: './assets/npcs/npc3.png'
// })

// let npc4 = new NonPlayableCharacter({
//     position: { x: player.position.x - 230, y: player.position.y - 1200 },
//     dimensions: { width: 50, height: 50 },
//     imageDimensions: { width: 180, height: 180 },
//     dialog: ['Eu sou um npc de teste', 'Eu sou uma criação de Deus', 'Agora calma'],
//     name: 'Test',
//     src: './assets/npcs/npc4.png'
// })

// let npc5 = new NonPlayableCharacter({
//     position: { x: player.position.x - 200, y: player.position.y - 1200 },
//     dimensions: { width: 50, height: 50 },
//     imageDimensions: { width: 180, height: 180 },
//     dialog: ['Eu sou um npc de teste', 'Eu sou uma criação de Deus', 'Agora calma'],
//     name: 'Test',
//     src: './assets/npcs/npc5.png'
// })

// let npc6 = new NonPlayableCharacter({
//     position: { x: player.position.x - 10, y: player.position.y - 1200 },
//     dimensions: { width: 50, height: 50 },
//     imageDimensions: { width: 180, height: 180 },
//     dialog: ['Eu sou um npc de teste', 'Eu sou uma criação de Deus', 'Agora calma'],
//     name: 'Test',
//     src: './assets/npcs/npc6.png'
// })

// let npc7 = new NonPlayableCharacter({
//     position: { x: player.position.x - 30, y: player.position.y - 1200 },
//     dimensions: { width: 50, height: 50 },
//     imageDimensions: { width: 180, height: 180 },
//     dialog: ['Eu sou um npc de teste', 'Eu sou uma criação de Deus', 'Agora calma'],
//     name: 'Test',
//     src: './assets/npcs/npc7.png'
// })

const npcs = []

let actualNpc = ''

let npcGenerated = false

const generateNPC = () => {
    if (!npcGenerated) {
        npcGenerated = true
        let npc = new NonPlayableCharacter({
            position: { x: player.position.x - 100, y: player.position.y - 20 },
            dimensions: { width: 50, height: 50 },
            imageDimensions: { width: 180, height: 180 },
            dialog: ['Finalmente, um aventureiro!', 'Nosso mundo foi tomado por slimes, você precisa nos ajudar!', 'Se matar 100 slimes, te darei uma recompensa!'],
            name: 'Pedro',
            src: './assets/npcs/npc1.png',
            mission: new Mission({
                name: 'Mate slimes',
                mission: 'Inimigos',
                reward: {
                    name: "Bota de Slime",
                    sorce: './assets/items/boots/slimeboot.png',
                    description: 'uma bota feita de slimes',
                    type: "botas",
                    effect: () => { }
                },
                maxTargets: 100
            })
        })
        npcs.push(npc)
    }
}