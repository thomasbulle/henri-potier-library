import React, { Component } from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import { FormattedMessage } from "react-intl";
import { Button, Rate } from "antd";
import { ZoomInOutlined } from "@ant-design/icons";
import Lightbox from "react-image-lightbox";
import { Link } from "react-router-dom";

// Enums
import { componentsEnum } from "enums";

// Helpers
import { checkIfItemIsAlreadyAdded, getItemByTitle } from "helpers";

// Containers
import ManageItemQuantity from "containers/ManageItemQuantity/ManageItemQuantity";

class CardItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canSeeMore: false,
      isOpenCover: false
    };
  }

  componentDidMount() {
    const { parent } = this.props;

    // If this component is displayed in the ItemDetail component, the synopsis is fully displayed
    if (parent === componentsEnum.ITEM_DETAIL) {
      this.setState({ canSeeMore: true });
    }
  }

  /**
   * To get the classname of parent div according to the parent component
   */
  getClassNameByParent() {
    const { parent } = this.props;

    switch (parent) {
      case componentsEnum.HOME:
        return "cardItem-home-wrapper";

      case componentsEnum.ITEM_DETAIL:
        return "cardItem-itemDetail-wrapper";

      default:
        return "";
    }
  }

  /**
   * To truncate the synopsis after 250 characters.
   */
  truncateSynopsis() {
    const { canSeeMore } = this.state;
    const { item } = this.props;

    if (canSeeMore) {
      return item.synopsis.join(" ");
    } else {
      const text = item.synopsis[0];

      if (text.length <= 250) {
        return text;
      }

      const subString = text.substr(0, 250 - 1); // the original check
      return subString.substr(0, subString.lastIndexOf(" ")) + " &hellip;";
    }
  }

  render() {
    const { isOpenCover } = this.state;
    const { item, itemsInCart, handleClickAddToCart, parent } = this.props;

    return (
      <div className={`CardItem-wrapper ${this.getClassNameByParent()}`}>
        <Link to={`/detail/${item.isbn}`}>
          <span className="cardItem-title">{item.title}</span>
        </Link>

        <div className="text-container">
          <div
            className="cover-container"
            onClick={() => this.setState({ isOpenCover: true })}
          >
            <img className="cardItem-cover" src={item.cover} alt={item.title} />
            <ZoomInOutlined className="icon-zoom" />
          </div>
          <p className="cardItem-synopsis-container">
            <span
              className="cardItem-synopsis"
              dangerouslySetInnerHTML={{ __html: this.truncateSynopsis() }}
            />
            {parent === componentsEnum.HOME && (
              <React.Fragment>
                <br />
                <Link to={`/detail/${item.isbn}`}>
                  <span className="see-more-synopsis">
                    <FormattedMessage id="cardItem.seeMore" />
                  </span>
                </Link>
              </React.Fragment>
            )}
          </p>
        </div>

        <div className="cardItem-footer">
          <div className="rate-container">
            <Rate
              disabled
              allowHalf
              defaultValue={item.rate}
              className="rate-card-item"
            />
            <span>({item.comments})</span>
          </div>

          <div className="cardItem-price-container">
            <span className="cardItem-price">{item.price} &euro;</span>

            {checkIfItemIsAlreadyAdded(itemsInCart, item) ? (
              <ManageItemQuantity
                item={getItemByTitle(item.title, itemsInCart)}
              />
            ) : (
              <Button onClick={handleClickAddToCart}>
                <FormattedMessage id="cardItem.addToCartButton" />
              </Button>
            )}
          </div>
        </div>

        {isOpenCover && (
          <Lightbox
            mainSrc={item.cover}
            onCloseRequest={() => this.setState({ isOpenCover: false })}
            imageTitle={item.title}
          />
        )}
      </div>
    );
  }
}

CardItem.propTypes = {
  item: PropTypes.object,
  itemsInCart: PropTypes.array,
  handleClickAddToCart: PropTypes.func,
  parent: PropTypes.number
};

export default CardItem;
