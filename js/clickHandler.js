addEventListener("click", (e) => {
    if (button.mouseOn) {
        buttonClicked()
    }

    if (playbtn.mouseOn) {
        playbtnClicked()
    }

    if (controlsbtn.mouseOn) {
        controlsbtnClicked()
    }

    projectiles.push(new Projectile({
        position: { x: screenToWorldX(player.position.x), y: screenToWorldY(player.position.y) },
        dimensions: { width: 100, height: 100 },
        velocity: { x: Math.cos(shootAngle) * 5, y: Math.sin(shootAngle) * 5 }
    }))

    if (dialogActive) {
        if (canvasPrompResponse != '') {
            actualDialogBox.updateDialog()
            canvasPrompResponse = ''
        }
        actualDialogBox.updateDialog()
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


// Handle mouse wheel scrolling
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

