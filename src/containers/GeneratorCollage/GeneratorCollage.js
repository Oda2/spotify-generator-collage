import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useTranslation } from 'react-i18next';

import Collage from './components/Collage';

import { useAuthentication } from '../../components/Authentication';
import Button from '../../components/Button';

const useStyles = createUseStyles({
  root: {
    padding: '5%'
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  },
  galery: {
    display: 'flex',
    flexWrap: 'wrap',
    width: 'calc(100% + 24px)',
    margin: '-12px'
  },
  item: {
    flexGrow: 0,
    maxWidth: '20%',
    flexBasis: '20%',
    margin: 0,
    '&:hover': {
      zIndex: 1000
    }
  },
  '@media (max-width: 600px)': {
    item: {
      maxWidth: '80%',
      flexBasis: '80%',
      margin: 20
    }
  },
  '@media screen and (min-width: 600px) and (max-width: 900px)': {
    item: {
      maxWidth: '50%',
      flexBasis: '50%'
    }
  },
  '@media (min-width:900px)': {
    item: {
      maxWidth: '20%',
      flexBasis: '20%',
    }
  }
});

const GeneratorCollage = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [artists, setArtists] = useState(null);
  const { access_token } = useAuthentication();

  const getTopAlbuns = async () => {
    const limit = 50;
    const timeRange = 'long_term'; // 6 months medium_term - 4 weeks short_term

    const res = await fetch(`https://api.spotify.com/v1/me/top/artists?limit=${limit}&time_range=${timeRange}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${access_token}`
      },
    });

    if (res.ok) {
      const data = await res.json();
      setArtists(data.items);
    }
  };

  return (
    <>
      {!artists && (
        <div className={classes.button}>
          <Button onClick={() => getTopAlbuns()}>
            {t('GENERATE_COLLAGE')}
          </Button>
        </div>
      )}
      {artists && (
        <div className={classes.root}>
          <div className={classes.galery}>
            {artists.map((item, index) => (
              <div key={item.id} className={classes.item}>
                <Collage position={index} artist={item} />
              </div>
            ))
            }
          </div>
        </div>
      )}
    </>
  );
};

export default GeneratorCollage;
