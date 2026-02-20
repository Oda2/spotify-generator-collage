import { MusicServiceAdapter, UserTopArtistsResponse, Artist } from '../musicTypes';

export class SpotifyAdapter implements MusicServiceAdapter {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  async getTopArtists(limit: number = 50, timeRange: string = 'long_term'): Promise<UserTopArtistsResponse> {
    const response = await fetch(
      `https://api.spotify.com/v1/me/top/artists?limit=${limit}&time_range=${timeRange}`,
      {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.status}`);
    }

    const data = await response.json();

    return {
      items: data.items.map(this.mapSpotifyArtist),
      total: data.total,
      limit: data.limit,
      offset: data.offset,
    };
  }

  async getTopTracks(limit: number = 50, timeRange: string = 'long_term') {
    const response = await fetch(
      `https://api.spotify.com/v1/me/top/tracks?limit=${limit}&time_range=${timeRange}`,
      {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.status}`);
    }

    return await response.json();
  }

  async getUserProfile() {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.status}`);
    }

    return await response.json();
  }

  private mapSpotifyArtist(item: any): Artist {
    return {
      id: item.id,
      name: item.name,
      images: item.images || [],
      external_urls: {
        spotify: item.external_urls?.spotify,
      },
      genres: item.genres,
      popularity: item.popularity,
    };
  }
}
