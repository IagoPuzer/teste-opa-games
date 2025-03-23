"use client";

import { useFavoriteVideos } from "@/stores/favoriteVideosStore";
import VideoList from "@/components/video-list";

export default function Favorites() {
  const { favorites } = useFavoriteVideos();

  const favoriteVideos = favorites.map((video) => ({
    videoId: video.videoId.videoId || null,
    title: video.title,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl,
    channelTitle: video.channelTitle,
    views: video.views,
    uploadDate: video.uploadDate,
  }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Vídeos Favoritos</h1>
      {favorites.length === 0 ? (
        <p>Nenhum vídeo favoritado.</p>
      ) : (
        <VideoList videos={favoriteVideos} />
      )}
    </div>
  );
}
