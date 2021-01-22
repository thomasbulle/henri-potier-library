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

const initialState = {
  items: [],
  total: 0,
  applicatedOffer: null
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      return {
        ...state,
        items: [
          ...state.items,
          {
            ...action.item,
            quantity: 1
          }
        ]
      };

    case UPDATE_ITEM:
      return {
        ...state,
        items: [
          ...state.items.slice(0, action.index),
          action.item,
          ...state.items.slice(action.index + 1)
        ]
      };

    case UPDATE_CART_TOTAL:
      return {
        ...state,
        total: action.total
      };

    case REMOVE_ITEM_IN_CART:
      return {
        ...state,
        items: [
          ...state.items.slice(0, action.index),
          ...state.items.slice(action.index + 1)
        ]
      };

    case UPDATE_APPLICATED_OFFER:
      return {
        ...state,
        applicatedOffer: action.applicatedOffer
      };

    case RESET_CART_TOTAL:
      return {
        ...state,
        total: 0,
        applicatedOffer: null
      };

    case INJECT_CART:
      return {
        ...state,
        items: action.cart
      };

    case RESET_CART:
      return {
        ...state,
        items: [],
        total: 0,
        applicatedOffer: null
      }

    default:
      return state;
  }
};

export default cart;
