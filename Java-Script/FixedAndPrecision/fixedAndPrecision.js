function onClickFixed(){
    debugger;
    var digits = Number(document.getElementById("digitsInput").value);
    var number = Number(document.getElementById("numbersInput").value);
  var Fixed = digits.toFixed(number);
  document.getElementById("pResult").innerHTML = Fixed;
}
function onClickPrecision(){
    debugger;
    var digits = Number(document.getElementById("digitsInput").value);
    var number = Number(document.getElementById("numbersInput").value);
    var Precision = digits.toPrecision(number);
    document.getElementById("pResult").innerHTML = Precision ;
}