import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useTranslation } from 'react-i18next';

import Collage from './components/Collage';

import { useAuthentication } from '../../components/Authentication';
import Button from '../../components/Button';

const useStyles = createUseStyles({
  root: {
    // display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  },
  galery: {
  },
  '@media screen and (max-width: 400px)': {
    galery: {
    }
  },
  '@media screen and (min-width: 401px)': {
    galery: {
    }
  },
  '@media screen and (min-width: 401px) and (max-width: 600px)': {
    galery: {
    }
  },
  '@media screen and (min-width: 601px) and (max-width: 800px)': {
    galery: {
    }
  },
  '@media screen and (min-width: 801px) and (max-width: 1000px)': {
    galery: {
    }
  },
  '@media screen and (min-width: 1001px)': {
    galery: {
    }
  },
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
    <div className={classes.root}>
      {!artists && (
        <Button onClick={() => getTopAlbuns()}>
          {t('GENERATE_COLLAGE')}
        </Button>
      )}
      {artists && (
        <div className={classes.galery}>
          {artists.map(item => <Collage key={item.id} artist={item} />)}
        </div>
      )}
    </div>
  );
};

export default GeneratorCollage;
