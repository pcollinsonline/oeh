import React from 'react';
import { IntlProvider } from 'react-intl';

const locale = 'en';

const TranslationProvider: React.FC = ({ children }) => {
  return (
    <IntlProvider locale={locale} defaultLocale="en">
      {children}
    </IntlProvider>
  );
};

export default TranslationProvider;
