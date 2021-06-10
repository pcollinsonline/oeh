import { Dispatch, SetStateAction, useEffect, useState } from 'react';

// adapted from
// https://usehooks-typescript.com/react-hook/use-local-storage
function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T)
): [T, Dispatch<SetStateAction<T>>, string | null] {
  const readValue = () => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(readValue);
  let errorMessage = null;

  const setValue: Dispatch<SetStateAction<T>> = value => {
    try {
      const newValue = value instanceof Function ? value(storedValue) : value;
      window.localStorage.setItem(key, JSON.stringify(newValue));
      setStoredValue(newValue);
    } catch (err) {
      errorMessage = `error setting localStorage key ${key}`;
    }
  };

  useEffect(() => {
    setStoredValue(readValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [storedValue, setValue, errorMessage];
}

export default useLocalStorage;
