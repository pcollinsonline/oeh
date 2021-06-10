import React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
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
    <Tooltip label={btnLabel}>
      <button
        type="button"
        className="ui-color-mode-toggle"
        onClick={toggleTheme}
        data-testid="color-mode-toggle"
      >
        {theme === 'light' ? <FaMoon size={12} /> : <FaSun size={12} />}
        <VisuallyHidden>{btnLabel}</VisuallyHidden>
      </button>
    </Tooltip>
  );
};

export { ColorModeToggle };
