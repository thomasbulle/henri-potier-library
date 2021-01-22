import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { IntlProvider } from "react-intl";
import messages_fr from "./translations/fr.json";
import messages_en from "./translations/en.json";

const messages = {
  "fr-FR": messages_fr,
  "en-EN": messages_en
};

const IntlProviderWrapper = ({ children, locale }) => (
  <IntlProvider locale={locale} messages={messages[locale]}>
    {children}
  </IntlProvider>
);

IntlProviderWrapper.propTypes = {
  children: PropTypes.node,
  locale: PropTypes.string
};

const mapStateToProps = (state) => ({
  locale: state.app.locale
});

export default connect(mapStateToProps)(IntlProviderWrapper);
