// CONSTANTS
const RANDOM_QUOTE_API_URL = "https://dummyjson.com/quotes";
const MAX_TIME_SECONDS = 60;

// selectors
const quote = getSelector(".typing__text");
const typingInput = getSelector(".typing__text-input");
const timer = getSelector(".typing__timer");
// initial values
let timerId = "";
let time = MAX_TIME_SECONDS;
timer.innerText = MAX_TIME_SECONDS;

function startTimer() {
  clearInterval(timerId);

  const id = setInterval(() => {
    if (time < 0) {
      // rest text area state
      typingInput.setAttribute("disabled", true);
      return;
    }
    const timer = getSelector(".typing__timer");
    timer.innerText = time;
    time--;
  }, 1000);
  timerId = id;
}

async function fetchData() {
  try {
    const res = await fetch(RANDOM_QUOTE_API_URL);
    if (!res.ok) {
      throw new Error("Error Fetching quotes");
    }
    const data = await res.json();

    if (data && data.quotes) {
      const randomIndex = Math.floor(Math.random() * data.quotes.length);
      const { quote } = data.quotes[randomIndex];

      // insert charaters with span element
      const quoteEle = getSelector(".typing__text");
      quoteEle.innerHTML = "";
      const charaters = quote
        .split("")
        .map((char, idx) => {
          return `<span>${char}</span>`;
        })
        .join("");

      // select quote
      quoteEle.innerHTML = charaters;

      // check each character on typing
      checkTypingCharacters();
    }
  } catch (err) {
    console.log(err);
  }
}

fetchData();

function checkTypingCharacters() {
  function getInput(e) {
    const typedText = e.target.value;
    const displayChar = getAllSelectors(".typing__text span");
    const characters = typedText.split("");
    for (let i = 0; i < typedText.length; i++) {
      const span = displayChar[i];
      const char = characters[i];
      if (char !== span.innerText) {
        span.classList.add("incorrect");
      } else {
        span.classList.add("correct");
      }
    }
  }

  typingInput.addEventListener("input", getInput);
}

function getSelector(inputClass) {
  return document.querySelector(inputClass);
}

function getAllSelectors(inputClass) {
  return document.querySelectorAll(inputClass);
}

const start = getSelector(".btn--start");
const reset = getSelector(".btn--reset");

start.addEventListener("click", (e) => {
  // reset state on start if time less than 0
  if (time < 0) {
    time = MAX_TIME_SECONDS;
    fetchData();
    typingInput.value = "";
  }
  // start typing timer
  startTimer();

  // rest text area state
  typingInput.removeAttribute("disabled");
  typingInput.focus();
});

reset.addEventListener("click", (e) => {
  clearInterval(timerId);
});
