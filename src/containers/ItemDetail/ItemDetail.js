import React, { Component } from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";

// Enums
import { componentsEnum } from "enums";

// Helpers
import { addAndUpdateItemToCart } from "helpers";

// Components
import CardItem from "components/CardItem/CardItem";

class ItemDetail extends Component {
  componentDidMount() {
    // Scroll to the top
    window.scrollTo(0, 0);
  }

  render() {
    const {
      dispatch,
      items,
      itemsInCart,
      match: { params }
    } = this.props;
    const { id } = params;

    // Find the item in the store according to the id in the route
    const item = items.find((element) => element.isbn === id);

    if (item) {
      return (
        <div className="ItemDetail-wrapper">
          <Button
            type="link"
            onClick={() => this.props.history.push("/")}
            icon={<LeftOutlined />}
            className="button-back"
          >
            <FormattedMessage id="itemDetail.backToHome" />
          </Button>

          <CardItem
            item={item}
            itemsInCart={itemsInCart}
            handleClickAddToCart={() =>
              addAndUpdateItemToCart(dispatch, itemsInCart, item)
            }
            parent={componentsEnum.ITEM_DETAIL}
          />
        </div>
      );
    } else {
      return null;
    }
  }
}

ItemDetail.propTypes = {
  dispatch: PropTypes.func,
  items: PropTypes.array,
  itemsInCart: PropTypes.array,
  handleClickAddToCart: PropTypes.func
};

const mapStateToProps = ({ app, cart }) => ({
  items: app.items,
  itemsInCart: cart.items
});

export default connect(mapStateToProps)(ItemDetail);
