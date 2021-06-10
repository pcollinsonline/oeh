import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Toggles from '../config/toggles';

const queryClient = new QueryClient();

const DataProvider: React.FC = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {!Toggles.disableLiveWordPool && <ReactQueryDevtools />}
      {children}
    </QueryClientProvider>
  );
};

export default DataProvider;
