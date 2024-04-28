import {
  GetAccess,
  SetAccess,
  GetItemsInCart,
  UpdateCart,
  UpdateProducts,
  GetProductsInStock,
  ClearEverything,
  LoadPurchasesFromApi,
  ResetCart,
} from "./service.js";

var taglist = ["drink", "hygiene", "dental"];
var products = GetProductsInStock();
var productsInCart = GetItemsInCart();

//export const GetCartList = () => {
//return [...productsInCart];
//};
//export const GetProductList = () => {
//return [...products];
//};
export const GetTagList = () => {
  return [...taglist];
};

export const CheckAccess = (username, password) => {
  const correctUsername = "administrator";
  const correctPassword = "1234567";
  if (username === correctUsername && password === correctPassword) {
    SetAccess(true);

    return true;
  } else {
    return false;
  }
};
export const LogOut = () => {
  SetAccess(false);
};

const GetProduct = (titleOfWantedProduct) => {
  const product = products.filter(
    (product) => product.title === titleOfWantedProduct
  )[0];
  return product;
};

const GetProductInCart = (titleOfWantedProduct) => {
  const product = productsInCart.filter(
    (product) => product.title === titleOfWantedProduct
  )[0];
  return product;
};

export const AddProductToCart = (titleOfProduct) => {
  const product = { ...GetProduct(titleOfProduct) };
  const productInCart = GetProductInCart(titleOfProduct);
  if (product.quantity === 0) {
    alert(`Sorry but we are out of ${product.title}`);
    return;
  }

  if (productsInCart.includes(productInCart)) {
    const index = productsInCart.indexOf(productInCart);
    productsInCart[index].quantity += 1;
  } else if (!productsInCart.includes(productInCart)) {
    product.quantity = 1;
    const newListOfProductsInCart = [...productsInCart, product];
    productsInCart = [...new Set(newListOfProductsInCart)];
  } else {
  }
  const index = products.indexOf(GetProduct(titleOfProduct));
  products[index].quantity -= 1;
  UpdateCart(productsInCart);
  UpdateProducts(products);
};

export const RemoveProductFromCart = (productTitle) => {
  const productInStock = GetProduct(productTitle);
  const product = GetProductInCart(productTitle);

  console.log(productsInCart);
  console.log(product);
  console.log(product.quantity);

  if (product.quantity > 1) {
    console.log("minus 1");
    const index = productsInCart.indexOf(product);
    console.log(index);
    console.log(productsInCart[index]);
    productsInCart[index].quantity -= 1;
  } else if (product.quantity === 1) {
    console.log("detele all");
    productsInCart = productsInCart.filter((productInCart) => {
      return productInCart.title !== productTitle;
    });
  }
  const index = products.indexOf(productInStock);
  products[index].quantity += 1;
  console.log(productsInCart);
  UpdateCart(productsInCart);
  UpdateProducts(products);
};

export const GetCurrentAccess = () => {
  return GetAccess();
};
export const GetProducts = () => {
  return GetProductsInStock();
};
export const GetProductsInCart = () => {
  return GetItemsInCart();
};

export const GetPurchaseList = async () => {
  return await LoadPurchasesFromApi();
};

export const RestockProduct = (product) => {
  console.log(product);
  console.log(products[0]);
  const index = products.indexOf(GetProduct(product));
  console.log(index);
  products[index].quantity += 1;
  UpdateProducts(products);
};

export const GetTotalPrice = () => {
  var totalPrice = 0;
  const itemsInCart = GetItemsInCart();
  itemsInCart.forEach((product) => {
    totalPrice += product.price * product.quantity;
    console.log(product.price);
  });
  console.log(totalPrice.toFixed(2));
  return totalPrice.toFixed(2);
};

export const GetFilteredProducts = (filterTitle) => {
  const listOfProducts = GetProducts();
  const filteredList = listOfProducts.filter((product) => {
    return product.title
      .toLocaleLowerCase()
      .includes(filterTitle.toLocaleLowerCase());
  });
  return filteredList;
};

export const Buy = () => {
  ResetCart();
  productsInCart = GetItemsInCart();
};
