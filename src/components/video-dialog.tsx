import React from "react";

interface VideoDialogProps {
  videoId: string | null;
  onClose: () => void;
  onFavorite: () => void; // Nova propriedade para favoritar o vídeo
  title: string;
  description: string;
}

export default function VideoDialog({
  videoId,
  onClose,
  onFavorite,
  title,
  description,
}: VideoDialogProps) {
  if (!videoId) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg overflow-hidden w-full max-w-3xl shadow-lg flex flex-col items-center p-4">
        {/* Botões de ação */}
        <div className="w-full flex justify-between mb-4">
          <button
            className="text-black bg-gray-200 rounded-full p-2 hover:bg-gray-300"
            onClick={onClose}
          >
            ✕
          </button>
          <button
            className="text-black bg-yellow-300 rounded-full p-2 hover:bg-yellow-400"
            onClick={onFavorite}
          >
            ★
          </button>
        </div>

        <div className="relative w-full aspect-video mb-4">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={`Vídeo do YouTube: ${title}`}
            className="w-full h-full rounded-lg"
          ></iframe>
        </div>

        <div className="text-center">
          <h2 className="text-lg font-semibold mb-2">{title}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
}
