let pyodide;

// Load Pyodide and Initialize
async function initPyodide() {
  pyodide = await loadPyodide();
  logToConsole("Pyodide loaded successfully.");
  await loadAlgorithms();
}
initPyodide();

// Log Messages to Console
function logToConsole(message) {
  const consoleDiv = document.getElementById("console");
  consoleDiv.innerHTML += message + "<br>";
  consoleDiv.scrollTop = consoleDiv.scrollHeight;
}

// Dynamically Load Algorithms from the Folder
async function loadAlgorithms() {
  const response = await fetch("/algorithms.json"); // Fetch the JSON file
  const files = await response.json();
  const dropdown = document.getElementById("algorithm");
  dropdown.innerHTML = ""; // Clear existing options

  files.forEach((file) => {
    const option = document.createElement("option");
    option.value = file.replace(".py", ""); // Remove extension for readability
    option.textContent = file.replace(".py", "");
    dropdown.appendChild(option);
  });

  updateSettings(); // Update settings for the first algorithm
}


// Update Settings Based on Selected Algorithm
function updateSettings() {
  const algorithm = document.getElementById("algorithm").value;
  const settingsDiv = document.getElementById("settings");
  settingsDiv.innerHTML = `
        <label for="input">Input:</label>
        <input type="number" id="input" value="5" />
    `;
}

// Run the Selected Algorithm
async function runAlgorithm() {
  const algorithm = document.getElementById("algorithm").value;
  const input = document.getElementById("input").value;

  const response = await fetch(`/algorithms/${algorithm}.py`);
  const code = await response.text();

  const logFunction = `
def log(message):
    import js
    js.logToConsole(message)
    `;

  const finalCode = code.replace("INPUT_PLACEHOLDER", input);

  try {
    await pyodide.runPythonAsync(logFunction + finalCode);
  } catch (err) {
    logToConsole("Error: " + err);
  }
}
