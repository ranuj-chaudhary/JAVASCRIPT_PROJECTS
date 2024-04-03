const cartTotalAmount = document.querySelector(".cart-total-amount");
const totalCartQuantity = document.querySelector(".total-cart-quantity");
const cartProducts = document.querySelector(".cart-products");
const productContainer = document.querySelector(".products-container");
const cartClearBtn = document.querySelector(".cart-clear-btn");
const cartIcon = document.querySelector(".cart-icon");
const cartSidebar = document.querySelector(".cart-sidebar");
let productsData = [];
let cartItems = [];

init();

function init() {
  fetchProducts();
  const localItems = JSON.parse(localStorage.getItem("cartItems"));
  renderCartProducts(localItems);
}

async function fetchProducts() {
  try {
    const res = await fetch("https://dummyjson.com/products");
    if (!res.ok) {
      throw new Error("Problem Fetching Products.");
    }
    const data = await res.json();
    if (data.products.length > 0) {
      productsData = data.products;
      renderProducts(productsData);
    }
  } catch (err) {
    console.error(err);
  }
}
// RENDER PRODUCTS ON HOMEPAGE
function renderProducts(products) {
  products.forEach((product) => {
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
  });
  // add products to cart
  addToCart(products);
}

// ADD PRODUCTS TO CART
function addToCart(products) {
  const addToCartBtn = document.querySelectorAll(".add-to-cart");
  addToCartBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let id = +e.target.parentElement.dataset.id;
      let [cartProduct] = products.filter((product) => product.id === id);
      let index = cartItems.findIndex((ele) => ele.id === id);

      if (index === -1) {
        cartItems.push({
          id: cartProduct.id,
          title: cartProduct.title,
          imageUrl: cartProduct.thumbnail,
          quantity: 1,
          price: cartProduct.price,
        });
      } else {
        cartItems[index].quantity = cartItems[index].quantity + 1;
      }
      renderCartProducts(cartItems);
      addToLocalStorage(cartItems);
    });
  });
}

// ADD CARTS ITEMS TO LOCAL STORAGE
function addToLocalStorage(cartItems) {
  const jsonData = JSON.stringify(cartItems);
  localStorage.setItem("cartItems", jsonData);
}

// RENDER PRODUCTS TO CART
function renderCartProducts(cartItems) {
  // filter cart item with quantity greater than 0
  cartItems = cartItems.filter((ele) => ele.quantity > 0);
  // remove old appended elements
  cartProducts.innerHTML = "";
  let totalAmount = 0;

  if (cartItems.length > 0) {
    cartItems.forEach((product) => {
      totalAmount = totalAmount + product.price * product.quantity;
      const div = document.createElement("div");
      div.classList.add("cart-product");
      div.setAttribute("data-id", product.id);
      div.innerHTML = `
    <div class="cart-image">
    <img src="${product.imageUrl}" alt="" />
    </div>
    <h2>${product.title}</h2>
    <p>Rs. ${product.price}</p>
    <div class="quantity">
    <span class="decrease-quantity-btn">-</span>
    <p>${product.quantity}</p>
    <span  class="increase-quantity-btn">+</span>
    </div>`;
      // appends to items in cart sidebar
      cartProducts.appendChild(div);
    });
  } else if (cartItems.length === 0) {
    let p = document.createElement("p");
    p.innerText = "Cart is empty.";
    cartProducts.appendChild(p);
    cartItems = [];
  }

  cartTotalAmount.innerText = totalAmount;
  totalCartQuantity.innerText = cartItems.length;

  // increase and decrease button functionality
  const cartProduct = document.querySelectorAll(".cart-product");
  cartProduct.forEach((cartItem) => {
    cartItem.addEventListener("click", (e) => {
      const decreaseBtn = e.target.classList.contains("decrease-quantity-btn");
      const increaseBtn = e.target.classList.contains("increase-quantity-btn");
      const prodId = +e.target.closest(".cart-product").dataset.id;
      let index = cartItems.findIndex((ele) => ele.id === prodId);
      if (decreaseBtn) {
        cartItems[index].quantity = cartItems[index].quantity - 1;
        renderCartProducts(cartItems);
        addToLocalStorage(cartItems);
      } else if (increaseBtn) {
        cartItems[index].quantity = cartItems[index].quantity + 1;
        renderCartProducts(cartItems);
        addToLocalStorage(cartItems);
      }
    });
  });

  cartTotalAmount.innerText = totalAmount;
  totalCartQuantity.innerText = cartItems.length;
  // empty cart
  cartClearBtn.addEventListener("click", () => {
    cartItems = [];
    addToLocalStorage(cartItems);
    renderCartProducts(cartItems);
  });
}

cartIcon.addEventListener("click", () => {
  const isClassBlock = cartSidebar.classList.contains("block");
  if (!isClassBlock) {
    cartSidebar.classList.add("block");
  } else {
    cartSidebar.classList.remove("block");
  }
});
