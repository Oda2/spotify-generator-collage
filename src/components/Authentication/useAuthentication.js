import { useContext } from 'react';
import AuthenticationContext from './AuthenticationContext';

export const useAuthentication = () => {
  const authentication = useContext(AuthenticationContext);

  if (!authentication) {
    console.error('You are using the `useAuthentication` hook, outsite of AuthenticationProvider component. Use this hook only in children of `AuthenticationProvider`');
  }

  return authentication;
};

export default useAuthentication;
