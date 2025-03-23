import CardVideo from "@/components/cardVideo";
import VideoDialog from "@/components/videoDialog";
import { useState } from "react";

type Video = {
  videoId: string | null;
  title: string;
  description: string;
  thumbnailUrl: string;
  channelTitle: string;
  views: number;
  uploadDate: string;
};

type VideoListProps = {
  videos: Video[];
};

export default function VideoList({ videos }: VideoListProps) {
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
    <div>
      <ul className="md:p-10 lg:px-0 mt-4 gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 justify-items-center items-center">
        {videos.map((video, index) => (
          <li key={`${video.videoId}-${index}`}>
            <CardVideo
              thumbnailUrl={video.thumbnailUrl}
              channelTitle={video.channelTitle}
              title={video.title}
              videoId={{ videoId: video.videoId || "" }}
              description={video.description}
              views={video.views}
              uploadDate={video.uploadDate}
              onClick={() =>
                setSelectedVideo({
                  videoId: video.videoId || null,
                  title: video.title,
                  description: video.description,
                })
              }
            />
          </li>
        ))}
      </ul>
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
