import React from 'react';
import { render, screen, userEvent } from 'test-utils';
import { ResetButton } from './reset-button';

describe('<ResetButton /> unit tests', () => {
  it('should render as expected', () => {
    const onReset = jest.fn();
    render(<ResetButton onReset={onReset} />);
    const btn = screen.getByRole('button', { name: /reset/i });
    userEvent.click(btn);
    expect(onReset).toHaveBeenCalledTimes(1);
  });
});
