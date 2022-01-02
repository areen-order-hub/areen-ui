/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { IntlProvider } from 'react-intl';
import get from 'lodash/get';

export function LanguageProvider(props) {
  const locale = useSelector(state => get(state, 'language.locale'));

  return (
    <IntlProvider
      locale={locale}
      key={locale}
      messages={props.messages[locale]}
    >
      {React.Children.only(props.children)}
    </IntlProvider>
  );
}

LanguageProvider.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.element.isRequired,
};

export default LanguageProvider;
