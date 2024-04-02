let productsData = [];
let cartItems = [];
async function fetchRecipies() {
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

fetchRecipies();

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
    document.querySelector(".products-container").appendChild(div);
  });
  // add products to cart
  addToCart(products);
}

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
    });
  });
}

function renderCartProducts(cartItems) {
  document.querySelector(".cart-items").innerHTML = "";
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
    <span>-</span>
    <p>${product.quantity}</p>
    <span>+</span>
    </div>
    
    `;
      console.log(div);
      document.querySelector(".cart-items").appendChild(div);
      document.querySelector(".cart-total").innerText =  + totalAmount;
    });
  }
}
