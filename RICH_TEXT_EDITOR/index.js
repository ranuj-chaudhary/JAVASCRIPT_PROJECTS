const format = document.querySelectorAll(".format");
const script = document.querySelectorAll(".script");
const align = document.querySelectorAll(".align");
const spacing = document.querySelectorAll(".spacing");
const optionButton = document.querySelectorAll(".option-button");
const advOptionAdvance = document.querySelectorAll(".adv-option-button");
const fontName = document.getElementById("fontName");
const fontSize = document.getElementById("fontSize");
const textInput = document.getElementById("text-input");
// fontlist
let fontList = [
  "Arial",
  "Verdana",
  "Times New Roman",
  "Garamond",
  "Courier New",
  "cursive",
];

initiliaser();

function initiliaser() {
  highlighter(format, false);
  highlighter(script, true);
  highlighter(align, true);
  highlighter(spacing, true);

  fontList.map((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.innerText = value;
    fontName.appendChild(option);
  });

  for (let i = 0; i < 10; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.innerText = i;
    fontSize.appendChild(option);
  }

  // default value of font
  fontSize.value = 3;
}
function highlighter(className, needRemoval) {
  className.forEach((button) => {
    button.addEventListener("click", (e) => {
      console.log(e);
      if (needRemoval) {
        // remove all class before adding new
        removeActive(className);

        // add remove class from clicked tool
        if (button.classList.contains("active")) {
          button.classList.remove("active");
        } else {
          button.classList.add("active");
        }
      } else {
        button.classList.toggle("active");
      }
    });
  });
}

function removeActive(className) {
  className.forEach((ele) => ele.classList.remove("active"));
}

function modifyText(command, defaultUi, value) {
  document.execCommand(command, defaultUi, value);
}

optionButton.forEach((button) => {
  button.addEventListener("click", () => {
    modifyText(button.id, false, null);
  });
});

advOptionAdvance.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.id === "createLink") {
      let url = prompt("enter the url");
      // check valid url
      let validUrl = /http/i.test(url);
      // if not valid update url
      url = validUrl ? url : "https://" + url;
      // execute command
      modifyText(button.id, false, url);
    } else if (button.id === "unlink") {
      modifyText(button.id, false, null);
    } else {
      modifyText(button.id, false, button.value);
    }
    // anchor functionality
    const anchors = textInput.querySelectorAll("a");
    anchors.forEach((anchor) => {
      anchor.addEventListener("mouseenter", (e) => {
        textInput.setAttribute("contenteditable", "false");
        e.target.setAttribute("target", "_blank");
      });
      anchor.addEventListener("mouseleave", (e) => {
        textInput.setAttribute("contenteditable", "true");
        e.target.setAttribute("target", "");
      });
    });
  });
});
