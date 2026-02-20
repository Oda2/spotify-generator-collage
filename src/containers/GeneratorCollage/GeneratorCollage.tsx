import * as React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageIcon } from 'lucide-react';

import Collage from './components/Collage/Collage.tsx';
import { useAuthentication } from '../../components/Authentication/index.ts';
import Button from '../../components/Button/Button.tsx';

const GeneratorCollage = () => {
  const { t } = useTranslation();
  const [artists, setArtists] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const { access_token } = useAuthentication();

  const getTopAlbuns = async () => {
    setLoading(true);
    const limit = 50;
    const timeRange = 'long_term';

    try {
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
    } catch (error) {
      console.error('Error fetching artists:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      {!artists ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
          <div className="text-center space-y-4">
            <div className="inline-flex p-4 bg-gradient-to-br from-spotify to-spotify-light rounded-2xl shadow-lg shadow-spotify/30">
              <ImageIcon className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {t('GENERATE_COLLAGE')}
            </h2>
            <p className="text-gray-400 max-w-md">
              Clique no botão abaixo para gerar uma colagem com seus artistas mais ouvidos
            </p>
          </div>

          <Button
            onClick={getTopAlbuns}
            disabled={loading}
            size="lg"
          >
            {loading ? 'Carregando...' : t('GENERATE_COLLAGE')}
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Sua Colagem
            </h2>
            <Button variant="secondary" onClick={() => setArtists(null)} size="sm">
              Gerar Nova
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {artists.map((item, index) => (
              <div
                key={item.id}
                className="transform transition-all duration-300 hover:scale-105 hover:z-10"
              >
                <Collage position={index} artist={item} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneratorCollage;
