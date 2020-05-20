import React from 'react';

import { useAuthentication } from '../components/Authentication';

import Main from '../containers/Main';

const Login = React.lazy(() => import('../containers/Login'));
const GeneratorCollage = React.lazy(() => import('../containers/GeneratorCollage'));

export const Routes = () => {
  const { authenticated } = useAuthentication();

  return (
    <Main>
      {authenticated ? <GeneratorCollage /> : <Login />}
    </Main>
  );
};

export default Routes;
