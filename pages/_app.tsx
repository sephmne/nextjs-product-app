import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

if (process.env.NODE_ENV === 'development') {
  require('../src/mocks');
}

Chart.register(ArcElement);
Chart.register(Tooltip);
Chart.register(Legend);

const MyApp = ({ Component, pageProps }: AppProps) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
};

export default MyApp;
