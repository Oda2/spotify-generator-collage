import { MusicServiceAdapter, UserTopArtistsResponse, Artist } from '../musicTypes';

export class DeezerAdapter implements MusicServiceAdapter {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  async getTopArtists(limit: number = 50): Promise<UserTopArtistsResponse> {
    // Deezer API: https://developers.deezer.com/api/user/artists
    const response = await fetch(
      `https://api.deezer.com/user/me/artists?limit=${limit}&access_token=${this.accessToken}`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) {
      throw new Error(`Deezer API error: ${response.status}`);
    }

    const data = await response.json();

    return {
      items: data.data.map(this.mapDeezerArtist),
      total: data.total,
      limit: data.limit || limit,
      offset: 0,
    };
  }

  async getTopTracks(limit: number = 50) {
    // Deezer API: https://developers.deezer.com/api/user/history
    const response = await fetch(
      `https://api.deezer.com/user/me/history?limit=${limit}&access_token=${this.accessToken}`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) {
      throw new Error(`Deezer API error: ${response.status}`);
    }

    const data = await response.json();

    // Extrair artistas únicos das tracks
    const artistMap = new Map();
    data.data.forEach((track: any) => {
      if (track.artist && !artistMap.has(track.artist.id)) {
        artistMap.set(track.artist.id, this.mapDeezerArtist(track.artist));
      }
    });

    return {
      items: Array.from(artistMap.values()).slice(0, limit),
    };
  }

  async getUserProfile() {
    const response = await fetch(
      `https://api.deezer.com/user/me?access_token=${this.accessToken}`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) {
      throw new Error(`Deezer API error: ${response.status}`);
    }

    return await response.json();
  }

  private mapDeezerArtist(item: any): Artist {
    return {
      id: item.id.toString(),
      name: item.name,
      images: item.picture
        ? [
          { url: item.picture, height: 250, width: 250 },
          { url: item.picture_big, height: 500, width: 500 },
          { url: item.picture_medium, height: 250, width: 250 },
          { url: item.picture_small, height: 56, width: 56 },
        ]
        : [],
      external_urls: {
        deezer: item.link,
      },
    };
  }
}
