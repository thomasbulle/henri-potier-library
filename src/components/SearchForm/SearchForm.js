import React, { Component } from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import { injectIntl } from "react-intl";
import { Input } from "antd";

const { Search } = Input;

class SearchForm extends Component {
  /**
   * To search the books corresponding to the value
   * @param {String} value
   */
  handleSearch(value) {
    const { items, getFilteredItems } = this.props;

    const filteredItems = items.filter((element) =>
      element.title.toLowerCase().includes(value.toLowerCase())
    );

    // Callback to send the filtered books in the store
    getFilteredItems(filteredItems);
  }

  render() {
    const { intl } = this.props;

    return (
      <Search
        placeholder={intl.formatMessage({ id: "searchForm.placeholder" })}
        allowClear
        onSearch={(value) => this.handleSearch(value)}
        onChange={(e) => this.handleSearch(e.target.value)}
        style={{ width: 250 }}
      />
    );
  }
}

SearchForm.propTypes = {
  intl: PropTypes.object,
  items: PropTypes.array,
  getFilteredItems: PropTypes.func
};

export default injectIntl(SearchForm);
