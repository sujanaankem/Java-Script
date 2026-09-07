function onClickCheck(){
    debugger;
    console.log(window.navigation);
    let userName =window.prompt("What is your name","guest");
    if(userName == null){
        document.querySelector("#greeting").innerHTML = "You canceled the prompt.";
    }else if(userName.trim() === ""){
        document.querySelector("#greeting").innerHTML = "You didn't enter the name!";
    }else{
        document.querySelector("#greeting").innerHTML = "Hello, "+ userName + "! welcome.";
    }
   
}

 addEventListener('click',onClickCheck);
