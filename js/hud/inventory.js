function drawBorder(x, y, width, height, borderSize, borderColor) {
    // Draw the outer border using stroke
    ctx.beginPath();
    ctx.save()

    ctx.fillStyle = borderColor;
    ctx.fillRect(x - borderSize, y - borderSize, width + borderSize * 2, height + borderSize * 2);

    ctx.restore()
    ctx.closePath()
}

function wrapText(text, maxWidth) {
    let lines = [];
    let words = text.split(' ');
    let line = '';

    for (let i = 0; i < words.length; i++) {
        let testLine = line + words[i] + ' ';
        let metrics = ctx.measureText(testLine);
        let testWidth = metrics.width;

        if (testWidth > maxWidth && i > 0) {
            lines.push(line);
            line = words[i] + ' ';
        } else {
            line = testLine;
        }
    }
    lines.push(line);

    return lines;
}

let itemsTodos = [
    { name: "Bota de Slime", source: './assets/items/boots/slimeboot.png', description: 'uma bota feita de slimes', type: "botas", effect: (colocando) => { if (colocando) { player.resistence -= 0.1 } else { player.resistence += 0.1 } }, effectDesc: "resistencia +2" },
    { name: "Bota Abençoada", source: './assets/items/boots/blessedboots.png', description: 'Ai Meu Deus', type: "botas", effect: (colocando) => {if(colocando){walkOnWater = true}else{walkOnWater = false}}, effectDesc: "Ande sobre as águas"},
    { name: "Bota de sete léguas", source: './assets/items/boots/herculesboot.png', description: 'FUI EU BARRY!', type: "botas", effect: (colocando) => { if (colocando) { playerSpeedBuff += 2 } else { playerSpeedBuff -= 2 } }, effectDesc: "velocidade +5" },
    { name: "Calça Invisível", source: './assets/items/pants/pantTransparent.png', description: 'Tinha alguma coisa pra ver?', type: "calcas", effect: (colocando) => { if (colocando) { detectionRange += 200 } else { detectionRange -= 200 } }, effectDesc: "furtividade 5+" },
    { name: "Rabo de gato", source: './assets/items/pants/cat.png', description: 'por onde isso entra?', type: "calcas", effect: (colocando) => { if (colocando) { playerSpeedBuff += 0.2 } else { playerSpeedBuff -= 0.2 } }, effectDesc: "velocidade +1" },
    { name: "Calça Multi-colorida", source: './assets/items/pants/pantGay.png', description: '🏳️‍🌈🤨❓', type: "calcas", effect: (colocando) => { if (colocando) { player.maxhealth += 10; player.maxmana += 10; playerSpeedBuff += 0.2; player.baseDamage += 1; player.resistence -= 0.05; } else { } }, effectDesc: "tudo +1" },
    { name: "Óculos de nerd", source: './assets/items/helmets/glasses.png', description: 'if(oculos_de_nerd){ INT++ }', type: "capacete", effect: (colocando) => { if (colocando) { if (player instanceof Mage || player instanceof Cleric) { player.baseDamage += 5 } } else { if (player instanceof Mage || player instanceof Cleric) { player.baseDamage -= 5 } } }, effectDesc: 'Dano Magico +5' },
    { name: "Capacete de Futebol", source: './assets/items/helmets/helmet.png', description: 'Meu lema é: FORÇA, FORÇA, BURRO', type: "capacete", effect: (colocando) => { if (colocando) { if (player instanceof Warrior || player instanceof Archer) { player.baseDamage += 5 } } else { if (player instanceof Warrior || player instanceof Archer) { player.baseDamage -= 5 } } }, effectDesc: "Dano Fisico +5" },
    { name: "Capacete de Motoqueiro", source: './assets/items/helmets/helmet2.png', description: 'já estou furioso... agora só falta ficar veloz', type: "capacete", effect: (colocando) => { if (colocando) { playerSpeedBuff += 0.4 } else { playerSpeedBuff -= 0.4 } }, effectDesc: "velocidade +2" },
    { name: "Mascara de Caveira", source: './assets/items/helmets/skull.png', description: '💀💀💀💀💀', type: "capacete", effect: (colocando) => { if (colocando) { player.maxhealth += 30 } else { player.maxhealth -= 30 } }, effectDesc: 'vida +3' },
    { name: "Camisa de Força", source: './assets/items/chestplates/camisaDeForca.png', description: 'Louco? Eu já fui louco uma vez...', type: "peitoral", effect: (colocando) => { if (colocando) { player.resistence -= 0.15 } else { player.resistence += 0.15 } }, effectDesc: 'resistencia +3' },
    { name: "Peitoral de Diamante", source: './assets/items/chestplates/diamondChestplate.png', description: 'Quadradamente Familiar...', type: "peitoral", effect: (colocando) => { if (colocando) { player.resistence -= 0.25 } else { player.resistence += 0.25 } }, effectDesc: 'resistencia +5' },
    { name: "Máquina de Costura", source: './assets/items/chestplates/seewingMachine.png', description: 'Quê?', type: "peitoral", effect: (colocando) => { if (colocando) { player.resistence -= 0.5 } else { player.resistence += 0.5 } }, effectDesc: 'resistencia +10' },
    { name: "Espada de Ferro", source: './assets/items/swords/sword.png', description: '', type: "espada", size: { x: 40, y: 90 }, space: 40, effect: (colocando) => { if (colocando) { player.baseDamage += 1 } else { player.baseDamage -= 1 } }, effectDesc: "Dano +1" },
    { name: "Espada de Fogo", source: './assets/items/swords/firesword.png', description: '', type: "espada", size: { x: 40, y: 90 }, space: 40, effect: (colocando) => { if (colocando) { player.baseDamage += 2 } else { player.baseDamage -= 2 } }, effectDesc: "Dano +2" },
    { name: "Lâmina de Barbear", source: './assets/items/swords/barbear.png', description: 'Corta não só sua barba😨', type: "espada", size: { x: 19, y: 90 }, space: 50, effect: (colocando) => { if (colocando) { player.baseDamage += 3 } else { player.baseDamage -= 3 } }, effectDesc: "Dano +3" },
    { name: "Guarda chuva", source: './assets/items/swords/umbrella.png', description: 'Nem chove nesse jogo...', type: "espada", effect: (colocando) => { if (colocando) { player.baseDamage += 5 } else { player.baseDamage -= 5 } }, effectDesc: "Dano +5" },
    { name: "Iskalibur", source: './assets/items/shields/iskalibur.png', description: 'Acho que não era assim que usava não', type: "escudo", size: { x: 40, y: 90 }, space: 40, effect: (colocando) => { if (colocando) { player.resistence -= 0.3 } else { player.resistence += 0.3 } }, effectDesc: 'resistencia +6' },
    { name: "Tampa de Panela Gigante", source: './assets/items/shields/tampadepanela.png', description: 'Voce pega e PAAA nela', type: "escudo", effect: (colocando) => { if (colocando) { player.resistence -= 0.15 } else { player.resistence += 0.15 } }, effectDesc: 'resistencia +3' },
    { name: "Escudo de Madeira", source: './assets/items/shields/woodshield.png', description: 'Cadê a criatividade?', type: "escudo", effect: (colocando) => { if (colocando) { player.resistence -= 0.05 } else { player.resistence += 0.05 } }, effectDesc: 'resistencia +1' },
    { name: "Escudo de Ferro", source: './assets/items/shields/ironshield.png', description: 'É tipo madeira, só que mais dura', type: "escudo", effect: (colocando) => { if (colocando) { player.resistence -= 0.1 } else { player.resistence += 0.1 } }, effectDesc: 'resistencia +2' },
]

