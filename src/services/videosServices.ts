import axios from "axios";

const API_KEY = "AIzaSyD_jNwJhPo2iOAwxKzpEVsZieq7Iy2YIWU";

interface YoutubeResponse {
  items: Array<{
    id: { videoId?: string };
    snippet: {
      channelTitle: string;
      title: string;
      description: string;
      publishedAt: string;
      thumbnails: {
        default: { url: string };
        medium: { url: string };
        high: { url: string };
      };
    };
  }>;
}

export const getYoutubeVideos = async (params: {
  q: string;
  part?: string;
  maxResults?: number;
}): Promise<YoutubeResponse> => {
  if (!params.q) throw new Error("O parâmetro 'q' é obrigatório.");

  try {
    const response = await axios.get<YoutubeResponse>(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: { ...params, key: API_KEY },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar vídeos do YouTube:", error);
    throw error;
  }
};
