 replay = 2;
        function onClickMultiply() {
            debugger;
            var Multiply = Number(document.getElementById("multiplication").value);
            replay = Multiply * replay;
            alert(replay);
        }
        result = 5;
        function onClickDivide() {
            debugger;
            var Divide = Number(document.getElementById("division").value);
            result = Divide / result;
            alert(result);
        }