import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  '@global': {
    body: {
      height: '100%',
      backgroundColor: '#DDD'
    },
  },
  main: {
    display: 'flex',
    height: '100vh',
    width: '100%'
  }
});


const Main = ({ children }) => {
  const classes = useStyles();

  return (
    <main className={classes.main}>
      {children}
    </main>
  );
};

export default Main;
