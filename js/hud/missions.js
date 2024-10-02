class Mission {
    constructor({ name = '', mission = '', reward = Object, maxTargets = 0 }) {
        this.missionObjective = mission
        this.missionReward = reward
        this.missionName = name;
        this.defeatedTargets = 0
        this.maxTargets = maxTargets
        this.dimensions = {
            width: window.innerWidth - 200,
            height: 200,
        };

        this.position = {
            x: window.innerWidth / 2 - this.dimensions.width / 2 + 100,
            y: window.innerHeight - this.dimensions.height - 50,
        };

    }

    drawText() {
        ctx.textBaseline = 'alphabetic';
        const borderSize = 10;
        const borderColor = 'rgba(237, 172, 74, 1)';
        const widthFix = 1200
        const xFix = -190
        const yFix = -620
        drawBorder(this.position.x + xFix, this.position.y + 5 + yFix, this.dimensions.width - widthFix, this.dimensions.height, borderSize, borderColor);
        ctx.fillStyle = 'rgba(67, 93, 115, 1)';
        ctx.fillRect(this.position.x + xFix, this.position.y + 5 + yFix, this.dimensions.width - widthFix, this.dimensions.height);

        ctx.fillStyle = 'rgba(245, 203, 83, 1)';
        ctx.textAlign = 'start';
        const fontSize = 40;
        ctx.font = `${fontSize}px Pixeloid`;


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

        const text = this.missionName
        const maxWidth = this.dimensions.width - widthFix - 10

        const lines = wrapText(text, maxWidth);
        const lineHeight = fontSize * 1.2; // Adjust line height if needed

        // Draw each line
        const startX = this.position.x + 10 + xFix;
        const startY = this.position.y + 40 + yFix;

        for (let i = 0; i < lines.length; i++) {
            ctx.fillText(lines[i], startX, startY + (i * lineHeight));
        }
        ctx.fillText(`${this.defeatedTargets}/${this.maxTargets} ` + this.missionObjective, this.position.x + 10 + xFix, this.position.y + 190 + yFix, this.dimensions.width)

    }

    checkTargets(){
        if(this.maxTargets <= this.defeatedTargets){
            player.inventory.addItem(this.missionReward)
            actualMission = ''
        }
    }

    update(){
        this.drawText()
        this.checkTargets()
    }
}

let actualMission = ''