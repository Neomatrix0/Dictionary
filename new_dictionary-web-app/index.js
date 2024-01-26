const getButton = document.getElementById("btn1");
const inputField = document.getElementById("wordInput");
const dictionaryDataElement = document.getElementById('dictionaryData');
const toggleBtn=document.getElementById("modeToggle");
let html = '';

const displayWordData = (wordData) =>{
    const word = wordData.word;
    const meanings = wordData.meanings;
    const phonetics = wordData.phonetics; //added
     

//display the word
const wordElement = document.createElement('h1');
wordElement.textContent = `Word: ${word}`;
dictionaryDataElement.appendChild(wordElement);

 // Display phonetics
 if (phonetics && phonetics.length > 0) {
    phonetics.forEach(phonetic => {
        const phoneticText = phonetic.text;
        const phoneticElement = document.createElement('h3');
        phoneticElement.textContent = `Phonetic: ${phoneticText}`;
        dictionaryDataElement.appendChild(phoneticElement);
    });}
    

// display meanings
meanings.forEach(meaning => {
    const partOfSpeech = meaning.partOfSpeech;
    const definitions = meaning.definitions;
    


    // Display part of the speech

    const partOfSpeechElement = document.createElement('h3');
    partOfSpeechElement.textContent = `Part of Speech: ${partOfSpeech}`;
    dictionaryDataElement.appendChild(partOfSpeechElement);
    console.log(definitions)

    // Display definitions
    definitions.forEach(definition => {
        const definitionText = definition.definition;
        console.log(definitionText)
       
        html = `<div class="def-container"> <h3 class="bullet-point">•</h3><p class="definition" >${definitionText}</p></div>`;
        dictionaryDataElement.innerHTML += html;
      });
    });

}

//fetch data


const getData = () =>{
    const word = inputField.value.trim();
    if (word) {
axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`).then(response =>{
    //console.log(response.data)

    const wordData = response.data[0];
    dictionaryDataElement.innerHTML = '';
    displayWordData(wordData);
    //aggiunta


}).catch(error =>{
    console.error("error fetching data:", error)
    dictionaryDataElement.textContent = 'Failed to fetch data.';
})
}else{
    console.error("Please enter a valid word")
    dictionaryDataElement.textContent = 'Please enter a valid word.';
}}

if(getButton){
getButton.addEventListener('click',getData);

}else{
    console.error("Button not found")
}
toggleBtn.addEventListener('click',()=>{
    document.body.classList.toggle('dark-mode');
    inputField.classList.toggle('dark-mode');
})

