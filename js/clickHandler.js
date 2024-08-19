addEventListener("click",(e) =>{
if(button.mouseOn){
    buttonClicked()
}

projectiles.push(new Projectile({ 
    position: { x: player.position.x, y: player.position.y }, 
    dimensions: { width: 200, height: 200 }, 
    velocity: {x: Math.cos(shootAngle) * 5, y: Math.sin(shootAngle) * 5}  
}))

})


let buttonClicked = () =>{
    console.log("button clicked");
    button.mouseOn = false;
}