import React from 'react';

import { useAuthentication } from '../components/Authentication';

import Main from '../containers/Main';
import Login from '../containers/Login';
import GeneratorCollage from '../containers/GeneratorCollage';

export const Routes = () => {
  const { authenticated } = useAuthentication();

  return (
    <Main>
      {authenticated ? <GeneratorCollage /> : <Login />}
    </Main>
  );
};

export default Routes;
