let timerId; // store timeout ID

function startTimer() {
    document.getElementById("message").innerText = "Timer started... will show message in 5 seconds!";
    
    // setTimeout returns an ID we can use to cancel
    timerId = setTimeout(() => {
        document.getElementById("message").innerText = "⏰ Time's up! This message appeared after 5 seconds.";
    }, 5000);
}

function stopTimer() {
    clearTimeout(timerId); // cancel the timeout
    document.getElementById("message").innerText = "❌ Timer stopped before completion.";
}
