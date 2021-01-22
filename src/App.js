import React, { Component } from "react";
import PropTypes from "prop-types";
import "./App.scss";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

// Config
import config from "config/config";

// Enums
import { screenSizesEnum } from "enums";

// Helpers
import { addCartInLocalStorage } from "helpers";

// Actions
import {
  addAllBooks,
  injectCart,
  updateLocale,
  updateScreenSize
} from "store/actions";

// Containers
import Header from "containers/Header/Header.js";
import Home from "containers/Home/Home.js";
import ItemDetail from "containers/ItemDetail/ItemDetail";
import Cart from "containers/Cart/Cart.js";

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    // Add event to detect when the window is resized
    window.addEventListener("resize", () => this.getScreenSize());

    // To get the window size
    this.getScreenSize();

    // Set the locale
    dispatch(updateLocale(navigator.language || "fr-FR"));

    // Get all the books and add it in the store
    axios
      .get("https://henri-potier.techx.fr/books")
      .then(async (res) => {
        const items = await res.data.map((item) => ({
          ...item,
          rate: Math.random() * (6 - 3) + 3,
          comments: Math.ceil(Math.random() * (31 - 5) + 5)
        }));
        dispatch(addAllBooks(items));
      })
      .catch((err) => console.error(err));

    // Get the cart in the localStorage
    const storageCart = localStorage.getItem("cart");

    // If there is a cart in the localStorage, add it in the store
    if (storageCart && JSON.parse(storageCart).length) {
      dispatch(injectCart(JSON.parse(storageCart)));
    }
  }

  componentDidUpdate(prevProps) {
    const { locale, intl } = this.props;

    if (prevProps.locale !== locale) {
      message.info(intl.formatMessage({ id: "header.changeLocale" }));
    }
  }

  componentWillUnmount() {
    const { itemsInCart } = this.props;
    // Add the current cart in the localStorage when the application is closing
    addCartInLocalStorage(itemsInCart);
  }

  getScreenSize() {
    const { dispatch, screenSize } = this.props;

    if (
      window.innerWidth < config.app.responsiveSizes.s &&
      screenSize !== screenSizesEnum.XS
    ) {
      dispatch(updateScreenSize(screenSizesEnum.XS));
    } else if (
      window.innerWidth > config.app.responsiveSizes.s &&
      screenSize !== screenSizesEnum.S
    ) {
      dispatch(updateScreenSize(screenSizesEnum.S));
    } else if (
      window.innerWidth > config.app.responsiveSizes.m &&
      screenSize !== screenSizesEnum.M
    ) {
      dispatch(updateScreenSize(screenSizesEnum.M));
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header />

          <div className="app-body">
            <Switch>
              <Route
                path="/detail/:id"
                render={(props) => <ItemDetail {...props} />}
              />
              <Route path="/cart">
                <Cart />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>

            <p className="copyright">&copy; Thomas Bulle</p>
          </div>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func,
  intl: PropTypes.object,
  itemsInCart: PropTypes.array,
  screenSize: PropTypes.number,
  locale: PropTypes.string
};

const mapStateToProps = ({ cart, app }) => ({
  itemsInCart: cart.items,
  screenSize: app.screenSize,
  locale: app.locale
});

export default connect(mapStateToProps)(injectIntl(App));
