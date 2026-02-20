import React, { Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';

import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary.tsx';
import Authentication from '../components/Authentication/Authentication.tsx';

import i18n from './i18n';
import Routes from './Routes.tsx';

export const App = () => {
  return (
    <Suspense fallback={<div />}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <Authentication
            url={import.meta.env.VITE_SPOTIFY_URL}
            clientId={import.meta.env.VITE_SPOTIFY_CLIENTID}
            responseType="token"
            redirectUri={import.meta.env.VITE_SPOTIFY_REDIRECTURI}
            scope="user-top-read"
          >
            <Routes />
          </Authentication>
        </I18nextProvider>
      </ErrorBoundary>
    </Suspense>
  );
};

export default App;
