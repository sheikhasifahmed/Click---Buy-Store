const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data))
    .catch((error) => console.log(error));
};
loadProducts();

let tempProduct = [];

// show all product in UI
const showProducts = (products) => {
  console.log(products);

  const allProducts = products.map((pd) => pd);
  allProducts.forEach((p) => tempProduct.push(p));

  for (const product of allProducts) {
    const image = product.image;
    const rating = product.rating;
    const rate = parseInt(rating.rate);

    let star = "";
    for (let i = 0; i < rate; i++) {
      star += "★";
    }

    star = star.padEnd(5, "☆");

    const category = product.category;
    let title = product.title.slice(0, 50);
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product ">
    <div >
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${title}</h3>
      <h5 style='color:grey;'>Category: ${category}</h5>
      <div id='rating-div'>
      <h4 class='red'> ${star} ${rating.rate}</h4>
     <b><p class='ms-2'>by ${rating.count} people</p></b>
      </div>
      <h3 class='green'>Price: $${product.price}</h3>
      <div class='btn-div mt-auto mb-0'>
      <button onclick="addToCart(${product.price})" id="addToCart-btn" class="buy-now btn">🛒add to cart</button>
      <button id="details-btn" class="btn"  onclick="showDetails ('${product.id}') " >Details</button></div></div></div>
      `;

    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    parseFloat(getInputValue("price")) +
    parseFloat(getInputValue("delivery-charge")) +
    parseFloat(getInputValue("total-tax"));
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

// function for showing details by clicking details button

function showDetails(id) {
  const modal = document.getElementById("modal");
  const overlay = document.getElementById("overlay");

  modal.style.display = "block";
  overlay.style.display = "block";

  let select = tempProduct.find((p) => p.id == id);

  const cardTitle = document.getElementById("card-title");
  const cardPic = document.getElementById("card-pic");
  const cardPrice = document.getElementById("card-price");
  const cardRating = document.getElementById("card-rating");
  const cardCategory = document.getElementById("card-category");

  const rating = select.rating;
  const rate = parseInt(rating.rate);
  let star = "";
  for (let i = 0; i < rate; i++) {
    star += "★";
  }
  star = star.padEnd(5, "☆");
  let title = select.title.slice(0, 50);
  cardPic.setAttribute("src", `${select.image}`);
  cardTitle.innerText = title;
  cardCategory.innerText = `category: ${select.category}`;

  cardPrice.innerText = `price: $${select.price}`;
  cardRating.innerText = `${star} ${select.rating.rate}`;
}

// function for closing the model window

function closeModal() {
  const modal = document.getElementById("modal");
  const overlay = document.getElementById("overlay");

  modal.style.display = "none";
  overlay.style.display = "none";
}
