import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { CookiesProvider } from 'react-cookie';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import App from './App';

const rootElement = document.getElementById('root');
const queryClient = new QueryClient();

if (rootElement != null) {
   const root = ReactDOM.createRoot(rootElement);

   root.render(
      <QueryClientProvider client={queryClient}>
         <BrowserRouter>
            <RecoilRoot>
               <CookiesProvider>
                  <App />
               </CookiesProvider>
            </RecoilRoot>
         </BrowserRouter>
      </QueryClientProvider>,
   );
} else {
   console.error("Root element with id 'root' not found.");
}
