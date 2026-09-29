// Function that performs validation and throws an error if conditions aren't met
function validateAge(age) {
  if (!age && age !== 0) {
    throw new Error("Please enter an age.");
  }
  
  if (age < 18) {
    throw new Error("You must be at least 18 years old.");
  }

  return "Access granted!";
}

// Handler function attached to the UI button
function handleValidation() {
  const inputVal = document.getElementById("ageInput").value;
  const messageElement = document.getElementById("message");

  // Reset classes
  messageElement.className = "message";

  try {
    const age = parseInt(inputVal, 10);
    const result = validateAge(age);
    
    messageElement.textContent = result;
    messageElement.classList.add("success");
  } catch (error) {
    // Catch the thrown Error object and display its message
    messageElement.textContent = error.message;
    messageElement.classList.add("error");
  }
}