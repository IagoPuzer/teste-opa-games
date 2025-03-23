import axios from "axios";
import { YoutubeResponse } from "@/@types/youtubeResponseSchema";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

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
        params: { ...params, key: apiKey },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar vídeos do YouTube:", error);
    throw error;
  }
};
