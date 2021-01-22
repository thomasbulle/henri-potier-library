import React, { Component } from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import { connect } from "react-redux";
import { injectIntl, FormattedMessage } from "react-intl";

// Enums
import { componentsEnum } from "enums";

// Helpers
import { addAndUpdateItemToCart } from "helpers";

// Actions
import { updateHomePosition } from "store/actions";

// Components
import CardItem from "components/CardItem/CardItem.js";
import SearchForm from "components/SearchForm/SearchForm";
import Loader from "components/Loader/Loader";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredItems: []
    };
  }

  componentDidMount() {
    const { items, homePosition } = this.props;
    // Init page position
    window.scrollTo(homePosition.x, homePosition.y);
    // Init the state
    this.setState({ filteredItems: items });
  }

  componentDidUpdate(prevProps) {
    const { items } = this.props;
    // If the length of defaults items changed
    if (prevProps.items.length !== items.length) {
      this.setState({ filteredItems: items });
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(updateHomePosition(0, window.scrollY));
  }

  render() {
    const { filteredItems } = this.state;
    const { intl, dispatch, items, itemsInCart } = this.props;

    return (
      <div className="Home-wrapper">
        <p className="home-intro" dangerouslySetInnerHTML={{ __html: intl.formatMessage({ id: "home.intro" }) }} />

        <div className="title-container">
          <h2 className="header-title">
            <FormattedMessage id="home.bodyTitle" />
          </h2>

          <SearchForm
            items={items}
            getFilteredItems={(filteredItems) =>
              this.setState({ filteredItems })
            }
          />
        </div>

        <div className="home-container">
          {items.length
            ? (filteredItems.map((item, index) => (
              <CardItem
                key={index}
                item={item}
                itemsInCart={itemsInCart}
                handleClickAddToCart={() =>
                  addAndUpdateItemToCart(dispatch, itemsInCart, item)
                }
                parent={componentsEnum.HOME}
              />
            )))
            : <Loader />}
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  intl: PropTypes.object,
  dispatch: PropTypes.func,
  items: PropTypes.array,
  itemsInCart: PropTypes.array,
  homePosition: PropTypes.object
};

const mapStateToProps = ({ app, cart }) => ({
  items: app.items,
  itemsInCart: cart.items,
  homePosition: app.homePosition
});

export default connect(mapStateToProps)(injectIntl(Home));
