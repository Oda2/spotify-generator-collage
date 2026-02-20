import * as React from 'react';
import { Music, Radio, Disc } from 'lucide-react';

export type Platform = 'spotify' | 'youtube' | 'deezer';

interface PlatformOption {
  id: Platform;
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}

const platforms: PlatformOption[] = [
  {
    id: 'spotify',
    name: 'Spotify',
    icon: <Disc className="w-8 h-8" />,
    color: 'from-spotify to-spotify-light',
    description: 'Conecte-se com sua conta Spotify',
  },
  {
    id: 'youtube',
    name: 'YouTube Music',
    icon: <Radio className="w-8 h-8" />,
    color: 'from-youtube to-red-600',
    description: 'Conecte-se com sua conta YouTube Music',
  },
  {
    id: 'deezer',
    name: 'Deezer',
    icon: <Music className="w-8 h-8" />,
    color: 'from-deezer to-orange-600',
    description: 'Conecte-se com sua conta Deezer',
  },
];

interface PlatformSelectorProps {
  onSelect: (selectedPlatform: Platform) => void;
  selectedPlatform?: Platform;
}

const PlatformSelector: React.FC<PlatformSelectorProps> = ({ onSelect, selectedPlatform }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl px-4">
      {platforms.map((plat) => (
        <button
          key={plat.id}
          onClick={() => onSelect(plat.id)}
          className={`
            relative group p-10 rounded-2xl transition-all duration-500 transform hover:scale-105
            ${selectedPlatform === plat.id
            ? `bg-gradient-to-br ${plat.color} shadow-2xl scale-105`
            : 'glass-effect hover:bg-white/20'
            }
          `}
        >
          <div className="flex flex-col items-center text-center space-y-5">
            <div className={`
              p-5 rounded-full transition-all duration-300
              ${selectedPlatform === plat.id
              ? 'bg-white/20'
              : `bg-gradient-to-br ${plat.color} group-hover:scale-110`
              }
            `}>
              {plat.icon}
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">{plat.name}</h3>
              <p className="text-sm text-gray-300 leading-relaxed">{plat.description}</p>
            </div>
          </div>

          {selectedPlatform === plat.id && (
            <div className="absolute inset-0 rounded-2xl ring-4 ring-white/50 animate-pulse" />
          )}
        </button>
      ))}
    </div>
  );
};

export { platforms };
export default PlatformSelector;
