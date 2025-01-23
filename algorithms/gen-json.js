const fs = require("fs");
const path = require("path");

// Path to the algorithms folder and output JSON file
const algorithmsFolder = path.join(__dirname, "algorithms");
const outputFilePath = path.join(__dirname, "algorithms.json");

// Read all `.py` files in the `algorithms` folder
const generateJSON = () => {
  const files = fs
    .readdirSync(algorithmsFolder)
    .filter((file) => file.endsWith(".py"));

  // Write the list to `algorithms.json`
  fs.writeFileSync(outputFilePath, JSON.stringify(files, null, 2));
  console.log(`Generated algorithms.json with ${files.length} files.`);
};

// Generate the JSON
generateJSON();
