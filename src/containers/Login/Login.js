import React from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';

import { useAuthentication } from '../../components/Authentication';
import Button from '../../components/Button';

// #2EBD59
const useStyles = createUseStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  },
});

export const Login = () => {
  const { t } = useTranslation();
  const { handleSignIn } = useAuthentication();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button onClick={handleSignIn}>
        {t('LOGIN')}
      </Button>
    </div>
  );
};

export default Login;
