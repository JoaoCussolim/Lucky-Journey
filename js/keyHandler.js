addEventListener('keydown', (e) => {
    const pressedKey = e.key.toLowerCase()
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

    if (canvasPromptActive) {
        if (pressedKey === 'backspace') {
            canvasPrompText = canvasPrompText.slice(0, -1);
        }
        if(pressedKey.length < 2) canvasPrompText += e.key
        if(pressedKey === 'enter'){
            canvasPromptActive = false;
            query({"inputs": canvasPrompText}).then((response) => {
                canvasPrompResponse = response
                console.log(JSON.stringify(response));
                dialogosAleatorios.push(response[0].generated_text)
            });
            dialogActive = true 
            canvasPrompText = ''
        }
    }

    if(pressedKey === 'p'){
        question = canvasPrompt('Ask a question: ');
    }
});

addEventListener('keyup', (e) => {
    if (keyUpKeys[e.key]) keyUpKeys[e.key](player);
});