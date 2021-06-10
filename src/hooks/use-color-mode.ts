import React from 'react';
import useLocalStorage from './use-local-storage';

const useColorMode = (): ['light' | 'dark', () => void] => {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>(
    'colorMode',
    'light'
  );

  React.useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  const updateTheme = React.useCallback(() => {
    setTheme(previousTheme => {
      return previousTheme === 'light' ? 'dark' : 'light';
    });
  }, [setTheme]);

  return [theme, updateTheme];
};

export { useColorMode };
