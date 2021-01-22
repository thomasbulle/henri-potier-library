// ActionsTypes
import {
  ADD_ITEM_TO_CART,
  UPDATE_ITEM,
  REMOVE_ITEM_IN_CART,
  INJECT_CART,
  RESET_CART
} from "store/actions/actionsTypes";

// Helpers
import { addCartInLocalStorage } from "helpers";

// Listeners
import { calculateCartTotal } from "./cart";

export default (store) => {
  const state = store.getState();

  switch (state.lastAction.type) {
    case ADD_ITEM_TO_CART:
    case UPDATE_ITEM:
    case REMOVE_ITEM_IN_CART:
    case INJECT_CART:
      // If an item is added, removed or his quantity is updated, or a new cart is loaded,
      // calculate the cart total and add it in the store, and add the new cart in the localStorage
      calculateCartTotal(store.dispatch, state);
      addCartInLocalStorage(state.cart.items);
      break;

    case RESET_CART:
      addCartInLocalStorage(state.cart.items);
      break;

    default:
      return state;
  }
};
