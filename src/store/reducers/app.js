import {
  ADD_ALL_ITEMS,
  UPDATE_LOCALE,
  UPDATE_SCREEN_SIZE,
  UPDATE_HOME_POSITION
} from "store/actions/actionsTypes";

// Enums
import { screenSizesEnum } from "enums";

const initialState = {
  locale: "fr-FR",
  items: [],
  screenSize: screenSizesEnum.M,
  homePosition: { x: 0, y: 0 }
};

const app = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ALL_ITEMS:
      return {
        ...state,
        items: action.items
      };

    case UPDATE_LOCALE:
      return {
        ...state,
        locale: action.locale
      };

    case UPDATE_SCREEN_SIZE:
      return {
        ...state,
        screenSize: action.screenSize
      };

    case UPDATE_HOME_POSITION:
      return {
        ...state,
        homePosition: {
          x: action.x,
          y: action.y
        }
      };

    default:
      return state;
  }
};

export default app;
