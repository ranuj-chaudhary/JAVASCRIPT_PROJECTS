const draggable = document.querySelectorAll(".draggable");
const container = document.querySelectorAll(".container");

draggable.forEach((dragEle) => {
  dragEle.addEventListener("dragstart", (e) => {
    dragEle.classList.add("dragging");
    console.log("drag start");
  });
  dragEle.addEventListener("dragend", (e) => {
    dragEle.classList.remove("dragging");
    console.log("drag end");
  });
});

container.forEach((containerEle) => {
  containerEle.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getAfterElement(containerEle, e.clientY);
    const draggable = document.querySelector(".dragging");
    if (afterElement === null) {
      containerEle.appendChild(afterElement);
    } else {
      containerEle.insertBefore(draggable, afterElement);
    }
  });
});

function getAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ];

  const child = draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  );
  return child.element;
}
