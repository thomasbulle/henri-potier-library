import axios from "axios";

// Helpers
import { getBestOffer } from "helpers";

// Actions
import {
  updateCartTotal,
  updateApplicatedOffer,
  resetCartTotal
} from "store/actions";

/**
 * To calculate the cart total
 * @param {Function} dispatch
 * @param {Object} state
 */
export const calculateCartTotal = (dispatch, state) => {
  let newTotal = 0;

  if (state.cart.items.length === 0) {
    dispatch(resetCartTotal());
  } else {
    let url = "https://henri-potier.techx.fr/books/";

    // loop on each items in the cart and add his id in the url
    state.cart.items.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        url += `${item.isbn},`;
        newTotal += item.price;
      }
    });

    // Request to get the offers according the items in the cart
    axios
      .get(`${url.substring(0, url.length - 1)}/commercialOffers`)
      .then((res) => {
        // Get the best offer in the response
        const bestOffer = getBestOffer(res.data.offers, newTotal);

        // Add the new price in the store with the best offer
        dispatch(updateCartTotal(bestOffer.priceWithOffer));
        // Add the best offer in the store
        dispatch(updateApplicatedOffer(bestOffer));
      })
      .catch((err) => console.log(err));
  }
};
