 function onClickPercentage(){
            debugger;
            var Telugu=Number(document.getElementById("telugu").value);
             var Hindi=Number(document.getElementById("hindi").value);
              var English=Number(document.getElementById("english").value);
               var Maths=Number(document.getElementById("maths").value);
                var Science=Number(document.getElementById("science").value);
                 var Social=Number(document.getElementById("social").value);
                 var total=(Telugu + Hindi + English + Maths + Science + Social)+" out of 600";
                 var Percentage=((Telugu + Hindi + English + Maths + Science + Social)/600)* 100 +" %" ;
                 alert(Percentage);
                 alert(total);
        }
         function onClickAverage(){
            debugger;
            var Telugu=Number(document.getElementById("telugu").value);
             var Hindi=Number(document.getElementById("hindi").value);
              var English=Number(document.getElementById("english").value);
               var Maths=Number(document.getElementById("maths").value);
                var Science=Number(document.getElementById("science").value);
                 var Social=Number(document.getElementById("social").value);
                 var total=(Telugu + Hindi + English + Maths + Science + Social)+" out of 600";
                 var Average=(Telugu +Hindi + English + Maths + Science + Social) / 6;
                 alert(Average);
                 alert(total);

        }