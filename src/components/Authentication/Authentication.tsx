import { useState, useEffect, ReactNode } from 'react';
import AuthenticationContext from './AuthenticationContext.tsx';

interface AuthState {
  authenticated: boolean;
  access_token?: string;
  user: object;
}

interface AuthenticationProps {
  url: string;
  clientId: string;
  responseType: string;
  redirectUri: string;
  scope: string;
  children: ReactNode;
}

export const Authentication = ({
  url,
  clientId,
  responseType,
  redirectUri,
  scope,
  children
}: AuthenticationProps) => {
  const [auth, setAuth] = useState<AuthState>({ authenticated: false, user: {} });

  const handleSignIn = () => {
    const width = 500;
    const height = 500;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2.5;

    const windowFeatures = `toolbar=0,scrollbars=1,status=1,resizable=0,location=1,menuBar=0,width=${width},height=${height},top=${top},left=${left}`;
    window.open(`${url}?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectUri}&scope=${scope}`, 'Spotify Login', windowFeatures);

    window.addEventListener('message', messageListener);
  };

  const messageListener = (event: MessageEvent) => {
    if ((event.data) && (event.data.access_token)) {
      setAuth({
        authenticated: true,
        access_token: event.data.access_token,
        user: {},
      });
    }
  };

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash.length === 0) {
      return;
    }

    const params: Record<string, string> = {};
    hash
      .split('&')
      .filter((param) => (param.match(/=/g) || []).length === 1)
      .forEach((item) => {
        const [key, val] = item.split('=');
        params[key] = val;
      });

    if (params.access_token) {
      window.opener.postMessage({ access_token: params.access_token, ...params });
      window.close();
    }
  }, [window.location.pathname]);

  return (
    <AuthenticationContext.Provider value={{
      handleSignIn,
      authenticated: auth.authenticated,
      access_token: auth.access_token,
      user: auth.user
    }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default Authentication;
