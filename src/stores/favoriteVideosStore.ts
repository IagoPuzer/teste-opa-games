import { Store } from "@tanstack/store";
import { useEffect, useState } from "react";

interface FavoriteVideo {
  videoId: { videoId: string };
  title: string;
  description: string;
  thumbnailUrl: string;
  channelTitle: string;
  views: number;
  uploadDate: string;
}

interface FavoriteVideosState {
  favorites: FavoriteVideo[];
}

// Inicializa a store com um estado vazio
export const favoriteVideosStore = new Store<FavoriteVideosState>({
  favorites: [],
});

// Função para salvar os favoritos no localStorage
function saveFavoritesToLocalStorage(favorites: FavoriteVideo[]) {
  localStorage.setItem("favoriteVideos", JSON.stringify(favorites));
}

// Função para carregar os favoritos do localStorage
function loadFavoritesFromLocalStorage(): FavoriteVideo[] {
  const storedFavorites = localStorage.getItem("favoriteVideos");
  return storedFavorites ? JSON.parse(storedFavorites) : [];
}

// Função para adicionar um vídeo aos favoritos
export function addFavoriteVideo(video: FavoriteVideo) {
  favoriteVideosStore.setState((state) => {
    const isAlreadyFavorited = state.favorites.some(
      (favorite) => favorite.videoId.videoId === video.videoId.videoId
    );

    if (isAlreadyFavorited) {
      console.warn(`O vídeo "${video.title}" já está nos favoritos.`);
      return state;
    }

    // Mantém todas as informações do vídeo ao adicioná-lo
    const updatedFavorites = [...state.favorites, video];
    saveFavoritesToLocalStorage(updatedFavorites);
    return { favorites: updatedFavorites };
  });
}

// Função para remover um vídeo dos favoritos
export function removeFavoriteVideo(videoId: string) {
  favoriteVideosStore.setState((state) => {
    const updatedFavorites = state.favorites.filter(
      (favorite) => favorite.videoId.videoId !== videoId
    );
    saveFavoritesToLocalStorage(updatedFavorites);
    return { favorites: updatedFavorites };
  });
}

// Hook para acessar o estado da store
export function useFavoriteVideos() {
  const [favorites, setFavorites] = useState<FavoriteVideo[]>(
    favoriteVideosStore.state.favorites
  );

  useEffect(() => {
    const loadedFavorites = loadFavoritesFromLocalStorage();
    favoriteVideosStore.setState((state) => ({
      ...state,
      favorites: loadedFavorites,
    }));
    setFavorites(loadedFavorites);
  }, []);

  return {
    favorites,
    addFavoriteVideo,
    removeFavoriteVideo,
  };
}
