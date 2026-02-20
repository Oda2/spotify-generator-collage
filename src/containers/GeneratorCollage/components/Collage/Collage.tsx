import * as React from 'react';

interface CollageProps {
  position: number;
  artist: {
    id: string;
    name: string;
    images: { url: string }[];
    external_urls: {
      spotify: string;
    };
  };
}

const Collage: React.FC<CollageProps> = ({ position, artist }) => {
  const rotation = Math.random() * 41 - 10;
  const depth = Math.floor(Math.random() * 256);

  const handleOpenItem = () => {
    window.open(artist.external_urls.spotify);
  };

  return (
    <figure
      className="bg-white rounded shadow-lg p-3 cursor-pointer transition-all duration-100 hover:scale-110 hover:rotate-0 hover:z-50 hover:shadow-2xl"
      style={{
        transform: `rotateZ(${rotation}deg)`,
        zIndex: depth,
      }}
      onClick={handleOpenItem}
      role="presentation"
    >
      <img
        src={artist.images[0].url}
        alt={artist.name}
        className="w-full h-auto rounded"
      />
      <figcaption className="mt-2 text-center font-bold text-gray-800 text-sm md:text-base" style={{ fontFamily: 'Indie Flower, cursive' }}>
        {position + 1} - {artist.name}
      </figcaption>
    </figure>
  );
};

export default Collage;
