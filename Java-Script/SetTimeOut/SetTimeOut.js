function showMessage() {

    document.getElementById("message").innerHTML = "Please wait...";

    setTimeout(function() {
        document.getElementById("message").innerHTML = "Hello! 3 seconds completed.";
    }, 3000);

}