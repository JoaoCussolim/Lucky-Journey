class DialogBox {
    constructor({ dialog = [], speaker = '', src = '' }) {
        this.dialog = dialog
        this.speaker = speaker;
        this.image = new Image();
        this.image.src = src;
        this.dimensions = {
            width: window.innerWidth - 200,
            height: 200,
        };
        this.position = {
            x: window.innerWidth / 2 - this.dimensions.width / 2 + 100,
            y: window.innerHeight - this.dimensions.height - 50,
        };
        this.passY = 135
        this.dialogIndex = 0;
        this.actualDialog = this.dialog[this.dialogIndex];
        this.generic = false;
    }

    drawText() {
        ctx.textBaseline = 'alphabetic'
        const borderSize = 10
        const borderColor = 'rgba(237, 172, 74, 1)'
        drawBorder(this.position.x + 300, this.position.y + 5, this.dimensions.width - 500, this.dimensions.height, borderSize, borderColor);
        ctx.fillStyle = 'rgba(67, 93, 115, 1)';
        ctx.fillRect(this.position.x + 300, this.position.y + 5, this.dimensions.width - 500, this.dimensions.height);

        ctx.fillStyle = 'rgba(245, 203, 83, 1)'
        ctx.textAlign = 'start'
        const fontSize = 40
        ctx.font = `${fontSize}px Pixeloid`


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

        const text = this.actualDialog
        const maxWidth = this.dimensions.width - 510

        const lines = wrapText(text, maxWidth);
        const lineHeight = fontSize * 1.2; // Adjust line height if needed

        // Draw each line
        const startX = this.position.x + 320;
        const startY = this.position.y + 40;

        for (let i = 0; i < lines.length; i++) {
            ctx.fillText(lines[i], startX, startY + (i * lineHeight));
        }

    }

    drawTitle() {
        ctx.textAlign = 'start'
        const fontSize = 100
        ctx.font = `${fontSize}px Tales`
        const titleWidth = this.dimensions.width / 4
        const borderSize = 10
        const borderColor = 'rgba(237, 172, 74, 1)'
        drawBorder(this.position.x + 300, this.position.y - 100, titleWidth + this.speaker.length * 5, 100, borderSize, borderColor);
        ctx.fillStyle = 'rgba(94, 120, 140, 1)'
        ctx.fillRect(this.position.x + 300, this.position.y - 100, titleWidth + this.speaker.length * 5, 100)
        ctx.fillStyle = 'rgba(245, 203, 83, 1)'
        ctx.fillText(this.speaker, this.position.x + 320, this.position.y - 10, titleWidth + this.speaker.length * 5);
    }

    drawImage() {
        const borderSize = 10
        const borderColor = 'rgba(237, 172, 74, 1)'
        drawBorder(this.position.x, this.position.y - 100, 305, 305, borderSize, borderColor);
        ctx.fillStyle = 'rgba(46, 70, 89, 1)'
        ctx.fillRect(this.position.x, this.position.y - 100, 305, 305)
        ctx.drawImage(this.image, this.position.x - 10, this.position.y - 100, 300, 300)
    }

    drawPass() {
        ctx.fillStyle = 'rgba(245, 203, 83, 1)'
        let initialX = window.innerWidth - 580
        let sizeAdjust = 65
        let initialY = this.passY
        this.jumpPass()
        drawTriangle(this.position.x + initialX + sizeAdjust, this.position.y + initialY, this.position.x + initialX + 100, this.position.y + initialY + 100 - sizeAdjust, this.position.x + initialX + 200 - sizeAdjust, this.position.y + initialY)
    }

    jumpPass() {
        const sign = this.passY > 125 ? -0.25 : 10
        this.passY += 1 * sign
    }

    closeDialog() {
        dialogActive = false
        //actualDialogBox = null
    }

    updateDialog() {
        if (this.dialogIndex < this.dialog.length - 1 && !this.generic) this.dialogIndex += 1
        else this.closeDialog()
        this.actualDialog = this.dialog[this.dialogIndex]
    }

    draw() {
        this.drawText()
        this.drawTitle()
        this.drawImage()
        this.drawPass()
    }
}

let dialogActive = false
let dialogosAleatorios = ["Eu sou aleatório"]
let actualDialogBox = new DialogBox({ dialog: dialogosAleatorios, speaker: 'Caos', src: './assets/mage/idle/forward.png' });

let canvasPromptActive = false
let canvasPrompText = ''
let canvasPrompQuestion = ''
let canvasPrompResponse = ''

function canvasPrompt(text) {
    canvasPromptActive = true
    canvasPrompQuestion = text
}

function loadCanvasPrompt() {
    ctx.font = `60px Tales`
    ctx.fillStyle = 'black'
    ctx.fillRect(canvas.width / 2 - 400, canvas.height / 2 - 400, 800, 800)
    ctx.fillStyle = 'white'
    ctx.fillText(canvasPrompQuestion, canvas.width / 2 - 250, canvas.height / 2 - 300)
    ctx.fillText(canvasPrompText, canvas.width / 2 - 250, canvas.height / 2)
}

const API_TOKEN = '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';
async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/google/flan-t5-large",
        {
            headers: {
                Authorization: "Bearer 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",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result;
}