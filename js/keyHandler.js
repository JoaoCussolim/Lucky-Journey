addEventListener('keydown', (e) => {
    if (acceptedKeys[e.key]) acceptedKeys[e.key](player);
    if (e.key === 'k'){
        dice.rolling = true;
    }
});

addEventListener('keyup', (e) => {
    if (acceptedKeys[e.key]) keyUpKeys[e.key](player);
});