import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  '@global': {
    html: {
      height: '100%'
    },
    body: {
      height: '100%',
      backgroundColor: '#DDD',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    },
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
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
