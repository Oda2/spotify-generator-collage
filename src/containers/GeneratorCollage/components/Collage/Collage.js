import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  photo: {
    background: 'white',
    boxShadow: 'inset 0px 0px 50px rgba(0, 0, 0, 0.1), 0px 5px 10px rgba(0,0,0,0.25)',
    margin: 0,
    borderRadius: 3,
    padding: 10,
    transition: 'all 100ms ease-out',
    cursor: 'pointer',
    transform: props => `rotateZ(${props.rotation}deg)`,
    zIndex: props => props.depth,
    '&:hover': {
      transform: 'rotateZ(0deg) scale(1.2)',
      zIndex: 1000,
      boxShadow: 'inset 0px 0px 50px rgba(0, 0, 0, 0.1), 0px 0px 29px rgba(0, 0, 0, 0.2)'
    }
  },
  image: {
    width: '100%',
    height: 'auto'
  },
  text: {
    marginTop: 10,
    fontFamily: 'Indie Flower, cursive',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: '1',
    color: 'black'
  }
});

const Collage = ({ position, artist }) => {
  const classes = useStyles({
    rotation: Math.random() * 41 - 10,
    depth: Math.floor(Math.random() * 256)
  });

  const handleOpenItem = () => {
    window.open(artist.external_urls.spotify);
  };

  return (
    <figure
      className={classes.photo}
      onClick={handleOpenItem}
      role="presentation"
    >
      <img
        src={artist.images[0].url}
        alt={artist.name}
        className={classes.image}
      />
      <figcaption className={classes.text}>{position + 1} - {artist.name}</figcaption>
    </figure>
  );
};

export default Collage;
