// Enums
import { operationsEnum } from "enums";

// Actions
import { updateItem, addItemToCart } from "store/actions";

/**
 * To update the iten quantity in the store
 * @param {Object} item
 * @param {operationsEnum} operation
 */
export const updateItemQuantity = (item, operation) => {
  // Copy the item object to modify it
  let updatedItem = JSON.parse(JSON.stringify(item));

  if (operation === operationsEnum.ADD) {
    updatedItem = {
      ...updatedItem,
      quantity: updatedItem.quantity + 1
    };
  } else if (operation === operationsEnum.LESS) {
    updatedItem = {
      ...updatedItem,
      quantity: updatedItem.quantity <= 0 ? 0 : updatedItem.quantity - 1
    };
  }

  return updatedItem;
};

/**
 * To check if an item is already added in the store
 * @param {Array} items
 * @param {Object} item
 */
export const checkIfItemIsAlreadyAdded = (items, item) => {
  const index = items.findIndex((element) => element.title === item.title);
  return index > -1;
};

/**
 * To check if is it possible to remove 1 item in the quantity
 * It is possible just if the quantity is more than 1 item
 * @param {Object} item
 */
export const canLessItemQuantity = (item) => item.quantity > 1;

/**
 * To find an item in the cart with the title item
 * @param {string} title
 * @param {Array} itemsInCart
 */
export const getItemByTitle = (title, itemsInCart) =>
  itemsInCart.find((element) => element.title === title);

/**
 * To calculate the best offer according to the items in the cart
 * @param {Object} offers
 * @param {number} total
 */
export const getBestOffer = (offers, total) => {
  const totalsByOffers = [];

  // Caclculate for each offer the total price after offer
  offers.forEach((offer) => {
    switch (offer.type) {
      case "percentage":
        totalsByOffers.push({
          ...offer,
          priceWithOffer: getPriceByPercentage(total, offer.value)
        });
        break;

      case "minus":
        totalsByOffers.push({
          ...offer,
          priceWithOffer: getPriceByMinus(total, offer.value)
        });
        break;

      case "slice":
        totalsByOffers.push({
          ...offer,
          priceWithOffer: getPriceBySlice(total, offer.sliceValue, offer.value)
        });
        break;

      default:
        break;
    }
  });

  if (totalsByOffers.length) {
    // Sort the array in ascending order and return the first item
    return totalsByOffers.sort(
      (a, b) => a.priceWithOffer - b.priceWithOffer
    )[0];
  } else {
    return total;
  }
};

/**
 * To calculate the price with the percentage offer
 * @param {number} price
 * @param {number} percentage
 */
export const getPriceByPercentage = (price, percentage) =>
  price - (price * percentage) / 100;

/**
 * To caclulate the price with the value to remove
 * @param {number} price
 * @param {number} minus
 */
export const getPriceByMinus = (price, minus) => price - minus;

/**
 * To caclulate the price with the slice offer
 * @param {number} price
 * @param {number} sliceValue
 * @param {number} value
 */
export const getPriceBySlice = (price, sliceValue, value) => {
  // Calculate the numbers of slices
  const nbReduc = Math.floor(price / sliceValue);
  let newPrice = price;

  // Remove the value to the price for each slice
  if (newPrice > 0) {
    for (let i = 0; i > nbReduc; i++) {
      newPrice = newPrice - value;
    }
  }

  return newPrice;
};

/**
 * To get the total number of items added in the cart
 * @param {Array} itemsInCart
 */
export const getTotalNbrOfItemsInCart = (itemsInCart) => {
  let nbr = 0;
  itemsInCart.forEach((item) => (nbr = nbr + item.quantity));
  return nbr;
};

/**
 * To add an item in the cart
 * @param {Function} dispatch
 * @param {Array} itemsInCart
 * @param {Object} item
 */
export const addAndUpdateItemToCart = (dispatch, itemsInCart, item) => {
  // If the item is already added in the cart, just update this quantity
  if (checkIfItemIsAlreadyAdded(itemsInCart, item)) {
    // Find the item index in the cart
    const index = itemsInCart.findIndex(
      (element) => element.title === item.title
    );
    dispatch(
      updateItem(
        updateItemQuantity(itemsInCart[index], operationsEnum.ADD),
        index
      )
    );
  } else {
    // If the item not already added in the cart, add it in the cart
    dispatch(addItemToCart(item));
  }
};

/**
 * To calculate the total price of the cart without offer
 * @param {Array} cart
 */
export const calculateTotalWithoutOffer = (cart) => {
  let total = 0;
  cart.forEach((item) => {
    if (item.quantity > 1) {
      for (let i = 0; i < item.quantity; i++) {
        total += item.price;
      }
    } else {
      total += item.price;
    }
  });
  return total;
};
