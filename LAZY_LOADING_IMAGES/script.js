const image = document.querySelectorAll(".image img[data-src]");

function loadImg(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", () => {
    entry.target.classList.remove("blur-filter");
  });
}

const imageObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
});

image.forEach((img) => imageObserver.observe(img));
