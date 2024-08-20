const spellcheck = require('./spellcheck'); // Import the function

const text = "helloa howw are you";

spellcheck(text, (error, data) => {
  if (error) {
    console.error('Error:', error);
  } else {
    // Now you have the response data from the API in 'data'
    const correctedText = replaceWithBestCandidate(data);
    console.log(correctedText);
  }
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
