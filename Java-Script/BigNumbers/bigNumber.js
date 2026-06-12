function onClickBigNumber() {
    debugger;
    var firstNumber = Number(document.getElementById("txtFirstNumber").value);
    var secondNumber = Number(document.getElementById("txtSecondNumber").value);
    var result = document.getElementById("pResult");
    if (firstNumber > secondNumber) {
        result.innerHTML =  firstNumber + " is a Big number";
    }
    else {
        result.innerHTML = secondNumber + " is a Big number";
    }
}