/**
 * To add the cart in the localStorage
 * @param {Object} itemsInCart
 */
export const addCartInLocalStorage = (itemsInCart) => {
  localStorage.setItem("cart", JSON.stringify(itemsInCart));
};
