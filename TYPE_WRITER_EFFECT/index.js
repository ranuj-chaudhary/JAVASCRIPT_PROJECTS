const typingText = document.querySelector(".banner__typing-text");

const words = ["Coder", "ReactDeveloper"];
let inc = 0;
let dec = 0;
let currIdx = 0;
let timerId = null;
function InsertCharcter() {
  let word = words[currIdx];
  let max = word.length;

  const id = setInterval(() => {

    if (inc < max) {
      inc++;
        console.log(word.substring(0, inc))
    } 
    
    if(inc === max && dec >= 0){
        console.log(word.substring(0, dec))
        dec--
    } 

    if(dec < 0 && currIdx < word.length) {
        currIdx++
        word = word[currIdx]
    }



  }, 1000);

  timerId = id;
}

