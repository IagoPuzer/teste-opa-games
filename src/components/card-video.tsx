"use client";

import type React from "react";
import { useState, useEffect } from "react";

import Image from "next/image";
import { useFavoriteVideos } from "@/stores/favoriteVideosStore";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

interface CardVideoProps {
  thumbnailUrl: string;
  title: string;
  videoId: { videoId: string };
  description: string;
  views: number;
  uploadDate: string;
  channelTitle: string;
  onClick?: () => void;
}

export default function CardVideo({
  thumbnailUrl,
  title,
  views,
  channelTitle,
  uploadDate,
  description,
  videoId,
  onClick,
}: CardVideoProps) {
  const { addFavoriteVideo, removeFavoriteVideo, favorites } =
    useFavoriteVideos();

  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const favorited = favorites.some(
      (favorite) => favorite.videoId.videoId === videoId.videoId
    );
    setIsFavorited(favorited);
  }, [favorites, videoId.videoId]);

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isFavorited) {
      removeFavoriteVideo(videoId.videoId);
      setIsFavorited(false);
      console.log(`Vídeo "${title}" foi removido dos favoritos.`);
    } else {
      addFavoriteVideo({
        videoId,
        title,
        description,
        thumbnailUrl,
        channelTitle,
        views,
        uploadDate,
      });
      setIsFavorited(true);
      console.log(`Vídeo "${title}" foi adicionado aos favoritos.`);
    }
  };

  return (
    <div className="flex flex-col w-full h-[250px] max-w-[360px] group relative">
      <div
        className="flex flex-col w-full h-full cursor-pointer"
        onClick={() => onClick?.()}
      >
        <div className="mb-3 relative overflow-hidden rounded-md">
          <Image
            src={thumbnailUrl || "/placeholder.svg"}
            alt={`Thumbnail do vídeo: ${title}`}
            width={600}
            height={600}
            priority
            className="rounded-md object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-col w-full justify-start items-start">
          <h3 className="text-start font-medium text-sm line-clamp-2 mb-1">
            {title}
          </h3>
          <p className="text-gray-600 text-xs mb-1">{channelTitle}</p>
          <div className="text-gray-600 text-xs">
            <span>{views.toLocaleString("pt-BR")} visualizações</span>
            <span className="mx-1">•</span>
            <span>{uploadDate}</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleFavorite}
        className="absolute top-2 right-2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all duration-200 hover:scale-110"
        aria-label={
          isFavorited ? "Remover dos favoritos" : "Adicionar aos favoritos"
        }
      >
        {isFavorited ? (
          <MdFavorite className="text-red-500 text-xl active:scale-200 transition-transform duration-500" />
        ) : (
          <MdFavoriteBorder className="text-gray-700 text-xl active:scale-200 transition-transform duration-500" />
        )}
      </button>
    </div>
  );
}
