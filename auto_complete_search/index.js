const searchBtn = document.querySelector(".search-btn");
const inputEle = document.getElementById("input-box");

async function fetchProducts() {
  try {
    const res = await fetch(`https://dummyjson.com/products?limit=100`);

    if (!res.ok) {
      throw new Error("Problem fetching data...");
    }

    const data = await res.json();

    // input
    if (data.products.length > 0 && data.products) {
      // get search results for query
      return data.products;
    }
  } catch (error) {
    console.log(error);
  }
}

function SearchResults(products, query) {
  const titles = products.map((product) => product.title);
  if (query.length > 0) {
    const results = titles
      .map((title) => title.toLowerCase())
      .filter((title) => title.includes(query));
    return results;
  } else if (query.length === 0) {
    alert("Input is empty. Enter query to get results.");
    return false;
  }
}

function displaySearchResults(results) {
  if (results.length > 0 && results) {
    const searchList = results.map(
      (result) =>
        `<li onclick="insertSearchResultToInputElement(this)">${result}</li>`
    );
    const resultBox = document.querySelector(".result-box ul");
    resultBox.innerHTML = searchList.join("");
  } else if (results.length === 0 && results) {
    console.error("No results fetched");
  }
}

function insertSearchResultToInputElement(ele) {
  inputEle.value = ele.innerText;
  // clear list after selection of search suggestions
  const resultBox = document.querySelector(".result-box ul");
  resultBox.innerHTML = "";
}

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

  // if (e.key === "Enter") {
  //   e.preventDefault();

  //   (async () => {
  //     // fetch products from api
  //     const fetchedProducts = await fetchProducts();

  //     const query = inputEle.value;

  //     // get search result for query
  //     const searchResult = SearchResults(fetchedProducts, query);

  //     // display search results on screen
  //     displaySearchResults(searchResult);
  //   })();

  // }
});

searchBtn.addEventListener("click", (e) => {
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
