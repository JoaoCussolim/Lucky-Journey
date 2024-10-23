const makeEnemies = (quantity) => {
    for (let i = 0; i < quantity; i++) {
        let cordinatesValuex = RandomInt(player.position.x - 200, player.position.x + 400);
        let cordinatesValuey = RandomInt(player.position.y - 200, player.position.y + 400);
        enemies.push(new Slime({ position: { x: cordinatesValuex, y: cordinatesValuey }, dimensions: { width: 50, height: 50 } }))
    };
};

const enemiesAutomaticSpawn = () => {
    if(playerWalkingDistance > RandomInt(500, 2000)){
        makeEnemies(RandomInt(1, 5));
        playerWalkingDistance = 0;
    }
}