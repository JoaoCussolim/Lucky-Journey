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

let itemsTodos = {
    botaDeSlime: { name: "Bota de Slime", source: './assets/items/boots/slimeboot.png', description: 'uma bota feita de slimes', type: "botas", effect: () => { } },
    BotaABencoada: { name: "Bota Abençoada", source: './assets/items/boots/blessedboots.png', description: 'Ai Meu Deus', type: "botas", effect: () => { } },
    Bota7leguas: { name: "Bota de sete léguas", source: './assets/items/boots/herculesboots.png', description: 'FUI EU BARRY!', type: "botas", effect: () => { } },
    CalcaInvisivel: { name: "Calça Invisível", source: './assets/items/pants/pantTransparent.png', description: 'Tinha alguma coisa pra ver?', type: "calcas", effect: () => { } },
    RaboGato: { name: "Rabo de gato", source: './assets/items/pants/cat.png', description: 'por onde isso entra?', type: "calcas", effect: () => { } },
    CalçaMultiCor: { name: "Calça Multi-colorida", source: './assets/items/pants/pantGay.png', description: '🏳️‍🌈🤨❓', type: "calcas", effect: () => { } },
    oculosNerd: { name: "Óculos de nerd", source: './assets/items/helmets/glasses.png', description: 'if(oculos_de_nerd){ INT++ }', type: "capacete", effect: () => { } },
    CapaceteFutebol: { name: "Capacete de Futebol", source: './assets/items/helmets/helmet.png', description: 'Meu lema é: FORÇA, FORÇA, BURRO', type: "capacete", effect: () => { } },
    CapaceteMotoqueiro: { name: "Capacete de Motoqueiro", source: './assets/items/helmets/helmet2.png', description: 'já estou furioso... agora só falta ficar veloz', type: "capacete", effect: () => { } },
    MascaraCaveira: { name: "Mascara de Caveira", source: './assets/items/helmets/skull.png', description: '💀💀💀💀💀', type: "capacete", effect: () => { } },
    CamisaForca: { name: "Camisa de Força", source: './assets/items/chestplates/camisaDeForca.png', description: 'Louco? Eu já fui louco uma vez...', type: "peitoral", effect: () => { } },
    PeitoralDiamante: { name: "Peitoral de Diamante", source: './assets/items/chestplates/diamondChestplate.png', description: 'Quadradamente Familiar...', type: "peitoral", effect: () => { } },
    MaquinaCostura: { name: "Máquina de Costura", source: './assets/items/chestplates/seewingMachine.png', description: 'Quê?', type: "peitoral", effect: () => { } },
    EspadaFerro: { name: "Espada de Ferro", source: './assets/items/swords/sword.png', description: '', type: "espada", size: {x: 40, y: 90}, space: 40, effect: () => { } },
    EspadaFogo: { name: "Espada de Fogo", source: './assets/items/swords/firesword.png', description: '', type: "espada", size: {x: 40, y: 90}, space: 40, effect: () => { } },
    LaminaBarbear: { name: "Lâmina de Barbear", source: './assets/items/swords/barbear.png', description: 'Corta não só sua barba😨', type: "espada", size: {x: 19, y: 90}, space: 50, effect: () => { } },
    Guardachuva: { name: "Guarda chuva", source: './assets/items/swords/umbrella.png', description: 'Nem chove nesse jogo...', type: "espada", effect: () => { } },
    Escalibur: { name: "Iskalibur", source: './assets/items/shields/iskalibur.png', description: 'Acho que não era assim que usava não', type: "escudo", size: {x: 40, y: 90}, space: 40, effect: () => { } },
    TampaGigante: { name: "Tampa de Panela Gigante", source: './assets/items/shields/tampadepanela.png', description: 'Voce pega e PAAA nela', type: "escudo", effect: () => { } },
    EscudoMadeira: { name: "Escudo de Madeira", source: './assets/items/shields/woodshield.png', description: 'Cadê a criatividade?', type: "escudo", effect: () => { } },
    EscudoFerro: { name: "Escudo de Ferro", source: './assets/items/shields/ironshield.png', description: 'É tipo madeira, só que mais dura', type: "escudo", effect: () => { } },
}

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
        this.items = [
            { name: "Bota de Slime", source: './assets/items/boots/slimeboot.png', description: 'uma bota feita de slimes', type: "botas", effect: () => { } },
            { name: "Bota Abençoada", source: './assets/items/boots/herculesboot.png', description: 'Ai Meu Deus', type: "botas", effect: () => { } },
            { name: "Bota de sete léguas", source: './assets/items/boots/blessedboots.png', description: 'FUI EU BARRY!', type: "botas", effect: () => { } },
            { name: "Calça Invisível", source: './assets/items/pants/pantTransparent.png', description: 'Tinha alguma coisa pra ver?', type: "calcas", effect: () => { } },
            { name: "Rabo de gato", source: './assets/items/pants/cat.png', description: 'por onde isso entra?', type: "calcas", effect: () => { } },
            { name: "Calça Multi-colorida", source: './assets/items/pants/pantGay.png', description: '🏳️‍🌈🤨❓', type: "calcas", effect: () => { } },
            { name: "Óculos de nerd", source: './assets/items/helmets/glasses.png', description: 'if(oculos_de_nerd){ INT++ }', type: "capacete", effect: () => { } },
            { name: "Capacete de Futebol", source: './assets/items/helmets/helmet.png', description: 'Meu lema é: FORÇA, FORÇA, BURRO', type: "capacete", effect: () => { } },
            { name: "Capacete de Motoqueiro", source: './assets/items/helmets/helmet2.png', description: 'já estou furioso... agora só falta ficar veloz', type: "capacete", effect: () => { } },
            { name: "Mascara de Caveira", source: './assets/items/helmets/skull.png', description: '💀💀💀💀💀', type: "capacete", effect: () => { } },
            { name: "Camisa de Força", source: './assets/items/chestplates/camisaDeForca.png', description: 'Louco? Eu já fui louco uma vez...', type: "peitoral", effect: () => { } },
            { name: "Peitoral de Diamante", source: './assets/items/chestplates/diamondChestplate.png', description: 'Quadradamente Familiar...', type: "peitoral", effect: () => { } },
            { name: "Máquina de Costura", source: './assets/items/chestplates/seewingMachine.png', description: 'Quê?', type: "peitoral", effect: () => { } },
            { name: "Espada de Ferro", source: './assets/items/swords/sword.png', description: '', type: "espada", size: {x: 40, y: 90}, space: 40, effect: () => { } },
            { name: "Espada de Fogo", source: './assets/items/swords/firesword.png', description: '', type: "espada", size: {x: 40, y: 90}, space: 40, effect: () => { } },
            { name: "Lâmina de Barbear", source: './assets/items/swords/barbear.png', description: 'Corta não só sua barba😨', type: "espada", size: {x: 19, y: 90}, space: 50, effect: () => { } },
            { name: "Guarda chuva", source: './assets/items/swords/umbrella.png', description: 'Nem chove nesse jogo...', type: "espada", effect: () => { } },
            { name: "Iskalibur", source: './assets/items/shields/iskalibur.png', description: 'Acho que não era assim que usava não', type: "escudo", size: {x: 40, y: 90}, space: 40, effect: () => { } },
            { name: "Tampa de Panela Gigante", source: './assets/items/shields/tampadepanela.png', description: 'Voce pega e PAAA nela', type: "escudo", effect: () => { } },
            { name: "Escudo de Madeira", source: './assets/items/shields/woodshield.png', description: 'Cadê a criatividade?', type: "escudo", effect: () => { } },
            { name: "Escudo de Ferro", source: './assets/items/shields/ironshield.png', description: 'É tipo madeira, só que mais dura', type: "escudo", effect: () => { } },
        ]

        this.equippedItems = []

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
            const size = item.size  || {x: 80, y: 80 };
            const itemSpace = item.space || 22 
            image.src = item.source;
            ctx.drawImage(image, this.listX + itemSpace, this.listY + y + this.itemHeight / 5, size.x, size.y)
            ctx.fillText(item.name, this.listX + 300, this.listY + y + this.itemHeight / 3);
            const description = wrapText(item.description,300)
            for (let i = 0; i < description.length; i++) {
                ctx.fillText(description[i], this.listX + 310, this.listY + y + (i * (fontSz * 1.2)) + this.itemHeight / 2);
            }


            ctx.drawImage(menuInvTop, 930, 96.6, 500, 150)
            ctx.drawImage(menuInvBottom, 463.8, 707.9, 995, 168.5)
        }

        // Draw the scrollbar
        this.drawScrollbar();
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


    draw() {
        // Draw the inventory box
        if (this.visible) {
            ctx.fillStyle = "rgb(255, 255, 255)";
            ctx.drawImage(menuInv, this.pos.x - 290, this.pos.y - 125, this.size.width + 580, this.size.height + 250); //antes
            this.drawItems(); //depois
        }
    }

    addItem(item) {
        this.items.push(item);
        this.totalItems = this.items.length;
    }

    update() {
        this.draw();
    }

}