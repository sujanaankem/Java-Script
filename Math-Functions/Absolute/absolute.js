function onClickDynamic(){
    debugger;
    let dynamic = Number(document.getElementById("txtNumber").value);
    document.getElementById("pDynamic").innerHTML = Math.abs(dynamic);
}
function onClickStatic(){
    debugger;
    document.getElementById("pStatic").innerHTML = Math.abs(-10);
}