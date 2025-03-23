"use client";

import { useFavoriteVideos } from "@/stores/favoriteVideosStore";
import VideoList from "@/components/videoList";
import { SkeletonCard } from "@/components/skeletonCard";
import { useEffect, useState } from "react";

export default function Favorites() {
  const { favorites } = useFavoriteVideos();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

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
      {isLoading && (
        <ul className="md:p-10 lg:px-0 mt-4 gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 justify-items-center items-center">
          {Array.from({ length: 10 }).map(() => (
            <li key={crypto.randomUUID()}>
              <SkeletonCard />
            </li>
          ))}
        </ul>
      )}
      {!isLoading && favorites.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-lg text-gray-500">
            Você ainda não favoritou nenhum vídeo. Explore e adicione seus
            favoritos!
          </p>
        </div>
      )}
      {!isLoading && favorites.length > 0 && (
        <VideoList videos={favoriteVideos} />
      )}
    </div>
  );
}
