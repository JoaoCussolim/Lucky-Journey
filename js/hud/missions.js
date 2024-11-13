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
    
        // Get canvas width and height for scaling
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
    
        // Dynamic scaling factors based on canvas size
        const borderSize = canvasWidth * 0.01; // 1% of canvas width
        const borderColor = 'rgba(237, 172, 74, 1)';
        
        // Dynamic positioning and dimensions
        const xFix = canvasWidth * 0.48; // 5% of canvas width as offset
        const yFix = -canvasHeight * 0.7; // 10% of canvas height as offset
        const widthFix = canvasWidth * 0.5; // 10% of canvas width reduction
        
        // Dynamic font size based on canvas width
        const fontSize = canvasWidth * 0.02; // 3% of canvas width
        ctx.font = `${fontSize}px Pixeloid`;
    
        // Calculate responsive dimensions for the text box
        const boxWidth = this.dimensions.width - widthFix;
        const boxHeight = this.dimensions.height;
        
        // Draw border around the text box
        drawBorder(
            this.position.x + xFix, 
            this.position.y + 5 + yFix, 
            boxWidth, 
            boxHeight, 
            borderSize, 
            borderColor
        );
    
        // Draw background for text box
        ctx.fillStyle = 'rgba(67, 93, 115, 1)';
        ctx.fillRect(this.position.x + xFix, this.position.y + 5 + yFix, boxWidth, boxHeight);
    
        // Draw the text
        ctx.fillStyle = 'rgba(245, 203, 83, 1)';
        ctx.textAlign = 'start';
    
        // Dynamic max width for text wrapping
        const maxWidth = boxWidth - 10;
    
        // Text wrapping function
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
    
        const text = this.missionName;
        const lines = wrapText(text, maxWidth);
    
        // Dynamic line height based on font size
        const lineHeight = fontSize * 1.2; 
        const startX = this.position.x + 10 + xFix;
        const startY = this.position.y + 40 + yFix;
    
        // Draw each line of text
        for (let i = 0; i < lines.length; i++) {
            ctx.fillText(lines[i], startX, startY + (i * lineHeight));
        }
    
        // Draw additional mission information (adapted for responsive design)
        const missionInfoY = startY + (lines.length * lineHeight) + lineHeight;
        ctx.fillText(
            `${this.defeatedTargets}/${this.maxTargets} ` + this.missionObjective, 
            startX, 
            missionInfoY, 
            maxWidth
        );
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