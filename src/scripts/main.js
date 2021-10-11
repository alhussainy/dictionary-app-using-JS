import { fetchAPI } from "./dictionaryAPI";

const wrapper = document.querySelector('.wrapper'),
    searchInput = wrapper.querySelector('input'),
    infoText = wrapper.querySelector('.info-text');
  
function search(word) {
    console.log("search again")
    searchInput.value = word;
    creatRequest(word);
    wrapper.classList.remove("active");
}
function creatRequest (word) {
    infoText.innerHTML=`Searching the meaning of <span>"${word}"</span>`;
    let result = [];
  
    fetchAPI(word).then(res => {
        if (res.title) {
            wrapper.classList.remove("active");
            infoText.innerHTML = `Cannot find the meaning of "${word}", please try another word."`;
        } else {
            Object.assign(result, ...res);
            
            handleData(result,wrapper);
        }
       
    });
   
}

let audio;  
function handleData (data, wrapper){
    const definition = data.meanings[0].definitions[0];
    const phonetics = `${data.meanings[0].partOfSpeech} / ${data.phonetics[0].text}/`;
    wrapper.classList.add("active");
    wrapper.querySelector('.word p').innerText = data.word;
    wrapper.querySelector('.word span').innerText = phonetics;
    wrapper.querySelector('.meaning span').innerText =definition.definition;
    wrapper.querySelector('.example span').innerText = definition.example;
    const synonyms = wrapper.querySelector(".synonyms .list");
    const volumeIcon = wrapper.querySelector(".word .fa-volume-up");
    const removeIcon = wrapper.querySelector('.search span');
    volumeIcon.removeEventListener('click', playAudio);
    
    audio = new Audio("https:"+data.phonetics[0].audio)
    synonyms.innerHTML = "";
    if (definition.synonyms[0] == undefined) {
        synonyms.parentElement.style.display = "none";
    } else {
         synonyms.parentElement.style.display = "block";
        for (let i = 0; i < 5; i++){
            let tag = document.createElement('span');
            tag.innerHTML = `${definition.synonyms[i]},`;
            tag.addEventListener('click', ()=>search(definition.synonyms[i]));
            synonyms.appendChild( tag);
        }
       
    }
    
    volumeIcon.addEventListener('click', playAudio);
    removeIcon.addEventListener('click', () => {
        infoText.innerHTML = "Type a word and press enter to get meaning, example, pronunciation, and synonyms of that typed word.";
    searchInput.value = '';
    searchInput.focus();
    wrapper.classList.remove("active");
})
    
}

function playAudio(){
     audio.play();
}

searchInput.addEventListener(
    "keyup",
    event => {
        if(event.key === "Enter" && event.target.value)
        {
           creatRequest(event.target.value);
       }
    }
)

export{search,handleData,creatRequest}