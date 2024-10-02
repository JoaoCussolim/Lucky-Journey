function drawBorder(x, y, width, height, borderSize, borderColor) {
    // Draw the outer border using stroke
    ctx.beginPath();
    ctx.save()

    ctx.fillStyle = borderColor;
    ctx.fillRect(x - borderSize, y - borderSize, width + borderSize * 2, height + borderSize * 2);

    ctx.restore()
    ctx.closePath()
}

let items = {
    botaDeSlime :{name: "Bota de Slime", sorce:'', description: 'uma bota feita de slimes', type: "botas", effect: () => {}},
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
            {name: "Bota de Slime", sorce:'./assets/items/boots/slimeboot.png', description: 'uma bota feita de slimes', type: "botas", effect: () => {}},
            {name: "Bota de hércules", sorce:'./assets/items/boots/herculesboots.png', description: 'uma bota usada por hercules', type: "botas", effect: () => {}},
            {name: "Bota Abençoada", sorce:'./assets/items/boots/blessedboots.png', description: 'uma bota feita de slimes', type: "botas", effect: () => {}},
            {name: "Bota de Slime", sorce:'./assets/items/boots/slimeboot.png', description: 'uma bota feita de slimes', type: "botas", effect: () => {}},
            {name: "Bota de Slime", sorce:'./assets/items/boots/slimeboot.png', description: 'uma bota feita de slimes', type: "botas", effect: () => {}},
            {name: "Bota de Slime", sorce:'./assets/items/boots/slimeboot.png', description: 'uma bota feita de slimes', type: "botas", effect: () => {}},
            {name: "Bota de Slime", sorce:'./assets/items/boots/slimeboot.png', description: 'uma bota feita de slimes', type: "botas", effect: () => {}},
            {name: "Bota de Slime", sorce:'./assets/items/boots/slimeboot.png', description: 'uma bota feita de slimes', type: "botas", effect: () => {}},
            {name: "Bota de Slime", sorce:'./assets/items/boots/slimeboot.png', description: 'uma bota feita de slimes', type: "botas", effect: () => {}},
            {name: "Bota de Slime", sorce:'./assets/items/boots/slimeboot.png', description: 'uma bota feita de slimes', type: "botas", effect: () => {}},
            {name: "Bota de Slime", sorce:'./assets/items/boots/slimeboot.png', description: 'uma bota feita de slimes', type: "botas", effect: () => {}},
            {name: "Bota de Slime", sorce:'./assets/items/boots/slimeboot.png', description: 'uma bota feita de slimes', type: "botas", effect: () => {}},
            {name: "Bota de Slime", sorce:'./assets/items/boots/slimeboot.png', description: 'uma bota feita de slimes', type: "botas", effect: () => {}},
        ]
        this.totalItems = this.items.length;
        this.listWidth = 500;  // Width of the scrollable list area
        this.listHeight = 400; // Height of the scrollable list area
        this.listX = 930; // Center horizontally
        this.listY = 250; // Center vertically

        this.itemHeight = 150; // Height of each item
        this.scrollY = 0; // Vertical scroll offset
    }

    drawItems() {
        const startIndex = Math.floor(this.scrollY / this.itemHeight);
        const endIndex = startIndex + Math.ceil(this.listHeight / this.itemHeight) + 1;



        for (let i = startIndex; i < endIndex; i++) {
            const itemIndex = i % this.totalItems;
            const y = (i - startIndex) * this.itemHeight - (this.scrollY % this.itemHeight);

            if (y > this.listHeight) break; // Stop drawing if it's beyond the visible area

            ctx.fillStyle = 'black';

            
            ctx.drawImage(itemBox,this.listX, this.listY + y, this.listWidth, this.itemHeight);
            ctx.fillStyle = 'white';
            ctx.font = '20px Pixeloid';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'alphabetic';
            let image = new Image();
            image.src = this.items[itemIndex].sorce;
            ctx.drawImage(image,this.listX + 22, this.listY + y + this.itemHeight/5 ,80,80)
            ctx.fillText(this.items[itemIndex].name, this.listX + 250, this.listY + y + this.itemHeight / 3);
            ctx.fillText(this.items[itemIndex].description, this.listX + 310, this.listY + y + this.itemHeight / 2);
            

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
        ctx.drawImage(scrollImg,this.listX + this.listWidth, scrollbarTop, scrollbarWidth, scrollbarHeight); // Scrollbar itself
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