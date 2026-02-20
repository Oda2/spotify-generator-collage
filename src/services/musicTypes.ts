// Tipos comuns para todos os serviços de música
export interface Artist {
  id: string;
  name: string;
  images: { url: string; height?: number; width?: number }[];
  external_urls: { spotify?: string; youtube?: string; deezer?: string };
  genres?: string[];
  popularity?: number;
}

export interface Track {
  id: string;
  name: string;
  artists: Artist[];
  album?: {
    name: string;
    images: { url: string; height?: number; width?: number }[];
  };
  duration_ms?: number;
  external_urls: { spotify?: string; youtube?: string; deezer?: string };
}

export interface UserTopArtistsResponse {
  items: Artist[];
  total: number;
  limit: number;
  offset: number;
}

export interface MusicServiceAdapter {
  getTopArtists(limit?: number, timeRange?: string): Promise<UserTopArtistsResponse>;
  getTopTracks?(limit?: number, timeRange?: string): Promise<{ items: Track[] }>;
  getUserProfile?(): Promise<{ id: string; display_name: string; images?: { url: string }[] }>;
}

export type TimeRange = 'short_term' | 'medium_term' | 'long_term';

export interface PlatformConfig {
  name: string;
  authUrl: string;
  clientId: string;
  redirectUri: string;
  scopes: string[];
}
