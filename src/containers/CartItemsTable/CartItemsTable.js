import React, { Component } from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import { connect } from "react-redux";
import { injectIntl, FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { Table, Button, Tooltip, Empty } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

// Config
import config from "config/config";

// Enums
import { screenSizesEnum } from "enums";

// Helpers
import { getItemByTitle, calculateTotalWithoutOffer } from "helpers";

// Actions
import { removeItemInCart } from "store/actions";

// Containers
import ManageItemQuantity from "containers/ManageItemQuantity/ManageItemQuantity";

class CartItemsTable extends Component {
  /**
   * To remove an item category in the store
   * @param {String} itemName
   */
  handleClickRemoveItem(itemName) {
    const { dispatch, itemsInCart } = this.props;

    // Search the index of the current item in the cart in the store
    const index = itemsInCart.findIndex(
      (element) => element.title === itemName
    );
    // Remove this item if it is find in the cart
    if (index > -1) {
      dispatch(removeItemInCart(index));
    }
  }

  /**
   * Configure the table columns
   */
  getColumns() {
    const { intl, itemsInCart, screenSize } = this.props;

    // If the screen size is mobile, there is just one column "description" that contains all informations
    if (screenSize === screenSizesEnum.XS) {
      return config.cartItemsTable.columns.mobile.map((columnTitle) => {
        const column = {
          title: "",
          dataIndex: columnTitle,
          key: columnTitle
        };

        switch (columnTitle) {
          case "description":
            column.render = (text, record) => this.getMobileDescription(record);
            break;

          default:
            break;
        }

        return column;
      });
    } else {
      return config.cartItemsTable.columns.desktop.map((columnTitle) => {
        const title = intl.formatMessage({
          id: `cartItemsTable.column.title.${columnTitle}`
        });

        const column = {
          title,
          dataIndex: columnTitle,
          key: columnTitle
        };

        switch (columnTitle) {
          case "name":
            column.render = (text, record) => (
              <Link to={`/detail/${record.id}`}>
                <img
                  className="img-name-table"
                  src={record.cover}
                  alt={record.name}
                />
                <span>{text}</span>
              </Link>
            );
            break;

          case "price":
            column.render = (text) => <span>{text}&euro;</span>;
            break;

          case "quantity":
            column.render = (text, record) => {
              return (
                <ManageItemQuantity
                  item={getItemByTitle(record.name, itemsInCart)}
                />
              );
            };
            break;

          case "actions":
            column.render = (text, record) => {
              return (
                <Tooltip
                  title={intl.formatMessage({
                    id: "cartItemsTable.deleteItem.tooltip"
                  })}
                  placement="bottomRight"
                >
                  <Button
                    type="primary"
                    danger
                    className="delete-item-button"
                    onClick={() => this.handleClickRemoveItem(record.name)}
                  >
                    <DeleteOutlined />
                  </Button>
                </Tooltip>
              );
            };
            break;

          default:
            break;
        }

        return column;
      });
    }
  }

  /**
   * To render the description column in mobile mode
   * @param {Object} item
   */
  getMobileDescription(item) {
    const { itemsInCart, intl } = this.props;

    return (
      <div className="mobile-description-wrapper">
        <div className="mobile-cover-container">
          <Link to={`/detail/${item.id}`}>
            <img className="img-name-table" src={item.cover} alt={item.name} />
          </Link>
        </div>

        <div className="mobile-description-container">
          <span className="mobile-description-title">{item.name}</span>
          <span className="mobile-description-price">
            {item.quantity} x {item.price}&euro;
          </span>
          <div className="quantity-actions-container">
            <ManageItemQuantity item={getItemByTitle(item.name, itemsInCart)} />
            <Tooltip
              title={intl.formatMessage({
                id: "cartItemsTable.deleteItem.tooltip"
              })}
              placement="bottomRight"
            >
              <Button
                type="primary"
                danger
                className="delete-item-button"
                onClick={() => this.handleClickRemoveItem(item.name)}
                size="small"
              >
                <DeleteOutlined />
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
    );
  }

  /**
   * To format the datasource in the table
   */
  getDataSource() {
    const { itemsInCart } = this.props;

    return itemsInCart.map((item, index) => ({
      key: index,
      name: item.title,
      price: item.price,
      quantity: item.quantity,
      id: item.isbn,
      cover: item.cover
    }));
  }

  /**
   * To render the table footer that contains the prices and the offer
   */
  getTableFooter() {
    const { cartTotal, applicatedOffer, itemsInCart } = this.props;

    return (
      <div className="footer-table">
        <div className="subtotal-container">
          <span className="subtotal-label">
            <FormattedMessage id="cartItemsTable.tableFooter.subtotal" />
            &nbsp;:&nbsp;
          </span>
          <span>{calculateTotalWithoutOffer(itemsInCart)}</span>
        </div>
        <div className="offer-container">
          <span className="offer-label">
            <FormattedMessage id="cartItemsTable.tableFooter.offers" />
            &nbsp;:&nbsp;
          </span>
          <span>{this.getApplicatedOfferText(applicatedOffer)}</span>
        </div>
        <div className="total-container">
          <span>Total : </span>
          <span>{cartTotal}&euro;</span>
        </div>
      </div>
    );
  }

  /**
   * To format the display of the offer in the table footer
   * @param {Object} applicatedOffer
   */
  getApplicatedOfferText(applicatedOffer) {
    const { intl } = this.props;

    if (!applicatedOffer) {
      return intl.formatMessage({ id: "cartItemsTable.applicatedOffer.any" });
    }

    switch (applicatedOffer.type) {
      case "percentage":
        return <span>{applicatedOffer.value}&#37;</span>;
      case "minus":
        return <span>-{applicatedOffer.value}&euro;</span>;
      case "slice":
        return (
          <span>
            <FormattedMessage
              id="cartItemsTable.applicatedOffer.slice"
              values={{
                sliceValue: applicatedOffer.sliceValue,
                value: applicatedOffer.value
              }}
            />
          </span>
        );
      default:
        return "";
    }
  }

  render() {
    return (
      <div className="cartItemsTable-wrapper">
        <Table
          columns={this.getColumns()}
          dataSource={this.getDataSource()}
          pagination={false}
          footer={() => this.getTableFooter()}
          locale={{
            filterConfirm: "Ok",
            filterReset: "Reset",
            emptyText: (
              <Empty
                description={<FormattedMessage id="cartPopover.emptyCart" />}
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            )
          }}
        />
      </div>
    );
  }
}

CartItemsTable.propTypes = {
  dispatch: PropTypes.func,
  intl: PropTypes.object,
  itemsInCart: PropTypes.array,
  cartTotal: PropTypes.number,
  screenSize: PropTypes.number
};

const mapStateToProps = ({ cart, app }) => ({
  itemsInCart: cart.items,
  cartTotal: cart.total,
  applicatedOffer: cart.applicatedOffer,
  screenSize: app.screenSize
});

export default connect(mapStateToProps)(injectIntl(CartItemsTable));
