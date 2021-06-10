import React from 'react';
import { FormattedMessage } from 'react-intl';
import { FLEX_CENTER, FONT } from './tachyons-styles';
import { messages } from '../../../i18n/messages-default';

interface ResetButtonProps {
  onReset: () => void;
}

const ResetButton = React.memo(({ onReset }: ResetButtonProps) => {
  return (
    <button
      type="button"
      className={`ui-reset-btn ph4 tracked flex br3 ${FONT} ${FLEX_CENTER}`}
      onClick={onReset}
    >
      <span>
        <FormattedMessage {...messages.resetBtnLabel} />
      </span>
    </button>
  );
});
ResetButton.displayName = 'ResetButton';

export { ResetButton };
