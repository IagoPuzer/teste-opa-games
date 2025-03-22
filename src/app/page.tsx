"use client";

import { useQuery } from "@tanstack/react-query";
import { getYoutubeVideos } from "../services/videosServices";
import CardVideo from "@/components/card-video";
import { useState } from "react";
import VideoDialog from "@/components/video-dialog";
import { SearchForm } from "@/components/search-form";
import Pagination from "@/components/paginations"; // Importa o componente de paginação

type Video = {
  id: { videoId?: string };
  snippet: {
    channelTitle: string;
    title: string;
    description: string;
    publishedAt: string;
    thumbnails: { medium: { url: string } };
  };
};

type YoutubeResponse = {
  items: Video[];
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState(""); // Inicializa com uma string vazia
  const [selectedVideo, setSelectedVideo] = useState<{
    videoId: string | null;
    title: string;
    description: string;
  }>({
    videoId: null,
    title: "",
    description: "",
  });
  const [currentPage, setCurrentPage] = useState(1); // Estado para a página atual
  const videosPerPage = 10; // Número de vídeos por página

  const { data, isLoading, isError } = useQuery<YoutubeResponse>({
    queryKey: ["youtubeVideos"],
    queryFn: () =>
      getYoutubeVideos({
        q: "react tutorials",
        part: "snippet",
        maxResults: 50,
      }),
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query.trim());
    setCurrentPage(1); // Reseta para a primeira página ao realizar uma busca
  };

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  }

  const handleFavorite = () => {
    if (selectedVideo.videoId) {
      console.log(`Vídeo ${selectedVideo.videoId} favoritado!`);
      alert(`Vídeo ${selectedVideo.title} foi adicionado aos favoritos.`);
    }
  };

  if (isLoading) return <div>Carregando...</div>;
  if (isError) return <div>Erro ao carregar vídeos.</div>;

  // Filtra os vídeos com base no título
  const filteredVideos = data?.items.filter(
    (video) =>
      video.id.videoId && // Garante que o vídeo tenha videoId
      (searchQuery === "" || // Exibe todos os vídeos se a busca estiver vazia
        video.snippet.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Calcula os vídeos da página atual
  const startIndex = (currentPage - 1) * videosPerPage;
  const currentVideos = filteredVideos?.slice(
    startIndex,
    startIndex + videosPerPage
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Vídeos do YouTube</h1>
      <SearchForm onSearch={handleSearch} />
      <VideoDialog
        videoId={selectedVideo.videoId}
        title={selectedVideo.title}
        description={selectedVideo.description}
        onClose={() => {
          setSelectedVideo({ videoId: null, title: "", description: "" });
        }}
        onFavorite={handleFavorite}
        aria-hidden={!selectedVideo.videoId}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      />
      <ul className="md:p-10 lg:px-0 mt-4 gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 justify-items-center items-center">
        {currentVideos?.map((video, index) => (
          <li key={video.id.videoId || index}>
            <CardVideo
              thumbnailUrl={video.snippet.thumbnails.medium.url}
              channelTitle={video.snippet.channelTitle}
              title={video.snippet.title}
              description={video.snippet.description}
              views={Math.floor(Math.random() * 10000)}
              uploadDate={formatDate(video.snippet.publishedAt)}
              onClick={() =>
                setSelectedVideo({
                  videoId: video.id.videoId || null,
                  title: video.snippet.title,
                  description: video.snippet.description,
                })
              }
            />
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalItems={filteredVideos?.length || 0}
        itemsPerPage={videosPerPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
