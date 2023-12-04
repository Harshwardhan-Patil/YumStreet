import '@/App.css';
import AppRouter from '@/routes/AppRoute';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/redux/store';
import MainLoading from './components/Skeleton/MainLoading';

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <QueryClientProvider client={queryClient}>
              <Suspense fallback={<MainLoading />}>
                <AppRouter />
              </Suspense>
            </QueryClientProvider>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
