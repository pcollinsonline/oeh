import React from 'react';
import {
  render as rtlRender,
  screen,
  waitFor,
  RenderOptions,
  RenderResult,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TranslationProvider from './i18n/TranslationProvider';

const AllProviders: React.FC = ({ children }) => {
  // wrap all components in i18n provider
  return <TranslationProvider>{children}</TranslationProvider>;
};

const render = (
  ui: React.ReactElement,
  options?: RenderOptions
): RenderResult => rtlRender(ui, { wrapper: AllProviders, ...options });

// noinspection JSUnusedGlobalSymbols
const verifyNoErrorsInConsole = (
  renderFN: () => RenderResult
): RenderResult => {
  const spy = jest.spyOn(global.console, 'error').mockImplementation();
  try {
    const retVal = renderFN();
    expect(spy).not.toHaveBeenCalled();
    return retVal;
  } finally {
    spy.mockRestore();
  }
};

export { render, screen, waitFor, verifyNoErrorsInConsole, userEvent };
