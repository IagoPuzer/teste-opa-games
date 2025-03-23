export type YoutubeResponse = {
  items: Array<{
    id: { videoId?: string };
    snippet: {
      channelTitle: string;
      title: string;
      description: string;
      publishedAt: string;
      thumbnails: {
        default: { url: string };
        medium: { url: string };
        high: { url: string };
      };
    };
  }>;
};
