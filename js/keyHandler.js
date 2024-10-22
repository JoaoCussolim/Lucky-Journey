addEventListener('keydown', (e) => {
    const pressedKey = e.key.toLowerCase()

    if (inNameSelect) {
        if (pressedKey === 'backspace') {
            canvasPrompText = canvasPrompText.slice(0, -1);
        }
        if(pressedKey.length < 2 && canvasPrompText.length < 9) canvasPrompText += e.key
    }

    if (acceptedKeys[e.key]) acceptedKeys[e.key](player);
    if (pressedKey === 'k') {
        dice.rolling = true;
    }
    if(pressedKey === 'f' && !dialogActive && actualNpc.talkable){
        actualNpc.talk()
    }
    if(pressedKey === 'e'){
        player.inventory.open()
    }
});

addEventListener('keyup', (e) => {
    if (keyUpKeys[e.key]) keyUpKeys[e.key](player);
});