import { MusicServiceAdapter, UserTopArtistsResponse, Artist } from '../musicTypes';

/**
 * YouTube Music Adapter
 *
 * NOTA: YouTube Music não possui uma API pública oficial para acessar
 * dados pessoais do usuário (histórico, artistas favoritos, etc).
 *
 * Esta implementação utiliza:
 1. YouTube Data API v3 para buscar informações de vídeos musicais
 * 2. OAuth 2.0 para autenticação
 * 3. Busca de vídeos "gostados" do usuário como alternativa
 *
 * Limitações:
 * - Não é possível obter histórico de reprodução diretamente
 * - Usamos a lista de vídeos "gostados" como proxy para artistas favoritos
 * - É necessário que o usuário tenha vídeos curtidos no YouTube
 */
export class YouTubeMusicAdapter implements MusicServiceAdapter {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  /**
   * Obtém vídeos "gostados" do usuário e extrai artistas
   * YouTube API endpoint: /videos?myRating=like
   */
  async getTopArtists(limit: number = 50): Promise<UserTopArtistsResponse> {
    // Buscar vídeos curtidos pelo usuário
    const likedVideosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&myRating=like&maxResults=${limit}`,
      {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
        },
      }
    );

    if (!likedVideosResponse.ok) {
      throw new Error(`YouTube API error: ${likedVideosResponse.status}`);
    }

    const likedVideos = await likedVideosResponse.json();

    // Extrair artistas dos títulos dos vídeos
    const artists = this.extractArtistsFromVideos(likedVideos.items);

    return {
      items: artists.slice(0, limit),
      total: artists.length,
      limit: limit,
      offset: 0,
    };
  }

  /**
   * Busca vídeos musicais baseado em uma query
   * Útil para buscar artistas específicos
   */
  async searchMusicVideos(query: string, limit: number = 10) {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoCategoryId=10&q=${encodeURIComponent(query)}&maxResults=${limit}`,
      {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    return await response.json();
  }

  /**
   * Obtém playlists do usuário que possam conter músicas
   */
  async getUserPlaylists(limit: number = 50) {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&mine=true&maxResults=${limit}`,
      {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }
    return await response.json();
  }

  async getUserProfile() {
    const response = await fetch(
      'https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true',
      {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data = await response.json();
    const channel = data.items[0];

    return {
      id: channel.id,
      display_name: channel.snippet.title,
      images: channel.snippet.thumbnails
        ? [{ url: channel.snippet.thumbnails.default?.url }]
        : [],
    };
  }

  /**
   * Extrai artistas dos vídeos do YouTube
   * Tenta identificar o artista pelo título do vídeo (formato comum: "Artist - Song")
   */
  private extractArtistsFromVideos(videos: any[]): Artist[] {
    const artistMap = new Map<string, Artist>();

    videos.forEach((video, index) => {
      const title = video.snippet.title;
      const artistName = this.extractArtistFromTitle(title);

      if (artistName && !artistMap.has(artistName)) {
        const thumbnails = video.snippet.thumbnails;
        artistMap.set(artistName, {
          id: `youtube_${video.id}`,
          name: artistName,
          images: thumbnails
            ? [
              { url: thumbnails.high?.url || thumbnails.medium?.url || thumbnails.default?.url },
            ]
            : [],
          external_urls: {
            youtube: `https://www.youtube.com/watch?v=${video.id}`,
          },
        });
      }
    });

    return Array.from(artistMap.values());
  }

  /**
   * Tenta extrair o nome do artista do título do vídeo
   * Padrões comuns: "Artist - Song", "Artist | Song", "Artist: Song"
   */
  private extractArtistFromTitle(title: string): string | null {
    // Remove textos entre parênteses e colchetes
    const cleanTitle = title.replace(/[\(\[].*?[\)\]]/g, '').trim();

    // Padrões comuns
    const separators = [' - ', ' | ', ' : ', ' – ', ' — '];

    for (const separator of separators) {
      const parts = cleanTitle.split(separator);
      if (parts.length >= 2) {
        // Geralmente o artista vem primeiro
        return parts[0].trim();
      }
    }

    // Se não encontrou separador, retorna o título completo (pode ser uma performance ao vivo, etc)
    return cleanTitle;
  }
}
