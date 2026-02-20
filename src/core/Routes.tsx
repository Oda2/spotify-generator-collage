import React from 'react';

import { useAuthentication } from '../components/Authentication/index.ts';

import Main from '../containers/Main/Main.tsx';

const Login = React.lazy(() => import('../containers/Login/Login.tsx'));
const GeneratorCollage = React.lazy(() => import('../containers/GeneratorCollage/GeneratorCollage.tsx'));

export const Routes = () => {
  const { authenticated } = useAuthentication();

  return (
    <Main>
      {authenticated ? <GeneratorCollage /> : <Login />}
    </Main>
  );
};

export default Routes;
