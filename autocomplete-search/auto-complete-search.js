"use strict";

const searchBtn = document.querySelector(".search-btn");
const inputEle = document.getElementById("input-box");
const resultBox = document.querySelector(".result-box ul");
async function fetchProducts() {
  try {
    const res = await fetch(`https://dummyjson.com/products?limit=100`);

    if (!res.ok) {
      throw new Error("Problem fetching data...");
    }

    const data = await res.json();
console.log(data.products);
    // input
    if (data.products.length > 0 && data.products.length === 100) {
      // get search results for query
      return data.products;
    }
  } catch (error) {
    console.error(error);
  }
}

function SearchResults(products, query) {
  // get all title from products fetched
  const titles = products.map((product) => product.title);
  if (query.length > 0) {
    // get search result as per input by user
    const results = titles
      .map((title) => title.toLowerCase())
      .filter((title) => title.includes(query));
    return results;
  } else if (query.length === 0) {
    resultBox.innerHTML = "";
    return false;
  }
}

function displaySearchResults(results) {
  if (results.length > 0 && results) {
    const searchList = results.map((result) => `<li>${result}</li>`);
    resultBox.innerHTML = searchList.join("");
  } else if (results.length === 0 && results) {
    resultBox.innerHTML = "<li>No result found</li>";
  }
}

function insertListToInput(ele) {
  inputEle.value = ele.innerText;
  // clear list after selection of search suggestions
  resultBox.innerHTML = "";
}

// EVENT HANDLERS

// Insert list innertext to input field

resultBox.addEventListener("click", (e) => {
  inputEle.value = e.target.innerText;
  resultBox.innerHTML = "";
});

// Search box keypress event handler
inputEle.addEventListener("keypress", (e) => {
  (async () => {
    // fetch products from api
    const fetchedProducts = await fetchProducts();

    const query = inputEle.value;

    // get search result for query
    const searchResult = SearchResults(fetchedProducts, query);

    // display search results on screen
    displaySearchResults(searchResult);
  })();
});

inputEle.addEventListener("keyup", (e) => {
  if (e.key === "Backspace") {
    (async () => {
      // fetch products from api
      const fetchedProducts = await fetchProducts();

      const query = inputEle.value;

      // get search result for query
      const searchResult = SearchResults(fetchedProducts, query);

      // display search results on screen
      displaySearchResults(searchResult);
    })();
  } else {
    return;
  }
});

// Search box search icon click event handler
searchBtn.addEventListener("click", () => {
  const icon = document.querySelector(".fa-search");
  const closest = icon.closest(".search-btn");

  if (closest) {
    // fetching api for products
    (async () => {
      const fetchedProducts = await fetchProducts();

      const query = inputEle.value;

      const searchResult = SearchResults(fetchedProducts, query);

      displaySearchResults(searchResult);
    })();
  }
});

export {
  fetchProducts,
  SearchResults,
  displaySearchResults,
  insertListToInput,
};
