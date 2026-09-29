function checkError() {
    try {
       
        let name = userNames;
        document.getElementById("result").innerHTML = name;
    }
    catch (error) {
        debugger
        document.getElementById("result").innerHTML =
            "Error: " + error.message;
    }

   
}