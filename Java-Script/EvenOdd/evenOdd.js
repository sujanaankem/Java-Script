 function onClickSubmit(){
      debugger;
      var number=document.getElementById("result").value;
      if(number%2==0){
      result=number+" is an even number";
    alert(result);
    }else{
result=number+" is an odd number";
    alert(result);
    }
}