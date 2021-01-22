import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import "antd/dist/antd.css";
import "react-image-lightbox/style.css";

// Intl
import IntlProviderWrapper from "./IntlProviderWrapper";

// Redux
import { Provider } from "react-redux";
import { createStore } from "redux";
import allReducers from "store/reducers";
import listener from "store/listener";

// Components
import App from "./App";

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (f) => f
);

// Listener
store.subscribe(() => listener(store));

ReactDOM.render(
  <Provider store={store}>
    <IntlProviderWrapper>
      <App />
    </IntlProviderWrapper>
  </Provider>,
  document.getElementById("root")
);
