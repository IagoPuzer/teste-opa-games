// src/components/videoList.tsx
import VideoDialog from "@/components/videoDialog";
import VideoListContent from "@/components/videoListContent";
import { useSelectedVideo } from "@/hooks/useSelectedVideo";
import { Video } from "@/@types/videoSchema";

type VideoListProps = {
  videos: Video[];
  isLoading?: boolean;
};

export default function VideoList({
  videos,
  isLoading = false,
}: VideoListProps) {
  const { selectedVideo, setSelectedVideo, clearSelectedVideo } =
    useSelectedVideo();

  return (
    <div>
      <VideoListContent
        videos={videos}
        isLoading={isLoading}
        onVideoSelect={(video) =>
          setSelectedVideo({
            videoId: video.videoId || null,
            title: video.title,
            description: video.description,
          })
        }
      />
      <VideoDialog
        videoId={selectedVideo.videoId}
        title={selectedVideo.title}
        onClose={clearSelectedVideo}
        aria-hidden={!selectedVideo.videoId}
        aria-labelledby="Video Dialog"
        aria-describedby="Modal para exibição do video selecionado"
      />
    </div>
  );
}
