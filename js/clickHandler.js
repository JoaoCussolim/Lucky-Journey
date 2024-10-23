addEventListener("click", (e) => {
    if (inCharacterSelect) {
        if (mageButton.mouseOn) {
            player = new Mage({ position: { x: 950, y: 600 }, dimensions: { width: 50, height: 50 }, name: playerName });
            inCharacterSelect = false;

        }
        if (clericButton.mouseOn) {
            player = new Cleric({ position: { x: 950, y: 600 }, dimensions: { width: 50, height: 50 }, name: playerName });
            inCharacterSelect = false;
        }
        if (ArqueiroButton.mouseOn) {
            player = new Archer({ position: { x: 950, y: 600 }, dimensions: { width: 50, height: 50 }, name: playerName });
            inCharacterSelect = false;
        }
        if (GuerreiroButton.mouseOn) {
            player = new Warrior({ position: { x: 950, y: 600 }, dimensions: { width: 50, height: 50 }, name: playerName });
            inCharacterSelect = false;
        }
    } else if (!inNameSelect) {
        if (player.dead) {
            location.reload();
        }

        if (playbtn.mouseOn) {
            playbtnClicked()
        }

        if (controlsbtn.mouseOn) {
            controlsbtnClicked()
        }

        if (player instanceof Mage) {
            if (!player.attackInCooldown && player.mana >= 10) {

                projectiles.push(new magePower({
                    position: { x: screenToWorldX(player.position.x), y: screenToWorldY(player.position.y) },
                    dimensions: { width: 100, height: 100 },
                    velocity: { x: Math.cos(shootAngle) * 5, y: Math.sin(shootAngle) * 5 },
                    damage: player.baseDamage
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

        } else if (player instanceof Archer) {
            if (!player.attackInCooldown && player.mana >= 10) {

                projectiles.push(new Arrow({
                    position: { x: screenToWorldX(player.position.x), y: screenToWorldY(player.position.y) },
                    dimensions: { width: 50, height: 50 },
                    velocity: { x: Math.cos(shootAngle) * 5, y: Math.sin(shootAngle) * 5 },
                    angle: shootAngle,
                    damage: player.baseDamage/2,
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
        else if (player instanceof Cleric) {
            if (!player.attackInCooldown && player.mana >= 50) {

                projectiles.push(new Raio({
                    position: { x: e.clientX - 150, y: e.clientY - 130 },
                    dimensions: { width: 50, height: 50 },
                    velocity: { x: 0, y: 0 },
                    damage: player.baseDamage / 10
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
        else if (player instanceof Warrior) {
            if (!player.attackInCooldown && player.mana >= 5) {

                projectiles.push(new Swing({
                    position: { x: screenToWorldX(player.position.x), y: screenToWorldY(player.position.y) },
                    dimensions: { width: 50, height: 50 },
                    velocity: { x: 0, y: 0 },
                    damage: player.baseDamage * 2,
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
                player.mana -= 5;
            }
        }

        if (dialogActive) {
            if (canvasPrompResponse != '') {
                actualDialogBox.updateDialog()
                canvasPrompResponse = ''
            }
            actualDialogBox.updateDialog()
        }
    } else {
        if (ConfirmButton.mouseOn) {
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
    if(!inNameSelect && !inCharacterSelect){
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

        const playerEquipItemIndex = player.inventory.getHoveredItemIndex();
        const playerItem = player.inventory.items[playerEquipItemIndex];
        if (playerItem != null) {
            equipItemType[playerItem.type](playerItem);
        }
    }
}
});

let mousePos = { x: 0, y: 0 }

addEventListener('mousemove', (e) => {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;

    if (isDragging) {
        const deltaY = mousePos.y - startY;
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