 availableBalance=0;
        function onClickCredit() {
            debugger;
            var Credit = Number(document.getElementById("amount").value);
           availableBalance= availableBalance+Credit;
             var total=Credit+" Credited amount Balance :"+ availableBalance;
            alert(availableBalance);
            alert(total);
        }
        function onClickCDebit() {
            debugger;
          
            var Debit = Number(document.getElementById("amount").value);
            if(Debit>availableBalance){
                alert("Insufficent Balance")
            }
            else{
                availableBalance= availableBalance-Debit;
             var Value=Debit+" Debited amount Balance :"+ availableBalance;
            alert(availableBalance);
            alert(Value);
            }
            
        }