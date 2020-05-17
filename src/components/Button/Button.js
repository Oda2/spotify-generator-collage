import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  button: {
    border: 'none',
    borderRadius: 50,
    padding: '20px 40px',
    backgroundColor: '#1db954',
    color: 'white',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    fontFamily: 'Indie Flower',
    fontSize: '1rem',
    '&:hover': {
      background: '#1ed760'
    },
    '&:active': {
      background: '#1aa34a'
    }
  }
});


const Button = ({ ...props }) => {
  const classes = useStyles();

  return (<button className={classes.button} {...props} />);
};

export default Button;
