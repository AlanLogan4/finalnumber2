import {
  CheckAccess,
  GetCurrentAccess,
  GetProducts,
  GetPurchaseList,
  LogOut,
  RestockProduct,
} from "./domain.js";

const LoadLogIn = () => {
  const container = document.getElementById("container");
  container.replaceChildren();

  const form = document.createElement("form");

  const usernameLabel = document.createElement("label");
  usernameLabel.textContent = "Username";
  form.appendChild(usernameLabel);

  const usernameInput = document.createElement("input");
  usernameInput.type = "text";
  form.appendChild(usernameInput);

  const passwordLabel = document.createElement("label");
  passwordLabel.textContent = "Password";
  form.appendChild(passwordLabel);

  const passwordInput = document.createElement("input");
  passwordInput.type = "password";
  form.appendChild(passwordInput);

  const submitButton = document.createElement("input");
  submitButton.type = "submit";
  submitButton.id = "submit-button";
  form.appendChild(submitButton);
  submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (CheckAccess(usernameInput.value, passwordInput.value)) {
      const container = document.getElementById("login-form");
      console.log(container);
      form.hidden = true;
      console.log(GetCurrentAccess());
      LoadSite();
      LoadNavigation();
    } else {
      console.log("no");
      alert("Wrong Password/username")
    }
  });
  container.appendChild(form);
};
const LoadSite = () => {
  const container = document.getElementById("container");
  container.replaceChildren();

  const logOut = document.createElement("button");
  logOut.textContent = "Log Out";
  logOut.addEventListener("click", (event) => {
    event.preventDefault();
    const navigationBar = document.getElementById("navigation");
    navigationBar.hidden = true;
    LogOut();
    container.replaceChildren();
    LoadLogIn();
  });
  container.appendChild(logOut);
};

const CreateProductCard = (product) => {
  const productDiv = document.createElement("div");
  productDiv.classList.add("product");

  const title = document.createElement("h2");
  title.textContent = product.title;
  productDiv.appendChild(title);

  const image = document.createElement("img");
  image.src = product.image;
  productDiv.appendChild(image);

  const amountLeft = document.createElement("h4");
  amountLeft.classList.add("amount");
  amountLeft.textContent = `Left in Stock: ${product.quantity}`;
  productDiv.appendChild(amountLeft);

  const reStockButton = document.createElement("button");
  reStockButton.textContent = "restock";
  reStockButton.addEventListener("click", (event) => {
    event.preventDefault();
    RestockProduct(product.title);
    LoadReStock();
  });
  productDiv.appendChild(reStockButton);

  return productDiv;
};

const LoadPurchaseHistory = async () => {
  container.replaceChildren();
  const products = GetProducts();
  const purchaseList = await GetPurchaseList();
  console.log(purchaseList);
  purchaseList.forEach((purchase) => {
    const pruchaseDiv = CreatePurchaseCard(purchase);
    container.appendChild(pruchaseDiv);
  });
  const logOut = document.createElement("button");
  logOut.textContent = "Log Out";
  logOut.addEventListener("click", (event) => {
    event.preventDefault();
    const navigationBar = document.getElementById("navigation");
    navigationBar.hidden = true;
    LogOut();
    container.replaceChildren();
    LoadLogIn();
  });
  container.appendChild(logOut);
};

const CreatePurchaseCard = (purchase) => {
  const pruchaseDiv = document.createElement("div");
  pruchaseDiv.classList.add("pruchaseCard");

  const time = document.createElement("p");
  time.textContent = `Date: ${purchase.time}`;
  pruchaseDiv.appendChild(time);

  const name = document.createElement("p");
  name.textContent = `Customer: ${purchase.name}`;
  pruchaseDiv.appendChild(name);

  const totalSpended = document.createElement("p");
  totalSpended.textContent = `Total Spended: $${purchase.totalSpend}`;
  pruchaseDiv.appendChild(totalSpended);

  return pruchaseDiv;
};

const LoadReStock = () => {
  const container = document.getElementById("container");
  container.replaceChildren();
  const products = GetProducts();
  products.forEach((product) => {
    const cardDiv = CreateProductCard(product);
    container.appendChild(cardDiv);
  });
  const logOut = document.createElement("button");
  logOut.textContent = "Log Out";
  logOut.addEventListener("click", (event) => {
    event.preventDefault();
    const navigationBar = document.getElementById("navigation");
    navigationBar.hidden = true;
    LogOut();
    container.replaceChildren();
    LoadLogIn();
  });
  container.appendChild(logOut);
};

const LoadNavigation = () => {
  const container = document.getElementById("navigation");
  const reStockButton = document.createElement("button");
  reStockButton.textContent = "reStock";
  reStockButton.addEventListener("click", (event) => {
    event.preventDefault();
    LoadSite();
    LoadReStock();
  });

  const historyPurchase = document.createElement("button");
  historyPurchase.textContent = "Purchase history";
  historyPurchase.addEventListener("click", (event) => {
    event.preventDefault();
    LoadSite();
    LoadPurchaseHistory();
  });

  container.appendChild(historyPurchase);
  container.appendChild(reStockButton);
};

console.log(GetCurrentAccess());

if (GetCurrentAccess()) {
  LoadNavigation();
  LoadSite();
} else if (!GetCurrentAccess()) {
  LoadLogIn();
}