let itemBox = new Image()
let scrollImg = new Image()
let menuInv = new Image()
let menuInvTop = new Image()
let menuInvBottom = new Image()
itemBox.src = "./assets/ui/ItemBox.png";
scrollImg.src = "./assets/ui/Scroll.png";
menuInv.src = "./assets/ui/inv-menu.png"
menuInvTop.src = "./assets/ui/invtop.png"
menuInvBottom.src = "./assets/ui/invbottom.png"

class inventory {
    constructor() {
        this.pos = { x: 465, y: 100 };
        this.size = { width: 1000, height: 750 };
        this.visible = false;
        this.items = [];
        this.equippedItems = {
            boots: "",
            pants: "",
            chest: "",
            helmet: "",
            sword: "",
            shield: ""
        }

        this.totalItems = this.items.length;
        this.listWidth = 500;  // Width of the scrollable list area
        this.listHeight = 400; // Height of the scrollable list area
        this.listX = 930; // Center horizontally
        this.listY = 250; // Center vertically

        this.itemHeight = 150; // Height of each item
        this.scrollY = 0; // Vertical scroll offset
    }

    getHoveredItemIndex() {
        const startIndex = Math.floor(this.scrollY / this.itemHeight);
        const endIndex = startIndex + Math.ceil(this.listHeight / this.itemHeight) + 1;

        for (let i = startIndex; i < endIndex; i++) {
            const itemIndex = i % this.totalItems;
            const y = (i - startIndex) * this.itemHeight - (this.scrollY % this.itemHeight);

            const itemBounds = {
                x: this.listX,
                y: this.listY + y,
                width: this.listWidth,
                height: this.itemHeight
            };

            if (mousePos.x >= itemBounds.x &&
                mousePos.x <= itemBounds.x + itemBounds.width &&
                mousePos.y >= itemBounds.y &&
                mousePos.y <= itemBounds.y + itemBounds.height) {
                return itemIndex
            }
        }
    }


