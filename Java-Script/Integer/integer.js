function onClickCheck(){
    debugger;
    var value = Number(document.getElementById("txtNumber").value);
     document.getElementById("pResult").innerHTML = Number.isInteger(value);

}
