function onClickStatic(){
    debugger;
    document.getElementById("pStatic").innerHTML = Math.pow(10,5);
}
function onClickDynamic(){
debugger;
let number = Number(document.getElementById("txtNumber").value);
let power = Number(document.getElementById("txtPower").value);
document.getElementById("pDynamic").innerHTML = Math.pow(number,power);
}