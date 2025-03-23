"use client";

import { useFavoriteVideos } from "@/stores/favoriteVideosStore";
import CardVideo from "@/components/card-video"; // Importa o componente CardVideo
import { useState } from "react"; // Importa o useState para gerenciar o estado do vídeo selecionado
import VideoDialog from "@/components/video-dialog"; // Importa o componente VideoDialog

export default function Favorites() {
  const { favorites } = useFavoriteVideos(); // Obtém os vídeos favoritos da store
  const [selectedVideo, setSelectedVideo] = useState<{
    videoId: string | null;
    title: string;
    description: string;
  }>({
    videoId: null,
    title: "",
    description: "",
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Vídeos Favoritos</h1>
      {favorites.length === 0 ? (
        <p>Nenhum vídeo favoritado.</p>
      ) : (
        <ul className="md:p-10 lg:px-0 mt-4 gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 justify-items-center items-center">
          {favorites.map((video, index) => (
            <li key={`${video.videoId.videoId}-${index}`}>
              <CardVideo
                thumbnailUrl={video.thumbnailUrl}
                channelTitle={video.channelTitle}
                title={video.title}
                videoId={video.videoId}
                description={video.description}
                views={video.views}
                uploadDate={video.uploadDate}
                onClick={() =>
                  setSelectedVideo({
                    videoId: video.videoId.videoId || null,
                    title: video.title,
                    description: video.description,
                  })
                }
              />
            </li>
          ))}
        </ul>
      )}
      <VideoDialog
        videoId={selectedVideo.videoId}
        title={selectedVideo.title}
        onClose={() => {
          setSelectedVideo({ videoId: null, title: "", description: "" });
        }}
        aria-hidden={!selectedVideo.videoId}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      />
    </div>
  );
}
