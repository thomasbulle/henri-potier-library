import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { injectIntl, FormattedMessage } from "react-intl";
import { Button, message } from "antd";

// Enums
import { screenSizesEnum } from "enums";

// Actions
import { resetCart } from "store/actions";

// Containers
import CartItemsTable from "containers/CartItemsTable/CartItemsTable";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validatedCommand: false
    };
  }

  componentDidMount() {
    const { itemsInCart } = this.props;

    if (itemsInCart.length <= 0) {
      this.setState({ validatedCommand: true });
    }
  }

  componentDidUpdate(prevProps) {
    const { validatedCommand } = this.state;
    const { itemsInCart } = this.props;

    if (
      prevProps.itemsInCart !== itemsInCart &&
      itemsInCart.length <= 0 &&
      !validatedCommand
    ) {
      this.setState({ validatedCommand: true });
    } else if (
      prevProps.itemsInCart !== itemsInCart &&
      itemsInCart.length > 0 &&
      validatedCommand
    ) {
      this.setState({ validatedCommand: false });
    }
  }

  /**
   * To validate the cart when the validate button is clicked
   */
  handleClickValidate() {
    const { intl, history, dispatch } = this.props;

    this.setState({ validatedCommand: true });

    // Display a first loading message
    message
      .loading(
        intl.formatMessage({ id: "cart.modalConfirmCommand.title.load" }),
        2
      )
      .then(() => {
        // Display a success message that confirm the command
        message
          .success(
            intl.formatMessage({
              id: "cart.modalConfirmCommand.title.validated"
            }),
            2
          )
          .then(() => {
            // Redirect to the home page
            history.push("/");
            // Empty the cart in the store
            dispatch(resetCart());
          });
      });
  }

  render() {
    const { validatedCommand } = this.state;
    const { screenSize } = this.props;

    return (
      <div className="Cart-wrapper">
        <h2 className="cart-title">
          <FormattedMessage id="cart.title" />
        </h2>

        <CartItemsTable />

        <Button
          size={screenSize === screenSizesEnum.XS ? "middle" : "large"}
          disabled={validatedCommand}
          onClick={() => this.handleClickValidate()}
        >
          <FormattedMessage id="cart.confirmCommand" />
        </Button>
      </div>
    );
  }
}

Cart.propTypes = {
  intl: PropTypes.object,
  dispatch: PropTypes.func,
  itemsInCart: PropTypes.array,
  screenSize: PropTypes.number
};

const mapStateToProps = ({ cart, app }) => ({
  itemsInCart: cart.items,
  screenSize: app.screenSize
});

export default connect(mapStateToProps)(injectIntl(withRouter(Cart)));
