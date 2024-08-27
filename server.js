
const path = require("path");
const express = require("express");
const spellcheck = require('./spellcheck'); // Import the function

const app = express();
const port = process.env.port || 8080;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "public");

// Setup static directory to serve
app.use(express.json());
app.use(express.static(publicDirectoryPath));

//define API endpoint to process get request send by user
app.get("/spellcheck",(req,res)=>{
const text = req.query.text;

spellcheck(text, (error, data) => {
  if (error) {
    console.error('Error:', error);
  } else {
    // Now you have the response data from the API in 'data'
    const correctedText = replaceWithBestCandidate(data);
    console.log(data)
    console.log(correctedText);
    res.send({correctedText});
  }
})
});

// Function to replace text with best_candidate
function replaceWithBestCandidate(data) {
    let updatedText = data.original_text;
  
    data.corrections.forEach(correction => {
      const { text, best_candidate } = correction;
      // Replace the text with the best_candidate
      updatedText = updatedText.replace(text, best_candidate);
    });
  
    return updatedText;
}

app.listen(port, () => {
  console.log("Server is up on port " + port);
});