function onClickMax(){
    debugger;
    var firstNumber = Number(document.getElementById("firstNumber").value);
    var secondtNumber = Number(document.getElementById("secondtNumber").value);
    var thirdNumber = Number(document.getElementById("thirdNumber").value);
    var fourthNumber = Number(document.getElementById("fourthNumber").value);
    var fifthNumber = Number(document.getElementById("fifthNumber").value);
    var sixthNumber = Number(document.getElementById("sixthNumber").value);
    document.getElementById("pResult").innerHTML = Math.max(firstNumber,secondtNumber,thirdNumber,fourthNumber,fifthNumber,sixthNumber)+" is max value";
}
function onClickMin(){
    debugger;
     var firstNumber = Number(document.getElementById("firstNumber").value);
    var secondtNumber = Number(document.getElementById("secondtNumber").value);
    var thirdNumber = Number(document.getElementById("thirdNumber").value);
    var fourthNumber = Number(document.getElementById("fourthNumber").value);
    var fifthNumber = Number(document.getElementById("fifthNumber").value);
    var sixthNumber = Number(document.getElementById("sixthNumber").value);
    document.getElementById("pResult").innerHTML = Math.min(firstNumber,secondtNumber,thirdNumber,fourthNumber,fifthNumber,sixthNumber)+" is max value";
}