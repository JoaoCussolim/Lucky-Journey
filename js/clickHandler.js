addEventListener("click",(e) =>{
if(button.mouseOn){
    buttonClicked()
}

if(playbtn.mouseOn){
    playbtnClicked()
}

projectiles.push(new Projectile({ 
    position: { x: player.position.x, y: player.position.y }, 
    dimensions: { width: 100, height: 100 }, 
    velocity: {x: Math.cos(shootAngle) * 5, y: Math.sin(shootAngle) * 5}  
}))

if(dialogActive){
    if(canvasPrompResponse != ''){
        actualDialogBox.updateDialog()
        canvasPrompResponse = ''
    }
    //actualDialogBox.updateDialog()
}

})

let playbtnClicked = () =>{
    playbtn.mouseOn = false;
    started = true;
    console.log("PLAPLAPLAPLPALPALY")
}


let buttonClicked = () =>{
    console.log("button clicked");
    button.mouseOn = false;
}