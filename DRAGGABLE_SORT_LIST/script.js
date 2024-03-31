const topTenRichest = [
  "Bernard Arnault & family",
  "Jeff Bezoz",
  "Elon Musk",
  "Mark Zuckerberg",
  "Larry Ellison",
  "Warren Buffet",
  "Bill Gates",
  "Steve Ballmer",
  "Larry Page",
  "Mukesh Ambani",
];
// Create Random List Each Time on Page Refresh
let dragStartIndex;
let listItems = [];
createList();

function createList() {
  const sortedTopTenRichest = topTenRichest
    .map((person) => {
      let obj = { person, val: Math.random() };
      return obj;
    })
    .sort((a, b) => a.val - b.val)
    .map((person) => person.person);

  sortedTopTenRichest.forEach((person, index) => {
    let list = document.createElement("li");
    list.setAttribute("data-index", index);
    list.innerHTML = `<span>${index + 1}</span>
<div class="draggable" draggable='true'>
  <p>${person}</p>
</div>
`;
listItems.push(list)
    document.querySelector(".sort-list").appendChild(list);
  });
  
  addEventListeners();
}

function addEventListeners() {
  const dragzone = document.querySelectorAll("li");
  const draggable = document.querySelectorAll(".draggable");

  draggable.forEach((draggable) => {
    draggable.addEventListener("dragstart", function (e) {
      dragStartIndex = +this.closest("li").dataset.index;
    });

    // draggable.addEventListener("drag", function (e) {
    //   console.log("drag");
    // });
    draggable.addEventListener("dragend", function (e) {
      console.log("dragend");
    });
  });

  dragzone.forEach((dragzone) => {
    dragzone.addEventListener("dragenter", function (e) {
      console.log("dragenter");
      this.classList.add("over");
    });

    dragzone.addEventListener("dragleave", function (e) {
      this.classList.remove("over");
    });

    dragzone.addEventListener("dragover", function (e) {
      e.preventDefault();
      console.log("dragover");
    });
    dragzone.addEventListener("drop", function (e) {
      const dragEndIndex = +this.getAttribute("data-index");
      console.log(dragStartIndex, dragEndIndex);
      swapListItems(dragStartIndex, dragEndIndex);
      this.classList.remove("over");
    });
  });
}

function swapListItems(fromIndex, toIndex) {
const itemOne = listItems[fromIndex].querySelector('.draggable')
const itemTwo= listItems[toIndex].querySelector('.draggable')
listItems[fromIndex].appendChild(itemTwo)
listItems[toIndex].appendChild(itemOne)
console.log(itemOne, itemTwo);

}
