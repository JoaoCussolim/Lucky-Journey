function drawBorder(x, y, width, height, borderSize, borderColor) {
    // Draw the outer border using stroke
    ctx.beginPath();
    ctx.save()

    ctx.fillStyle = borderColor;
    ctx.fillRect(x - borderSize, y - borderSize, width + borderSize*2, height + borderSize*2);
    
    ctx.restore()
    ctx.closePath()
}


class inventory {
    constructor() {
        this.pos = { x: 450, y: 100 };
        this.size = { width: 1000, height: 750 };
        this.visible = false;
        this.totalItems = 100
        this.items = [];
        for (let i = 0; i < this.totalItems; i++) {
            this.items.push(`Item ${i + 1}`);
        }
        this.listWidth = 500;  // Width of the scrollable list area
        this.listHeight = 400; // Height of the scrollable list area
        this.listX = 930; // Center horizontally
        this.listY = 250; // Center vertically

        this.itemHeight = 150; // Height of each item
        this.scrollY = 0; // Vertical scroll offset

        

    }

    drawItems() {
        // Draw the list background
        ctx.fillStyle = '#eee';
        ctx.fillRect(this.listX, this.listY, this.listWidth, this.listHeight);

        const startIndex = Math.floor(this.scrollY / this.itemHeight);
        const endIndex = startIndex + Math.ceil(this.listHeight / this.itemHeight) + 1;



        for (let i = startIndex; i < endIndex; i++) {
            const itemIndex = i % this.totalItems;
            const y = (i - startIndex) * this.itemHeight - (this.scrollY % this.itemHeight);

            if (y > this.listHeight) break; // Stop drawing if it's beyond the visible area

            ctx.fillStyle = 'black';

            ctx.fillRect(this.listX, this.listY + y, this.listWidth, this.itemHeight);
            ctx.fillStyle = 'white';
            ctx.font = '20px Arial';
            ctx.textBaseline = 'middle'; // Center text vertically
            ctx.fillText(this.items[itemIndex], this.listX + 40, this.listY + y + this.itemHeight / 2);

            ctx.fillStyle = 'white';
            ctx.fillRect(930,100,500,150)
            ctx.fillRect(930,650,500,150)
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
        ctx.fillRect(this.listX + this.listWidth, scrollbarTop, scrollbarWidth, scrollbarHeight); // Scrollbar itself


        

    }

    updateScrollbarPosition() {
        this.drawScrollbar();
    }



    draw() {
        // Draw the inventory box
        if (this.visible) {
            ctx.fillStyle = "rgb(255, 255, 255)";
            ctx.fillRect(this.pos.x, this.pos.y, this.size.width, this.size.height);
            this.drawItems();
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