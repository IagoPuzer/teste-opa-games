// src/components/VideoListContent.tsx
import CardVideo from "@/components/cardVideo";
import { SkeletonCard } from "@/components/skeletonCard";
import { Video } from "@/@types/videoSchema";

type VideoListContentProps = {
  videos: Video[];
  isLoading: boolean;
  onVideoSelect: (video: Video) => void;
};

export default function VideoListContent({
  videos,
  isLoading,
  onVideoSelect,
}: VideoListContentProps) {
  return (
    <ul className="md:p-10 lg:px-0 mt-4 gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 justify-items-center items-center">
      {isLoading
        ? Array.from({ length: 10 }).map((_, index) => (
            <li key={`skeleton-${index}`}>
              <SkeletonCard />
            </li>
          ))
        : videos.map((video, index) => (
            <li key={`${video.videoId}-${index}`}>
              <CardVideo
                thumbnailUrl={video.thumbnailUrl}
                channelTitle={video.channelTitle}
                title={video.title}
                videoId={{ videoId: video.videoId || "" }}
                description={video.description}
                views={video.views}
                uploadDate={video.uploadDate}
                onClick={() => onVideoSelect(video)}
              />
            </li>
          ))}
    </ul>
  );
}
