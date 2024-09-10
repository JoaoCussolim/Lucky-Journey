addEventListener('keydown', (e) => {
    if (acceptedKeys[e.key]) acceptedKeys[e.key](player);
    if (e.key === 'k'){
        dice.rolling = true;
    }

    if (e.key.toLowerCase() === 'e'){
        if (player.inventory.visible)
        player.inventory.visible = false;
        else player.inventory.visible = true;
    }


});

addEventListener('keyup', (e) => {
    if (acceptedKeys[e.key]) keyUpKeys[e.key](player);
});