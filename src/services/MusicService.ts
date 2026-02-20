import { Platform } from '../../components/PlatformSelector/PlatformSelector';
import { MusicServiceAdapter, UserTopArtistsResponse } from './musicTypes';
import { SpotifyAdapter } from './adapters/SpotifyAdapter';
import { DeezerAdapter } from './adapters/DeezerAdapter';
import { YouTubeMusicAdapter } from './adapters/YouTubeMusicAdapter';

/**
 * MusicService - Facade para acesso a diferentes plataformas de música
 *
 * Usage:
 * const service = MusicService.create('spotify', accessToken);
 * const topArtists = await service.getTopArtists(50);
 */
export class MusicService {
  private adapter: MusicServiceAdapter;
  private platform: Platform;

  constructor(platform: Platform, accessToken: string) {
    this.platform = platform;
    this.adapter = this.createAdapter(platform, accessToken);
  }

  static create(platform: Platform, accessToken: string): MusicService {
    return new MusicService(platform, accessToken);
  }

  private createAdapter(platform: Platform, accessToken: string): MusicServiceAdapter {
    switch (platform) {
      case 'spotify':
        return new SpotifyAdapter(accessToken);
      case 'deezer':
        return new DeezerAdapter(accessToken);
      case 'youtube':
        return new YouTubeMusicAdapter(accessToken);
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }
  }

  async getTopArtists(limit?: number, timeRange?: string): Promise<UserTopArtistsResponse> {
    return this.adapter.getTopArtists(limit, timeRange);
  }

  async getTopTracks(limit?: number, timeRange?: string) {
    if (this.adapter.getTopTracks) {
      return this.adapter.getTopTracks(limit, timeRange);
    }
    throw new Error(`getTopTracks not supported for ${this.platform}`);
  }

  async getUserProfile() {
    if (this.adapter.getUserProfile) {
      return this.adapter.getUserProfile();
    }
    throw new Error(`getUserProfile not supported for ${this.platform}`);
  }

  getPlatform(): Platform {
    return this.platform;
  }
}

// Export types
export * from './musicTypes';
export { SpotifyAdapter, DeezerAdapter, YouTubeMusicAdapter } from './adapters';
