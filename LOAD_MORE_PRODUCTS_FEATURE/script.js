const productContainer = document.querySelector(".products-container");
const loadMoreBtn = document.querySelector(".load-more-btn");

fetchProducts();

async function fetchProducts() {
  try {
    const res = await fetch("https://dummyjson.com/products");
    if (!res.ok) {
      throw new Error("Problem Fetching Products.");
    }
    const data = await res.json();
    if (data.products.length > 0) {
      let start = 0;
      let end = 3;
      renderProducts(data.products, start, end);
      loadMoreBtn.addEventListener("click", () => {
        start += 3;
        end += 3;
        if(end === 30) {
          loadMoreBtn.classList.add('disabled')
        }
        renderProducts(data.products, start, end);
      });
    }
  } catch (err) {
    console.error(err);
  }
}

// RENDER PRODUCTS ON HOMEPAGE
function renderProducts(products, start = 0, end = 3) {
  for (let i = start; i < end; i++) {
    let product = products[i];
    const div = document.createElement("div");
    div.classList.add("product");
    div.setAttribute("data-id", product.id);
    div.innerHTML = `
    <div class="image">
    <img src="${product.thumbnail}" alt="" />
    </div>
    <h2>${product.title}</h2>
<p><span>Rs. </span>${product.price}</p>
<button class="add-to-cart">Add to cart</button>
  
  `;
    productContainer.appendChild(div);
  }

  // add products to cart
}
