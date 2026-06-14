function onClickRound(){
    debugger;
    var value = Number(document.getElementById("txtNumber").value);
    document.getElementById("pRound").innerHTML = Math.round(value);
}
function onClickCeil(){
    debugger;
    var value = Number(document.getElementById("txtNumber").value);
    document.getElementById("pCeil").innerHTML = Math.ceil(value);
}
function onClickFloor(){
    debugger;
    var value = Number(document.getElementById("txtNumber").value);
    document.getElementById("pFloor").innerHTML = Math.floor(value);
}
function onClickTrunc(){
    debugger;
    var value = Number(document.getElementById("txtNumber").value);
    document.getElementById("pTrunc").innerHTML = Math.trunc(value);
}