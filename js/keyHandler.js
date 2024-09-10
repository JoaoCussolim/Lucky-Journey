addEventListener('keydown', (e) => {
    if (acceptedKeys[e.key]) acceptedKeys[e.key](player);
    if (e.key === 'k') {
        dice.rolling = true;
    }
    if(e.key === 'f'){
        testNpc.talk()
    }

    if (canvasPromptActive) {
        if (e.key === 'Backspace') {
            canvasPrompText = canvasPrompText.slice(0, -1);
        }
        if(e.key.length < 2) canvasPrompText += e.key
        if(e.key === 'Enter'){
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

    if(e.key === 'p'){
        question = canvasPrompt('Ask a question: ');
    }
});

addEventListener('keyup', (e) => {
    if (acceptedKeys[e.key]) keyUpKeys[e.key](player);
});