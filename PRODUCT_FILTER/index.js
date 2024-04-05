const productContainer = document.querySelector(".products-container");
const searchButton = document.querySelector(".search-btn");
const filterButtons = document.querySelectorAll(".search-filters .btn");
const searchInput = document.querySelector(".search-input");
/*
"smartphones"
"laptops"
"fragrances"
"groceries"
"home-decoration"
*/

init();

async function init() {
  const products = await fetchProducts();
  
 // initial render
  renderProducts(products);

  // Products Search by input
  searchButtonFunctionality(products);

  // Products Search by filter
  searchByFiltersFunctionality(products);
}

async function fetchProducts() {
  try {
    const res = await fetch("https://dummyjson.com/products");
    if (!res.ok) {
      throw new Error("Problem Fetching Products.");
    }
    const data = await res.json();
    if (data.products.length > 0) {
      return data.products;
    }
  } catch (err) {
    console.error(err);
    return [];
  }
}

function searchButtonFunctionality(products) {
  // inititial render
  if (products.length > 0) {
    renderProducts(products);
  }

  // SEARCH BUTTON HANDLER
  searchButton.addEventListener("click", () => {
    // search input
    const inputText = searchInput.value;
    // filter based on searched input
    const searchedProducts = products.filter((ele) =>
      ele.title.toLowerCase().includes(inputText)
    );
    // render searched products
    if (searchedProducts.length > 0) {
      renderProducts(searchedProducts);
    }
    // empty input field
    searchInput.value = "";
  });
}

function searchByFiltersFunctionality(products) {
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const category = e.target.dataset.category;
      if (category === "all") {
        renderProducts(products);
      } else {
        const filteredProducts = products.filter(
          (ele) => ele.category.toLowerCase() === category
        );
        renderProducts(filteredProducts);
      }
   });
  });
}

// RENDER PRODUCTS ON HOMEPAGE
function renderProducts(products) {
  productContainer.innerHTML = "";
  for (let i = 0; i < products.length; i++) {
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
    <button class="add-to-cart">Buy Now</button>
 `;
    productContainer.appendChild(div);
  }
}
