import React, { Component } from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import { connect } from "react-redux";
import { Button, Input } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

// Enums
import { operationsEnum, screenSizesEnum } from "enums";

// Helpers
import { canLessItemQuantity, updateItemQuantity } from "helpers";

// Actions
import { updateItem } from "store/actions";

class ManageItemQuantity extends Component {
  /**
   * To add an item in the store
   */
  handleClickAddItem() {
    this.updateItem(operationsEnum.ADD);
  }

  /**
   * To reduce by 1 the quantity of item in the cart
   */
  handleClickRemoveItem() {
    this.updateItem(operationsEnum.LESS);
  }

  /**
   * To update the quantity of an item in the cart
   * @param {operationsEnum} operation
   */
  updateItem(operation) {
    const { dispatch, itemsInCart, item } = this.props;

    const index = itemsInCart.findIndex(
      (element) => element.title === item.title
    );

    dispatch(
      updateItem(updateItemQuantity(itemsInCart[index], operation), index)
    );
  }

  render() {
    const { item, className, screenSize } = this.props;

    return (
      <div className={`ManageItemQuantity-wrapper ${className}`}>
        <Input.Group compact>
          <Button
            className="button-minus"
            disabled={!canLessItemQuantity(item)}
            onClick={() => this.handleClickRemoveItem()}
            icon={<MinusOutlined />}
            style={{ width: "33%" }}
            size={screenSize === screenSizesEnum.XS ? "small" : "middle"}
          />
          <Input
            className="input-quantity"
            value={item.quantity}
            disabled
            style={{ width: "33%" }}
            size={screenSize === screenSizesEnum.XS ? "small" : "middle"}
          />
          <Button
            className="button-plus"
            onClick={() => this.handleClickAddItem()}
            icon={<PlusOutlined />}
            style={{ width: "33%" }}
            size={screenSize === screenSizesEnum.XS ? "small" : "middle"}
          />
        </Input.Group>
      </div>
    );
  }
}

ManageItemQuantity.propTypes = {
  dispatch: PropTypes.func,
  itemsInCart: PropTypes.array,
  item: PropTypes.object,
  className: PropTypes.string,
  screenSize: PropTypes.number
};

const mapStateToProps = ({ cart, app }) => ({
  itemsInCart: cart.items,
  screenSize: app.screenSize
});

export default connect(mapStateToProps)(ManageItemQuantity);
