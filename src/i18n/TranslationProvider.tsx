import React from 'react';
import { IntlProvider } from 'react-intl';

const TranslationProvider: React.FC = ({ children }) => {
  return (
    <IntlProvider
      locale={navigator.language || 'en-US'}
      onError={error => {
        // todo - this is here as a stop gap
        // we don't need to support anything
        // beyond the default messages at this stage
        if (`${error.code}` !== 'MISSING_TRANSLATION') {
          throw error;
        }
      }}
    >
      {children}
    </IntlProvider>
  );
};

export default TranslationProvider;
