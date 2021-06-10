import React from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from '../../i18n/messages-default';

interface ErrorMessageProps {
  error: Error;
}

const ErrorMessage = ({ error }: ErrorMessageProps): JSX.Element => {
  const message =
    messages[error.message as keyof typeof messages] ||
    messages.defaultErrorMessage;

  return (
    <div className="ui-error-message pa3 h4 h3-ns helvetica ba br3 flex justify-center items-center">
      <FormattedMessage {...message} tagName="span" />
    </div>
  );
};

export { ErrorMessage };
