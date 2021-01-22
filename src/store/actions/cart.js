// ActionsTypes
import {
  ADD_ITEM_TO_CART,
  UPDATE_ITEM,
  UPDATE_CART_TOTAL,
  REMOVE_ITEM_IN_CART,
  UPDATE_APPLICATED_OFFER,
  RESET_CART_TOTAL,
  INJECT_CART,
  RESET_CART
} from "store/actions/actionsTypes";

export const addItemToCart = (item) => ({
  type: ADD_ITEM_TO_CART,
  item
});

export const updateItem = (item, index) => ({
  type: UPDATE_ITEM,
  item,
  index
});

export const updateCartTotal = (total) => ({
  type: UPDATE_CART_TOTAL,
  total
});

export const removeItemInCart = (index) => ({
  type: REMOVE_ITEM_IN_CART,
  index
});

export const updateApplicatedOffer = (applicatedOffer) => ({
  type: UPDATE_APPLICATED_OFFER,
  applicatedOffer
});

export const resetCartTotal = () => ({
  type: RESET_CART_TOTAL
});

export const injectCart = (cart) => ({
  type: INJECT_CART,
  cart
});

export const resetCart = () => ({
  type: RESET_CART
});
