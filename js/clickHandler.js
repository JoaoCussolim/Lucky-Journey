addEventListener("click", (e) => {
    if(inCharacterSelect){
    if (mageButton.mouseOn) {
        player = new Mage({ position: { x: 950, y: 600 }, dimensions: { width: 50, height: 50 }, name: playerName });
        inCharacterSelect = false;
        
    }
    if (clericButton.mouseOn) {
        player = new Cleric({ position: { x: 950, y: 600 }, dimensions: { width: 50, height: 50 }, name: playerName });
        inCharacterSelect = false;
    }
    if (ArqueiroButton.mouseOn) {
        player = new Archer({ position: { x: 950, y: 600 }, dimensions: { width: 50, height: 50 }, name: playerName});
        inCharacterSelect = false;
    }
    if (GuerreiroButton.mouseOn) {
        player = new Warrior({ position: { x: 950, y: 600 }, dimensions: { width: 50, height: 50 }, name:'guerre' });
        inCharacterSelect = false;
    }
    }else if(!inNameSelect){
    if (player.dead) {
        location.reload();
    }

    if (playbtn.mouseOn) {
        playbtnClicked()
    }

    if (controlsbtn.mouseOn) {
        controlsbtnClicked()
    }

    if(player instanceof Mage){
    if (!player.attackInCooldown && player.mana >= 10) {
        
        projectiles.push(new magePower({
            position: { x: screenToWorldX(player.position.x), y: screenToWorldY(player.position.y) },
            dimensions: { width: 100, height: 100 },
            velocity: { x: Math.cos(shootAngle) * 5, y: Math.sin(shootAngle) * 5 },
            damage: 10
        }))
    // }else if(player instanceof Archer){
    //     projectiles.push(new Arrow({
    //         position: { x: screenToWorldX(player.position.x), y: screenToWorldY(player.position.y) },
    //         dimensions: { width: 50, height: 50 },
    //         velocity: { x: Math.cos(shootAngle) * 5, y: Math.sin(shootAngle) * 5 },
    //         angle: shootAngle,
    //     }))
    // }
    // else if(player instanceof Cleric){
    //     projectiles.push(new Raio({
    //         position: { x: e.clientX - 150, y: e.clientY - 130},
    //         dimensions: { width: 50, height: 50 },
    //         velocity: { x: 0, y: 0 },
    //     }))
    // }

        switch (player.direction) {
            case 'behind': player.switchSprite('AttackingBehind'); break;
            case 'forward': player.switchSprite('AttackingForward'); break;
            case 'side': player.switchSprite('AttackingSide'); break;
            case 'sideLeft': player.switchSprite('AttackingSideLeft'); break;
        }

        player.attacking = true;
        player.attackInCooldown = true;
        player.attackCooldown()
        player.mana -= 10;
    }

}else if(player instanceof Archer){
    if (!player.attackInCooldown && player.mana >= 10) {
 
        projectiles.push(new Arrow({
            position: { x: screenToWorldX(player.position.x), y: screenToWorldY(player.position.y) },
            dimensions: { width: 50, height: 50 },
            velocity: { x: Math.cos(shootAngle) * 5, y: Math.sin(shootAngle) * 5 },
            angle: shootAngle,
            damage: 5,
        }))

        switch (player.direction) {
            case 'behind': player.switchSprite('AttackingBehind'); break;
            case 'forward': player.switchSprite('AttackingForward'); break;
            case 'side': player.switchSprite('AttackingSide'); break;
            case 'sideLeft': player.switchSprite('AttackingSideLeft'); break;
        }

        player.attacking = true;
        player.attackInCooldown = true;
        player.attackCooldown()
        player.mana -= 10;
}
}
else if (player instanceof Cleric){
    if (!player.attackInCooldown && player.mana >= 50) {
 
        projectiles.push(new Raio({
                    position: { x: e.clientX - 150, y: e.clientY - 130},
                    dimensions: { width: 50, height: 50 },
                    velocity: { x: 0, y: 0 },
                    damage: 1
                }))

        switch (player.direction) {
            case 'behind': player.switchSprite('AttackingBehind'); break;
            case 'forward': player.switchSprite('AttackingForward'); break;
            case 'side': player.switchSprite('AttackingSide'); break;
            case 'sideLeft': player.switchSprite('AttackingSideLeft'); break;
        }

        player.attacking = true;
        player.attackInCooldown = true;
        player.attackCooldown()
        player.mana -= 50;
}
}
else if(player instanceof Warrior){

}

    if (dialogActive) {
        if (canvasPrompResponse != '') {
            actualDialogBox.updateDialog()
            canvasPrompResponse = ''
        }
        actualDialogBox.updateDialog()
    }
    }else{
        if(ConfirmButton.mouseOn){
            playerName = canvasPrompText;
            inNameSelect = false;
            inCharacterSelect = true;
        }
    }
})

let isDragging = false;
let startY;
let startScrollY;

addEventListener('mousedown', (e) => {
    if (player.inventory.visible) {
        const scrollbarWidth = 20;
        const scrollbarHeight = Math.max(player.inventory.listHeight / (player.inventory.itemHeight * player.inventory.totalItems) * player.inventory.listHeight, 30); // Minimum height of the scrollbar
        const maxScrollY = player.inventory.itemHeight * player.inventory.totalItems - player.inventory.listHeight;
        const scrollbarTop = (player.inventory.scrollY / maxScrollY) * (player.inventory.listHeight - scrollbarHeight) + player.inventory.listY;

        if (e.clientX > player.inventory.listX + player.inventory.listWidth && e.clientX < player.inventory.listX + player.inventory.listWidth + scrollbarWidth &&
            e.clientY > scrollbarTop && e.clientY < scrollbarTop + scrollbarHeight) {
            isDragging = true;
            startY = e.clientY;
            startScrollY = player.inventory.scrollY;
            e.preventDefault();
        }
    }
});


addEventListener('mousemove', (e) => {
    if (isDragging) {
        const deltaY = e.clientY - startY;
        const maxScrollY = player.inventory.itemHeight * player.inventory.totalItems - player.inventory.listHeight;
        player.inventory.scrollY = startScrollY + deltaY * (player.inventory.itemHeight * player.inventory.totalItems / player.inventory.listHeight);
        if (player.inventory.scrollY > maxScrollY) player.inventory.scrollY = maxScrollY;
        if (player.inventory.scrollY < 0) player.inventory.scrollY = 0;

        player.inventory.drawItems();
        player.inventory.updateScrollbarPosition();
    }
});

addEventListener('mouseup', () => {
    isDragging = false;
});


addEventListener('wheel', (e) => {
    if (player.inventory.visible) {
        const scrollAmount = e.deltaY;

        const maxScrollY = player.inventory.itemHeight * player.inventory.totalItems - player.inventory.listHeight;
        player.inventory.scrollY += scrollAmount;

        if (player.inventory.scrollY > maxScrollY) player.inventory.scrollY = maxScrollY;
        if (player.inventory.scrollY < 0) player.inventory.scrollY = 0;

        player.inventory.drawItems();
        player.inventory.updateScrollbarPosition();
    }
});




let playbtnClicked = () => {
    playbtn.mouseOn = false;
    console.log("CLICKED")
    SlotMachine.switchSprite("Push");
    played = true;
}

let controlsbtnClicked = () => {
    controlsbtn.mouseOn = false;

}

let buttonClicked = () => {
    console.log("button clicked");
    button.mouseOn = false;
}