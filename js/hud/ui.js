let characterSelection = () =>{
ctx.fillStyle = "rgba(0,0,0,0.5)";
ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.fillStyle = "rgb(235, 178, 80)";
ctx.fillRect(30,30,canvas.width-60,canvas.height-60);
ctx.fillStyle = "black";
ctx.font = "50px arial";
ctx.textAlign = "center";
ctx.fillText("Escolha Seu Personagem",canvas.width/2,100)
ctx.font= "25px arial";
ctx.fillText("Mago",200,700)
}
