function onClickCheck(){
    debugger;
    var number = Number(document.getElementById("numberInput").value);
    var result = document.getElementById("pResult");
    if(number<=1){
        result.innerHTML = number + " is not a prime number";
    }
    else if(number==2){
        result.innerHTML = number + " is a prime number";
    }
    else if (number%2==0){
         result.innerHTML = number + " is not a prime number";
    }
    else{
         result.innerHTML = number + " is a prime number";
    }
}