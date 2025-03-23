"use client";

import { useQuery } from "@tanstack/react-query";
import { getYoutubeVideos } from "../services/videosServices";
import CardVideo from "@/components/card-video";
import { useState } from "react";
import VideoDialog from "@/components/video-dialog";
import { SearchForm } from "@/components/search-form";
import Pagination from "@/components/paginations";
import { formatDate } from "@/utils/dateUtils";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<{
    videoId: string | null;
    title: string;
    description: string;
  }>({
    videoId: null,
    title: "",
    description: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 10;

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
    setCurrentPage(1);
  };

  if (isLoading) return <div>Carregando...</div>;
  if (isError) return <div>Erro ao carregar vídeos.</div>;

  // Filtra os vídeos com base no título
  const filteredVideos = data?.items.filter(
    (video) =>
      video.id.videoId &&
      (searchQuery === "" ||
        video.snippet.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const startIndex = (currentPage - 1) * videosPerPage;
  const currentVideos = filteredVideos?.slice(
    startIndex,
    startIndex + videosPerPage
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Vídeos do YouTube</h1>
      <SearchForm onSearch={handleSearch} />
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
      <ul className="md:p-10 lg:px-0 mt-4 gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 justify-items-center items-center">
        {currentVideos?.map((video, index) => (
          <li key={video.id.videoId || index}>
            <CardVideo
              thumbnailUrl={video.snippet.thumbnails.medium.url}
              channelTitle={video.snippet.channelTitle}
              title={video.snippet.title}
              videoId={{ videoId: video.id.videoId || "" }}
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
