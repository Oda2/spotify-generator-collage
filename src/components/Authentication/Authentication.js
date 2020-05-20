import React, { useState, useEffect } from 'react';
import AuthenticationContext from './AuthenticationContext';

export const Authentication = ({
  url,
  clientId,
  responseType,
  redirectUri,
  scope,
  children
}) => {
  const [auth, setAuth] = useState({ authenticated: false, user: {} });

  const handleSignIn = () => {
    window.location.href = `${url}?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectUri}&scope=${scope}`;
  };

  useEffect(() => {
    const hash = window.location.hash.substring(1);

    if (hash.length === 0) {return;}

    const params = hash
      .split('&')
      .filter((param) => (param.match(/=/g) || []).length === 1)
      .reduce((acc, item) => {
        const [key, val] = item.split('=');
        acc[key] = val;
        return acc;
      }, []);

    if (params.access_token) {
      console.log(params.access_token);
      setAuth({ ...auth, access_token: params.access_token, authenticated: true });
    }
  }, [window.location.pathname]);

  return (
    <AuthenticationContext.Provider value={{ handleSignIn, ...auth }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default Authentication;
