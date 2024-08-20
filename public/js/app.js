
console.log("Client side javascript file is loaded!");

const spellCheckForm = document.querySelector(".spellcheck-form");
const textInput = document.querySelector("#text-input");
const outputOne = document.querySelector("#outputOne");
const outputTwo = document.querySelector("#outputTwo");

spellCheckForm.addEventListener("submit", (e) =>{
    e.preventDefault();

    const textInputValue = textInput.value;

    outputOne.textContent = "Loading...";
    outputTwo.textContent = "";

    fetch('/spellcheck?text=' + textInputValue)
    .then((response)=>{
        response.json()
     .then((data)=>{
        if(data.error){
            outputOne.textContent = data.error;
        }
        else{
            outputOne.textContent = data.correctedText;
            outputTwo.textContent = "Thankyou for visiting";
        }
     })
    })
})