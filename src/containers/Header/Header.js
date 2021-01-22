import React, { Component } from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import { connect } from "react-redux";
import { injectIntl, FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { Popover, Button, Badge } from "antd";

// Config
import config from "config/config";

// ActionsTypes
import { ADD_ITEM_TO_CART, UPDATE_ITEM } from "store/actions/actionsTypes";

// Actions
import { updateLocale } from "store/actions";

// Enums
import { screenSizesEnum } from "enums";

// Helpers
import { getTotalNbrOfItemsInCart } from "helpers";

// Containers
import CartPopover from "containers/CartPopover/CartPopover.js";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenPopoverCart: false
    };
  }

  /**
   * To return the good className to apply on the cart icon
   * according to the lastAction called in the redux store
   * @param {String} lastAction
   */
  getClassNameShopCart(lastAction) {
    if ([ADD_ITEM_TO_CART, UPDATE_ITEM].includes(lastAction)) {
      return "animate";
    }
  }

  render() {
    const { isOpenPopoverCart } = this.state;
    const { dispatch, intl, itemsInCart, lastAction, screenSize } = this.props;

    return (
      <div className="Header-wrapper">
        <div className="locale-container">
          {config.app.locales.map((locale, index) => (
            <span
              key={index}
              className={`locale ${locale}`}
              onClick={() => dispatch(updateLocale(locale))}
              title={intl.formatMessage({
                id: `header.localeFlag.title.${locale}`
              })}
            >
              <img
                className="locale-flag"
                src={`ressources/images/${locale}.png`}
                alt={locale}
              />
            </span>
          ))}
        </div>

        <div className="logo-container">
          <Link to="/">
            <img
              className="logo-img"
              src="https://fontmeme.com/permalink/210115/af584580b184245e64544f22a3a395df.png"
              border="0"
              alt={intl.formatMessage({ id: "header.altLogo" })}
            />
          </Link>
        </div>

        <div className="cart-container">
          <Popover
            visible={isOpenPopoverCart}
            content={
              <CartPopover
                handleClickSeeCart={() =>
                  this.setState({ isOpenPopoverCart: false })
                }
              />
            }
            trigger="click"
            title={<FormattedMessage id="header.cartPopover.title" />}
            placement="bottomRight"
            onVisibleChange={(value) =>
              this.setState({ isOpenPopoverCart: value })
            }
          >
            <Button
              className={`cart-button ${this.getClassNameShopCart(lastAction)}`}
              type="link"
              onClick={() =>
                this.setState({ isOpenPopoverCart: !isOpenPopoverCart })
              }
            >
              <Badge
                count={getTotalNbrOfItemsInCart(itemsInCart)}
                size={screenSize === screenSizesEnum.XS ? "small" : "default"}
              >
                <img
                  className="card-icon"
                  src="ressources/images/shopping-cart.png"
                  alt={intl.formatMessage({ id: "header.altCartIcon" })}
                />
              </Badge>
            </Button>
          </Popover>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  dispatch: PropTypes.func,
  itemsInCart: PropTypes.array,
  lastAction: PropTypes.string,
  screenSize: PropTypes.number
};

const mapStateToProps = ({ cart, lastAction, app }) => ({
  itemsInCart: cart.items,
  lastAction: lastAction.type,
  screenSize: app.screenSize
});

export default connect(mapStateToProps)(injectIntl(Header));
