import { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Headphones, Sparkles } from 'lucide-react';
import PlatformSelector, { Platform } from '../../components/PlatformSelector/PlatformSelector.tsx';
import LoginModal from './LoginModal.tsx';
import AuthenticationContext from '../../components/Authentication/AuthenticationContext.tsx';

const Login = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const authContext = useContext(AuthenticationContext);
  const { t } = useTranslation('common');

  const handleModalConfirm = () => {
    if (selectedPlatform && authContext?.handleSignIn) {
      authContext.handleSignIn();
      setIsModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-spotify/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-spotify-light/10 rounded-full blur-3xl animate-float" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 relative z-10">
        <div className="text-center space-y-8 max-w-4xl">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-gradient-to-br from-spotify to-spotify-light rounded-3xl shadow-2xl shadow-spotify/50 animate-float">
                <Headphones className="w-16 h-16 text-white" />
              </div>
            </div>

            <h1 className="text-6xl md:text-7xl font-black text-gradient leading-tight">
              Music Collage
              <br />
              <span className="text-white">Generator</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Crie colagens incríveis com seus artistas e músicas favoritos de qualquer plataforma
            </p>
          </div>

          {/* Platform Selector */}
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-2 text-gray-400">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm uppercase tracking-widest">Escolha sua plataforma</span>
              <Sparkles className="w-5 h-5" />
            </div>

            <PlatformSelector
              onSelect={(platform) => {
                setSelectedPlatform(platform);
                setIsModalOpen(true);
              }}
              selectedPlatform={selectedPlatform || undefined}
            />
          </div>
        </div>

        {/* Login Modal */}
        {selectedPlatform && (
          <LoginModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedPlatform(null);
            }}
            onConfirm={handleModalConfirm}
            platform={selectedPlatform}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="py-8 text-gray-500 text-sm relative z-10">
        <p>{t('SUPPORTED_PLATFORMS')}</p>
        <p className="mt-1">© 2026 Music Collage Generator</p>
      </footer>
    </div>
  );
};

export default Login;
