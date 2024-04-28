import {
  AddProductToCart,
  GetFilteredProducts,
  GetProducts,
  GetProductsInCart,
  GetTagList,
  RemoveProductFromCart,
} from "./domain.js";

const LoadProducts = (ListOfProducts) => {
  const container = document.getElementById("Product-Container");
  container.replaceChildren();

  const inStock = document.createElement("h1");
  inStock.textContent = "In Stock";
  container.appendChild(inStock);

  ListOfProducts.forEach((product) => {
    const cardDiv = CreateProductCard(product);
    container.appendChild(cardDiv);
  });
  container.addEventListener("dragenter", (event) => {
    //console.log("you have enter");
  });
  container.addEventListener("dragleave", (event) => {
    //console.log("you have left");
  });
  container.addEventListener("dragover", (event) => {
    event.preventDefault();
  });
  container.addEventListener("drop", (event) => {
    const productTitle = event.dataTransfer.getData("text/plain");
    console.log(productTitle);
    RemoveProductFromCart(productTitle);
    event.stopImmediatePropagation();

    var ListOfProducts = GetProducts();
    container.replaceChildren();
    const inStock = document.createElement("h1");
    inStock.textContent = "In Stock";
    container.appendChild(inStock);

    ListOfProducts.forEach((product) => {
      const cardDiv = CreateProductCard(product);
      container.appendChild(cardDiv);
    });

    LoadCart();
  });
};

const LoadCart = () => {
  const ListOfProducts = GetProductsInCart();
  const container = document.getElementById("cart");
  container.replaceChildren();

  const cart = document.createElement("h1");
  cart.textContent = "Cart";
  container.appendChild(cart);

  ListOfProducts.forEach((product) => {
    if (product.quantity === 0) {
    } else {
      const cardDiv = CreateProductCard(product);
      container.appendChild(cardDiv);
    }
  });

  container.addEventListener("dragenter", (event) => {
    container.classList.add("hoverclass");
    //console.log("you have enter");
  });
  container.addEventListener("dragleave", (event) => {
    //console.log("you have left");
    container.classList.remove("hoverclass");
  });
  container.addEventListener("dragover", (event) => {
    event.preventDefault();
  });
  container.addEventListener("drop", (event) => {
    event.preventDefault();
    container.classList.remove("hoverclass");
    const productTitle = event.dataTransfer.getData("text/plain");
    event.stopImmediatePropagation();
    console.log(productTitle);
    container.replaceChildren();
    AddProductToCart(productTitle);

    const cart = document.createElement("h1");
    cart.textContent = "Cart";
    container.appendChild(cart);

    const ListOfProducts = GetProductsInCart();

    ListOfProducts.forEach((product) => {
      if (product.quantity !== 0) {
        const cardDiv = CreateProductCard(product);
        container.appendChild(cardDiv);
      } else {
      }
    });
    LoadProducts(GetProducts());
  });
};

const CreateProductCard = (product) => {
  const cardDiv = document.createElement("div");
  cardDiv.className = "product";
  cardDiv.draggable = true;

  const title = document.createElement("h2");
  title.textContent = product.title;
  cardDiv.appendChild(title);

  const description = document.createElement("p");
  description.textContent = product.description;
  cardDiv.appendChild(description);

  const price = document.createElement("p");
  price.textContent = `Price: $${product.price}`;
  cardDiv.appendChild(price);

  const quantity = document.createElement("p");
  quantity.textContent = `Quantity: `;
  quantity.textContent +=
    product.quantity === 0 ? "Out of stock" : product.quantity;
  cardDiv.appendChild(quantity);

  const image = document.createElement("img");
  image.src = product.image;
  cardDiv.appendChild(image);

  cardDiv.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text/plain", product.title);
  });
  return cardDiv;
};

const SetFilter = () => {
  const container = document.getElementById("filter");
  container.replaceChildren();
  const filterLabel = document.createElement("label");
  filterLabel.textContent = "Search:"
  const filterInput = document.createElement("input");
  filterInput.addEventListener("input",(event)=>{
    const filteredList = GetFilteredProducts(event.target.value);
    LoadProducts(filteredList);
  });
  container.appendChild(filterLabel);
  container.appendChild(filterInput);
};



SetFilter();
LoadProducts(GetProducts());
LoadCart();