    drawItems() {
        ctx.font = '50px Pixeloid'
        ctx.fillText("Inventario",this.pos.x + 550,this.pos.y + 50)
        if(this.items.length > 0){
        const startIndex = Math.floor(this.scrollY / this.itemHeight);
        const endIndex = startIndex + Math.ceil(this.listHeight / this.itemHeight) + 1;



        for (let i = startIndex; i < endIndex; i++) {
            const itemIndex = i % this.totalItems;
            const y = (i - startIndex) * this.itemHeight - (this.scrollY % this.itemHeight);

            if (y > this.listHeight) break; // Stop drawing if it's beyond the visible area

            ctx.fillStyle = 'black';


            ctx.drawImage(itemBox, this.listX, this.listY + y, this.listWidth, this.itemHeight);
            let fontSz = 20;
            ctx.fillStyle = 'white';
            ctx.font = fontSz + 'px Pixeloid';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'alphabetic';
            let image = new Image();
            const item = this.items[itemIndex]
            const size = item.size || { x: 80, y: 80 };
            const itemSpace = item.space || 22
            image.src = item.source;
            ctx.drawImage(image, this.listX + itemSpace, this.listY + y + this.itemHeight / 5, size.x, size.y)
            ctx.fillText(item.name, this.listX + 300, this.listY + y + this.itemHeight / 3);
            const description = wrapText(item.description, 300)
            for (let i = 0; i < description.length; i++) {
                ctx.fillText(description[i], this.listX + 310, this.listY + y + (i * (fontSz * 1.2)) + this.itemHeight / 2);
            }


            ctx.drawImage(menuInvTop, 930, 96.6, 500, 150)
            ctx.drawImage(menuInvBottom, 463.8, 707.9, 995, 168.5)
        }

        // Draw the scrollbar
        this.drawScrollbar();
    }
    }

    drawScrollbar() {
        const scrollbarWidth = 20;
        const scrollbarHeight = Math.max(this.listHeight / (this.itemHeight * this.totalItems) * this.listHeight, 30); // Minimum height of the scrollbar
        const maxScrollY = this.itemHeight * this.totalItems - this.listHeight;
        const scrollbarTop = (this.scrollY / maxScrollY) * (this.listHeight - scrollbarHeight) + this.listY;

        ctx.fillStyle = '#ddd';
        ctx.fillRect(this.listX + this.listWidth, this.listY, scrollbarWidth, this.listHeight); // Background of scrollbar container

        ctx.fillStyle = '#333';
        ctx.drawImage(scrollImg, this.listX + this.listWidth, scrollbarTop, scrollbarWidth, scrollbarHeight); // Scrollbar itself
    }

    open() {
        const isVisible = this.visible === true ? false : true
        this.visible = isVisible
    }

    updateScrollbarPosition() {
        this.drawScrollbar();
    }


    drawUI() {
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.drawImage(menuInv, this.pos.x - 290, this.pos.y - 125, this.size.width + 580, this.size.height + 250); //antes
        this.drawItems(); //depois
    }

    drawPlayerName() {
        ctx.font = '20px Pixeloid'
        ctx.fillStyle = "white";
        ctx.textAlign = 'center'
        ctx.fillText(playerName, this.pos.x + 340, this.pos.y + 52)
    }

    drawPlayerImage() {
        const playerImage = new Image()
        playerImage.src = player.animations['IdleForward'].source
        ctx.drawImage(playerImage, this.pos.x - 85, this.pos.y - 15, 700, 700);
    }

