import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { X, AlertTriangle, Clock } from 'lucide-react';
import Button from '../../components/Button/Button.tsx';
import { Platform } from '../../components/PlatformSelector/PlatformSelector.tsx';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  platform: Platform;
}

const platformInfo: Record<Platform, { name: string; color: string }> = {
  spotify: { name: 'Spotify', color: '#1DB954' },
  youtube: { name: 'YouTube Music', color: '#FF0000' },
  deezer: { name: 'Deezer', color: '#A238FF' },
};

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onConfirm, platform }) => {
  const { t } = useTranslation('common');

  if (!isOpen) {
    return null;
  }

  const info = platformInfo[platform];
  const isSpotify = platform === 'spotify';
  const isUnavailable = platform === 'youtube' || platform === 'deezer';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-gray-900 border border-gray-700 rounded-2xl p-12 max-w-lg w-full shadow-2xl animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-8">

          <div
            className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: info.color + '20', border: `2px solid ${info.color}` }}
          >
            <span className="text-4xl font-bold" style={{ color: info.color }}>
              {info.name.charAt(0)}
            </span>
          </div>

          <div className="space-y-3 px-2">
            <h3 className="text-2xl font-bold text-white">
              {info.name}
            </h3>
            <p className="text-gray-400 text-base leading-relaxed">
              {isSpotify
                ? t('SPOTIFY_RESTRICTION_MESSAGE')
                : `Você será redirecionado para fazer login com sua conta ${info.name}. Precisamos de acesso para gerar suas colagens.`
              }
            </p>
          </div>

          {isSpotify && (
            <div className="bg-red-900/30 border border-red-700/50 rounded-xl p-6 text-left">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                <div className="space-y-3">
                  <p className="text-red-200 text-base font-medium">
                    {t('SPOTIFY_RESTRICTION_TITLE')}
                  </p>
                  <a
                    href="https://developer.spotify.com/blog/2026-02-06-update-on-developer-access-and-platform-security"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-spotify hover:underline text-sm block"
                  >
                    {t('SPOTIFY_RESTRICTION_LINK')}
                  </a>
                </div>
              </div>
            </div>
          )}

          {isUnavailable && (
            <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-xl p-6 text-left">
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <p className="text-yellow-200 text-base font-medium">
                    {t('NOT_INTEGRATED_TITLE')}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {t('NOT_INTEGRATED_MESSAGE')}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <Button
              variant="secondary"
              size="lg"
              onClick={onClose}
              className="flex-1"
            >
              {t('CLOSE')}
            </Button>
            {!isUnavailable && (
              <Button
                variant={platform}
                size="lg"
                onClick={onConfirm}
                className="flex-1"
                disabled={isSpotify}
              >
                {isSpotify ? t('SPOTIFY_UNAVAILABLE') : t('LOGIN')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
