function onClickDynamic(){
    debugger;
    let dynamic = Number(document.getElementById("txtNumber").value);
    document.getElementById("pDynamic").innerHTML = Math.trunc(Math.random()*Math.pow(10, dynamic));
}
function onClickStatic(){
    debugger;
    document.getElementById("pStatic").innerHTML = Math.random()*10000;
}