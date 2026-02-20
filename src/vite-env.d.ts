/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SPOTIFY_URL: string;
  readonly VITE_SPOTIFY_CLIENTID: string;
  readonly VITE_SPOTIFY_REDIRECTURI: string;
  readonly VITE_SPOTIFY_SCOPE: string;
  readonly VITE_YOUTUBE_URL: string;
  readonly VITE_YOUTUBE_CLIENTID: string;
  readonly VITE_YOUTUBE_REDIRECTURI: string;
  readonly VITE_YOUTUBE_SCOPE: string;
  readonly VITE_DEEZER_URL: string;
  readonly VITE_DEEZER_CLIENTID: string;
  readonly VITE_DEEZER_REDIRECTURI: string;
  readonly VITE_DEEZER_SCOPE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
