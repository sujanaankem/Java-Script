function onClickCheckValue(){
    debugger;
    var number = Number(document.getElementById("numberInput").value);
    var result = document.getElementById("pResult");
    if (number == 2){
        result.innerHTML="The number is 2";
    }
    else if(number==7){
        result.innerHTML="The number is 7";
    }
    else if(number==1){
        result.innerHTML="The number is 1";
    }
    else if(number==6){
        result.innerHTML="The number is 6";
    }
    else{
        result.innerHTML="The number is another number";
    }
}