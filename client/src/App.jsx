import '@/App.css'
import AppRouter from '@/routes/AppRoute'
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from '@/redux/store';

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <Suspense fallback={<div>Loading</div>}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <QueryClientProvider client={queryClient}>
                <AppRouter />
              </QueryClientProvider>
            </BrowserRouter>
          </PersistGate>
        </Provider>
      </Suspense>
    </>
  )
}

export default App
