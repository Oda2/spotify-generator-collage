import React, { Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';

import ErrorBoundary from '../components/ErrorBoundary';
import Authentication from '../components/Authentication';

import i18n from './i18n';
import Routes from './Routes';

export const App = () => {
  return (
    <Suspense fallback={<div />}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <Authentication
            url={process.env.REACT_APP_SPOTIFY_URL}
            clientId={process.env.REACT_APP_SPOTIFY_CLIENTID}
            responseType="token"
            redirectUri={process.env.REACT_APP_SPOTIFY_REDIRECTURI}
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
