const url = "https://gist.githubusercontent.com/nasrulhazim/54b659e43b1035215cd0ba1d4577ee80/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
const quoteDiplayElement = document.querySelector("#quoteDisplay");
const quoteInputElement = document.querySelector("#quoteInput");
const timerElement = document.getElementById("timer");
let timer;

quoteInputElement.addEventListener("input",()=>{
   const arrayQuote = quoteDiplayElement.querySelectorAll("span")
   const arrayValue = quoteInputElement.value.split('');
   
   let correct = true;
   arrayQuote.forEach((char, i)=>{
      const isEqual = arrayValue[i] === char.innerText;
      if(isEqual) {
         arrayQuote[i].classList.add("correct");
         arrayQuote[i].classList.remove("incorrect");
         correct = true
      }
      if(!isEqual) {
         arrayQuote[i].classList.add("incorrect");
         arrayQuote[i].classList.remove("correct");
         correct = false;
      }
      if(arrayValue[i] == null) {
         arrayQuote[i].classList.remove("correct","incorrect");
         correct = false;
      }
      
   })
   console.log(arrayQuote.length);
   console.log(arrayValue.length);
   console.log(correct);
   if (correct) renderNewQuote();
})

async function getRandomQuote(){
   return fetch(url)
   .then(res=>res.json())
   .then(json=>{
      // console.log(json);
      let i = (Math.random()*100).toFixed(0)
      // console.log(json.quotes[i])
      return `${json.quotes[i].quote}`;
   })
   

}


async function renderNewQuote(){
   const quote = await getRandomQuote();
   clearTimeout(timer);
   // timer = startTimer();
   quoteDiplayElement.textContent = null;
   quoteInputElement.value = null;
   quote.split('').forEach(elem=>{

      const characterSpan = document.createElement('span');
      characterSpan.innerText = elem;
      quoteDiplayElement.appendChild(characterSpan);

   })

}

// let startTime;
// function startTimer(){
//    let time = 0;
//    timerElement.innerText = 0;
//    startTime = new Date();
//    const timerID = setInterval(()=>{
//       timerElement.innerHTML = `${getTimerTime()}s`;
//    },1000);
//    return timerID;
// }

// function getTimerTime(){
//    return ((new Date() - startTime)/1000).toFixed(0);
// }



renderNewQuote()