"use client";

import { useQuery } from "@tanstack/react-query";
import { getYoutubeVideos } from "../services/videosServices";
import { useState } from "react";
import { SearchForm } from "@/components/searchForm";
import Pagination from "@/components/paginations";
import { formatDate } from "@/utils/dateUtils";
import VideoList from "@/components/videoList";
import SomethingWrong from "@/components/somethingWrong";
import { YoutubeResponse } from "@/@types/youtubeResponseSchema";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
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

  if (isError) return <SomethingWrong />;

  // Filtra os vídeos com base no título
  const filteredVideos = data?.items.filter(
    (video) =>
      video.id.videoId &&
      (searchQuery === "" ||
        video.snippet.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const startIndex = (currentPage - 1) * videosPerPage;
  const currentVideos = filteredVideos
    ?.slice(startIndex, startIndex + videosPerPage)
    .map((video) => ({
      videoId: video.id.videoId || null,
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnailUrl: video.snippet.thumbnails.medium.url,
      channelTitle: video.snippet.channelTitle,
      views: Math.floor(Math.random() * 10000),
      uploadDate: formatDate(video.snippet.publishedAt),
    }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Vídeos do YouTube</h1>
      <SearchForm onSearch={handleSearch} />
      <VideoList videos={currentVideos || []} isLoading={isLoading} />
      <Pagination
        currentPage={currentPage}
        totalItems={filteredVideos?.length || 0}
        itemsPerPage={videosPerPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
