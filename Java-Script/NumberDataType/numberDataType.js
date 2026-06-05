alert("Are you sure you want to open this page");
console.log("page opened");
function onClickAddition(){
    debugger;
    var firstName=Number(document.getElementById("num1").value);
    var secondName=Number(document.getElementById("num2").value);
    var Addition = firstName + secondName;
    alert(Addition);
}
function onClickSubtract(){ 
    debugger;
    var firstName=Number(document.getElementById("num1").value);
    var secondName=Number(document.getElementById("num2").value);
    var sub = firstName - secondName;
    alert(sub);
}
function onClickMultiplication(){ 
    debugger;
    var firstName=Number(document.getElementById("num1").value);
    var secondName=Number(document.getElementById("num2").value);
    var mul = firstName * secondName;
    alert(mul);
}
function onClickDivision(){ 
    debugger;
    var firstName=Number(document.getElementById("num1").value);
    var secondName=Number(document.getElementById("num2").value);
    var div = firstName / secondName;
    alert(div);
}
function onClickRemainder(){
    debugger;
    var firstName=Number(document.getElementById("num1").value);
    var secondName=Number(document.getElementById("num2").value);
    var remainder=firstName % secondName;
    alert(remainder);
}

function onClickNumber(){ 
    debugger;
    var number=Number(document.getElementById("square").value);
    var square = number * number;
    alert(square);
}

function onClickMulti(){ 
    debugger;
    var number=Number(document.getElementById("circle").value);
    var multi = number * 5;
    alert(multi);
}

