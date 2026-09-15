function checkError() {
    try {
        let name = userName;
        document.getElementById("result").innerHTML = name;
    }
    catch (error) {
        document.getElementById("result").innerHTML =
            "Error: " + error.message;
    }
}