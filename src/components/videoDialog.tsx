import React from "react";
import { IoMdClose } from "react-icons/io";

interface VideoDialogProps {
  videoId: string | null;
  onClose: () => void;
  title: string;
}

export default function VideoDialog({
  videoId,
  onClose,
  title,
}: VideoDialogProps) {
  if (!videoId) return <></>;

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4 lg:px-0"
      aria-labelledby="video-dialog-title"
      aria-modal="true"
    >
      <div className="relative bg-white rounded-lg overflow-hidden w-full max-w-3xl shadow-lg flex flex-col items-center p-8 pt-12">
        {/* Botão de Fechamento */}
        <button
          className="absolute top-4 right-4 text-black bg-gray-200 rounded-full p-2 hover:bg-gray-300 transition cursor-pointer z-10"
          onClick={onClose}
          aria-label="Fechar diálogo de vídeo"
        >
          <IoMdClose size={24} />
        </button>

        {/* Título */}
        <h2
          id="video-dialog-title"
          className="text-xl font-bold text-center mb-6 text-gray-800 break-words"
          style={{ wordWrap: "break-word", overflowWrap: "break-word" }}
        >
          {title}
        </h2>

        {/* Vídeo */}
        <div className="relative w-full aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={`Vídeo do YouTube: ${title}`}
            className="w-full h-full rounded-lg shadow-md"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
