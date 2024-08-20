addEventListener('keydown', (e) => {
    if (acceptedKeys[e.key]) acceptedKeys[e.key](player);
    if (e.key === 'k'){
        diceMe.rollable = true;
        dice.rollable = true;
    }
});

addEventListener('keyup', (e) => {
    if (acceptedKeys[e.key]) keyUpKeys[e.key](player);
});