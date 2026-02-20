import React from 'react';

interface AuthContextType {
  handleSignIn?: () => void;
  authenticated: boolean;
  access_token?: string;
  user?: object;
}

export const AuthenticationContext = React.createContext<AuthContextType>({
  authenticated: false,
  user: {},
});

export default AuthenticationContext;
