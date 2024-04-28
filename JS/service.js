const accessKey = "access";
const cartKey = "itemsInCart";
const productsKey = "productsInStock";
const url = "http://localhost:5011/purchases";

export const SetAccess = (access) => {
  const accessAsJson = JSON.stringify(access);
  localStorage.setItem(accessKey, accessAsJson);
};
export const GetAccess = () => {
  const storedAccess = localStorage.getItem(accessKey);
  return JSON.parse(storedAccess);
};

export const UpdateCart = (itemsInCart) => {
  const cartAsJson = JSON.stringify(itemsInCart);
  localStorage.setItem(cartKey, cartAsJson);
};

export const GetItemsInCart = () => {
  const itemsInCart = localStorage.getItem(cartKey);
  return itemsInCart != null ? JSON.parse(itemsInCart) : [];
};

export const UpdateProducts = (products) => {
  const productsAsJson = JSON.stringify(products);
  localStorage.setItem(productsKey, productsAsJson);
};

export const GetProductsInStock = () => {
  const products = localStorage.getItem(productsKey);
  return JSON.parse(products);
};

export const ClearEverything = () => {
  localStorage.removeItem(cartKey);
  localStorage.removeItem(productsKey);
};

export const ResetCart = () =>{
  localStorage.removeItem(cartKey);
}

export const CreatePurchaseOnApi = async (name, cardNumber, totalSpended) => {
  const newPurchase = {
    time: new Date(),
    name,
    cardNumber,
    totalSpended,
  };
  console.log(newPurchase);

  await fetch(url, {
    method: "POST",
    body: JSON.stringify(newPurchase),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const LoadPurchasesFromApi = async() =>{
  const response = await fetch(url);
  const body = await response.json();
  return body
}