    drawItemBuffs() {
        ctx.fillStyle = "white";
        ctx.textAlign = 'left';
        const spaceBetween = 30
        const start = 450
        const bootDesc = this.equippedItems['boots'].effectDesc || 'nada'
        const pantDesc = this.equippedItems['pants'].effectDesc || 'nada'
        const chestDesc = this.equippedItems['chest'].effectDesc || 'nada'
        const helmetDesc = this.equippedItems['helmet'].effectDesc || 'nada'
        const swordDesc = this.equippedItems['sword'].effectDesc || 'nada'
        const shieldDesc = this.equippedItems['shield'].effectDesc || 'nada'
        ctx.font = '20px Pixeloid';
        if (bootDesc == 'Ande sobre as águas') {
            ctx.fillText(bootDesc, this.pos.x + 30, this.pos.y + start)

        } else {
            ctx.fillText('Botas aumentam ' + bootDesc, this.pos.x + 30, this.pos.y + start)
        }
        ctx.fillText('Calças aumentam ' + pantDesc, this.pos.x + 30, this.pos.y + start + spaceBetween * 1)
        ctx.fillText('Peitoral aumenta ' + chestDesc, this.pos.x + 30, this.pos.y + start + spaceBetween * 2)
        ctx.fillText('Capacete aumenta ' + helmetDesc, this.pos.x + 30, this.pos.y + start + spaceBetween * 3)
        ctx.fillText('Espada aumenta ' + swordDesc, this.pos.x + 30, this.pos.y + start + spaceBetween * 4)
        ctx.fillText('Escudo aumenta ' + shieldDesc, this.pos.x + 30, this.pos.y + start + spaceBetween * 5)
    }

    drawEquippedItems() {
        const boots = new Image();
        const pants = new Image();
        const chest = new Image();
        const helmet = new Image();
        const sword = new Image();
        const shield = new Image();

        boots.src = actualBoots;
        pants.src = actualPants;
        chest.src = actualChest;
        helmet.src = actualHelmet;
        sword.src = actualSword;
        shield.src = actualShield;

        ctx.drawImage(boots, this.pos.x + 375, this.pos.y + 312, 45, 45)
        ctx.drawImage(pants, this.pos.x + 375, this.pos.y + 210, 45, 45)
        ctx.drawImage(chest, this.pos.x + 375, this.pos.y + 110, 45, 45)
        ctx.drawImage(helmet, this.pos.x + 257, this.pos.y + 110, 45, 45)
        ctx.drawImage(sword, this.pos.x + 257, this.pos.y + 210, 45, 45)
        ctx.drawImage(shield, this.pos.x + 257, this.pos.y + 310, 45, 45)
    }

    addItem(item) {
        this.items.push(item);
        this.totalItems = this.items.length;
    }

    update() {
        if (this.visible) {
            this.drawUI();
            this.drawEquippedItems();
            this.drawPlayerImage();
            this.drawPlayerName();
            this.drawItemBuffs();
        }
    }

}

let actualBoots, actualPants, actualChest, actualHelmet, actualSword, actualShield = ''

const equipItemType = {
    botas: (item) => {
        if (player.inventory.equippedItems['boots'] != "") {
            player.inventory.equippedItems['boots'].effect(false)
        }
        player.inventory.equippedItems['boots'] = item
        actualBoots = item.source;
        item.effect(true);
    },
    calcas: (item) => {
        if (player.inventory.equippedItems['pants'] != "") {
            player.inventory.equippedItems['pants'].effect(false)
        }
        player.inventory.equippedItems['pants'] = item
        actualPants = item.source;
        item.effect(true);
    },
    peitoral: (item) => {
        if (player.inventory.equippedItems['chest'] != "") {
            player.inventory.equippedItems['chest'].effect(false)
        }
        player.inventory.equippedItems['chest'] = item
        actualChest = item.source;
        item.effect(true);
    },
    capacete: (item) => {
        if (player.inventory.equippedItems['helmet'] != "") {
            player.inventory.equippedItems['helmet'].effect(false)
        }
        player.inventory.equippedItems['helmet'] = item
        actualHelmet = item.source;
        item.effect(true);
    },
    espada: (item) => {
        if (player.inventory.equippedItems['sword'] != "") {
            player.inventory.equippedItems['sword'].effect(false)
        }
        player.inventory.equippedItems['sword'] = item
        actualSword = item.source;
        item.effect(true);
    },
    escudo: (item) => {
        if (player.inventory.equippedItems['shield'] != "") {
            player.inventory.equippedItems['shield'].effect(false)
        }
        player.inventory.equippedItems['shield'] = item
        actualShield = item.source;
        item.effect(true);
    },
}