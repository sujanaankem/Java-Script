// Simulate fetching data with a delay
function getData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("✅ Data fetched successfully!");
    }, 2000); // 2-second delay
  });
}

// Async function using await
async function fetchData() {
  const output = document.getElementById("output");
  output.textContent = "⏳ Loading...";
  
  try {
    const result = await getData(); // Wait until promise resolves
    output.textContent = result;
  } catch (error) {
    output.textContent = "❌ Error fetching data!";
  }
}

// Attach event listener to button
document.getElementById("fetchBtn").addEventListener("click", fetchData);
