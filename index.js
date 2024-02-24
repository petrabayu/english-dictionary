const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const sound = document.getElementById("sound");
const result = document.getElementById("result");
const button = document.getElementById("search-btn");

button.addEventListener("click", () => {
  const word = document.getElementById("input-word").value;
  const finalUrl = url + word;
  //   console.log(finalUrl);

  document.getElementById("input-word").value = "";
  fetch(finalUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      word.value = "";
      result.innerHTML = `
     <div class="word">
     <h1>${word}</h1>
     <button onClick ="playAudio()"><i class="fa fa-solid fa-volume-high"></i></button>
   </div>
   <div class="details">
     <p>${data[0].meanings[0].partOfSpeech}</p>
     <p>${data[0].phonetic}</p>
   </div>
   <p class="word-meaning">
     ${data[0].meanings[0].definitions[0].definition}
   </p>
   <p class="word-example">
     ${
       data[0].meanings[0].definitions[0].example ||
       "There is no example for this word"
     }
   </p>
 </div>
     `;
      sound.setAttribute("src", `${data[0].phonetics[0].audio}`);
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = `<h1 class='error'>Couldn't find the word</h1>`;
    });
});

function playAudio() {
  sound.play();
}
