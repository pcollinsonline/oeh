import React from 'react';
import { FaMoon } from 'react-icons/fa';
import { BsSun } from 'react-icons/bs';
import { Tooltip } from '@reach/tooltip';
import { useIntl } from 'react-intl';
import { VisuallyHidden } from '@reach/visually-hidden';
import { messages } from '../../i18n/messages-default';
import { useColorMode } from '../../hooks/use-color-mode';

const ColorModeToggle = (): JSX.Element => {
  const { formatMessage } = useIntl();
  const btnLabel = formatMessage(messages.colorModeToggleBtnLabel);
  const [theme, toggleTheme] = useColorMode();

  return (
    <>
      <Tooltip label={btnLabel}>
        <button
          type="button"
          className="ui-color-mode-toggle"
          onClick={toggleTheme}
          data-testid="color-mode-toggle"
        >
          {theme === 'light' ? <FaMoon /> : <BsSun />}
          <VisuallyHidden>{btnLabel}</VisuallyHidden>
        </button>
      </Tooltip>
    </>
  );
};

export { ColorModeToggle };
