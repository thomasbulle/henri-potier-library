import React from "react";
import "./styles.scss";
import { FormattedMessage } from "react-intl";

const Loader = () => (
  <div className="Loader-wrapper">
    <span className="loader-text">
      <FormattedMessage id="loader.text" />
    </span>
    <div className="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

export default Loader;
