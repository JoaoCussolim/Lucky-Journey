addEventListener('keydown', (e) => {
    const pressedKey = e.key.toLowerCase()

    if (inNameSelect) {
        if (pressedKey === 'backspace') {
            canvasPrompText = canvasPrompText.slice(0, -1);
        }
        if (pressedKey.length < 2 && canvasPrompText.length < 9) canvasPrompText += e.key
    } else {

        if (acceptedKeys[e.key]) acceptedKeys[e.key](player);
        if (pressedKey === 'k') {
            dice.rolling = true;
        }
        if (pressedKey === 'f' && !dialogActive && actualNpc.talkable) {
            actualNpc.talk()
        }
        if (pressedKey === 'e') {
            player.inventory.open()
        }

        if (pressedKey === 'a') {
            if (potionIndex > 0) {
                potionIndex--
            }
        }
        if (pressedKey === 'd') {
            if (potionIndex < potions.length - 1) {
                potionIndex++
            }
        }
        if (pressedKey === 'w') {
            const actualPotion = potions[potionIndex]
            if (actualPotion.quantity > 0) {
                actualPotion.quantity--
                actualPotion.use()
            }
        }
    }
});

addEventListener('keyup', (e) => {
    if (keyUpKeys[e.key]) keyUpKeys[e.key](player);
});