import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { Button, Empty } from "antd";

// Containers
import ManageItemQuantity from "containers/ManageItemQuantity/ManageItemQuantity";

const CartPopover = ({ items, cartTotal, handleClickSeeCart }) => (
  <div className="CartPopover-wrapper">
    <div className="cart-content-container">
      {items.length > 0 ? (
        items.map((item, index) => (
          <div className="item-detail-container" key={index}>
            <img className="cover-item-detail" src={item.cover} alt={item.title} />
            <div key={index} className="item-detail">
              <span className="item-title">{item.title}</span>
              <div className="price-quantity-container">
                <span className="single-price">{item.price}&euro;</span>
                <ManageItemQuantity
                  className="quantity-container-popover"
                  item={item}
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <Empty
          description={<FormattedMessage id="cartPopover.emptyCart" />}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )}
    </div>

    <div className="footer-popover">
      <span className="total-price">
        <FormattedMessage id="cartPopover.footer.totalPrice" />
        &nbsp;:&nbsp;
        {cartTotal}&euro;
      </span>

      <Link to="/cart">
        <Button onClick={() => handleClickSeeCart()}>
          <FormattedMessage id="cartPopover.buttonSeeCart" />
        </Button>
      </Link>
    </div>
  </div>
);

CartPopover.propTypes = {
  items: PropTypes.array,
  cartTotal: PropTypes.number,
  handleClickSeeCart: PropTypes.func
};

const mapStateToProps = ({ cart }) => ({
  items: cart.items,
  cartTotal: cart.total
});

export default connect(mapStateToProps)(CartPopover);
