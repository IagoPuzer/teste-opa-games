import { useState } from "react";

export type SelectedVideo = {
  videoId: string | null;
  title: string;
  description: string;
};

export function useSelectedVideo() {
  const [selectedVideo, setSelectedVideo] = useState<SelectedVideo>({
    videoId: null,
    title: "",
    description: "",
  });

  const clearSelectedVideo = () => {
    setSelectedVideo({ videoId: null, title: "", description: "" });
  };

  return { selectedVideo, setSelectedVideo, clearSelectedVideo };
}
