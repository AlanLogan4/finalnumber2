import { Buy, GetProductsInCart, GetTotalPrice } from "./domain.js";
import { CreatePurchaseOnApi } from "./service.js";

const LoadCheckOut = () => {
  const container = document.getElementById("content");
  console.log(container);

  LoadProductsInCart();

  const customerInfo = CustomerInformation();
  container.appendChild(customerInfo);

  const totalPrice = LoadTotal();
  container.appendChild(totalPrice);

  const buyButton = document.createElement("input");
  buyButton.type = "submit";
  buyButton.value = "Buy";
  buyButton.href = "index.hmtl";
  buyButton.addEventListener("click", async (event) => {
    event.preventDefault();
    const listOfInputs = customerInfo.getElementsByTagName("input");
    console.log(listOfInputs);
    await CreatePurchaseOnApi(
      listOfInputs[0].value,
      listOfInputs[1].value,
      GetTotalPrice(),
    );
    alert("thanks you for your purchase");
    Buy();
    document.location.href = "index.html";
  });
  container.appendChild(buyButton);
};

const CustomerInformation = () => {
  const cardInfoDiv = document.createElement("div");

  const cardNameLabel = document.createElement("label");
  cardNameLabel.textContent = "Name in Card";
  cardInfoDiv.appendChild(cardNameLabel);
  const cardNameInput = document.createElement("input");
  cardNameInput.type = "text";
  cardNameInput.required = true;
  cardInfoDiv.appendChild(cardNameInput);

  const cardNumberLabel = document.createElement("label");
  cardNumberLabel.textContent = "Card Number";
  cardInfoDiv.appendChild(cardNumberLabel);
  const cardNumberInput = document.createElement("input");
  cardNumberInput.type = "Number";
  cardNumberInput.min = 12;
  cardNameInput.setAttribute.required = true;
  cardInfoDiv.appendChild(cardNumberInput);

  const expirationDateLabel = document.createElement("label");
  expirationDateLabel.textContent = "Expiration Date";
  cardInfoDiv.appendChild(expirationDateLabel);
  const expirationDateInput = document.createElement("input");
  expirationDateInput.type = "date";
  expirationDateInput.setAttribute.required = true;
  cardInfoDiv.appendChild(expirationDateInput);

  const cvvLabel = document.createElement("label");
  cvvLabel.textContent = "CVV";
  cardInfoDiv.appendChild(cvvLabel);
  const cvvInput = document.createElement("input");
  cvvInput.type = "Number";
  cvvInput.setAttribute.required = true;
  cardInfoDiv.appendChild(cvvInput);

  return cardInfoDiv;
};

// const ShippingInformation = () => {
//   const shippingDiv = document.createElement("div");

//   const firstName = document.createElement("input");
//   firstName.type = "text";
//   firstName.placeholder = "First name"
//   shippingDiv.appendChild(firstName)

//   const lastName = document.createElement("input");
//   lastName.type = "text";
//   lastName.placeholder = "Last name"
//   shippingDiv.appendChild(lastName);

//   const streetAdress = document.createElement("input");
//   streetAdress.type = "text";
//   streetAdress.placeholder = "Adress 1";
//   shippingDiv.appendChild(streetAdress);

//   const city = document.createElement("input");
//   city.type = "text";
//   city.placeholder = "City";
//   shippingDiv.appendChild(city)

//   const state = document.createElement("input");
//   state.type = "text";
//   state.placeholder ="State";
//   shippingDiv.appendChild(state);

//   const zipCode = document.createElement("input");
//   zipCode.type = "Number";
//   zipCode.placeholder = "Zip code";
//   shippingDiv.appendChild(zipCode);

//   return shippingDiv;

// };

// const FilledShippingInformation = (firstName, secondName, street, city) => {

// };

// const BillingInformation = () => {
//   const billingDiv = document.createElement("div");

//   const firstName = document.createElement("input");
//   firstName.type = "text";
//   firstName.placeholder = "First name"
//   billingDiv.appendChild(firstName)

//   const lastName = document.createElement("input");
//   lastName.type = "text";
//   lastName.placeholder = "Last name"
//   billingDiv.appendChild(lastName);

//   const streetAdress = document.createElement("input");
//   streetAdress.type = "text";
//   streetAdress.placeholder = "Adress 1";
//   billingDiv.appendChild(streetAdress);

//   const city = document.createElement("input");
//   city.type = "text";
//   city.placeholder = "City";
//   billingDiv.appendChild(city)

//   const state = document.createElement("input");
//   state.type = "text";
//   state.placeholder ="State";
//   billingDiv.appendChild(state);

//   const zipCode = document.createElement("input");
//   zipCode.type = "Number";
//   zipCode.placeholder = "Zip code";
//   billingDiv.appendChild(zipCode);

//   return billingDiv;
// };

const LoadProductsInCart = () => {
  const productsInCart = GetProductsInCart();
  const container = document.getElementById("cart-items");
  container.replaceChildren();

  productsInCart.forEach((product) => {
    const cardDiv = CreateProductCart(product);
    container.appendChild(cardDiv);
  });
};
const CreateProductCart = (product) => {
  const cardDiv = document.createElement("div");
  cardDiv.className = "product";

  const title = document.createElement("h3");
  title.textContent = product.title;
  cardDiv.appendChild(title);

  const price = document.createElement("p");
  price.textContent = `Price: $${product.price}`;
  cardDiv.appendChild(price);

  const quantity = document.createElement("p");
  quantity.textContent = `Quantity ${product.quantity}`;
  cardDiv.appendChild(quantity);

  const image = document.createElement("img");
  image.src = product.image;
  cardDiv.appendChild(image);
  return cardDiv;
};
const LoadTotal = () => {
  const totalPrice = GetTotalPrice();
  const container = document.createElement("div");
  container.replaceChildren();

  const title = document.createElement("h4");
  title.textContent = "Total";
  container.appendChild(title);
  const amount = document.createElement("h5");
  amount.textContent = `$${totalPrice}`;
  container.appendChild(amount);

  return container;
};

LoadCheckOut();
