// ActionsTypes
import {
  ADD_ALL_ITEMS,
  UPDATE_LOCALE,
  UPDATE_SCREEN_SIZE,
  UPDATE_HOME_POSITION
} from "store/actions/actionsTypes";

export const addAllBooks = (items) => ({
  type: ADD_ALL_ITEMS,
  items
});

export const updateLocale = (locale) => ({
  type: UPDATE_LOCALE,
  locale: locale.includes("-") ? locale : `${locale}-${locale.toUpperCase()}`
});

export const updateScreenSize = (screenSize) => ({
  type: UPDATE_SCREEN_SIZE,
  screenSize
});

export const updateHomePosition = (x, y) => ({
  type: UPDATE_HOME_POSITION,
  x,
  y
});
