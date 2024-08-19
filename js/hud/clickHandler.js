addEventListener("click",(e) =>{
if(button.mouseOn){
    buttonClicked()
}

})


let buttonClicked = () =>{
    console.log("button clicked");
    button.mouseOn = false;
}