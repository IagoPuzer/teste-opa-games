import Image from "next/image";

interface CardVideoProps {
  thumbnailUrl: string;
  title: string;
  description: string;
  views: number;
  uploadDate: string;
  channelTitle: string;
  onClick?: () => void; // Nova propriedade para o evento de clique
}

export default function CardVideo({
  thumbnailUrl,
  title,
  views,
  channelTitle,
  uploadDate,
  onClick,
}: CardVideoProps) {
  return (
    <button
      className="flex flex-col w-full h-[250px] max-w-[360px] cursor-pointer group"
      onClick={onClick}
    >
      <div className="mb-3">
        <Image
          src={thumbnailUrl || "/placeholder.svg"}
          alt={`Thumbnail do vídeo: ${title}`}
          width={600}
          height={600}
          priority
          className="rounded-md object-fit transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col w-full justify-start items-start">
        <h3 className="text-start font-medium text-sm line-clamp-2 mb-1">
          {title}
        </h3>
        <p className="text-gray-600 text-xs mb-1">{channelTitle}</p>
        <div className="text-gray-600 text-xs">
          <span>{views.toLocaleString("pt-BR")} visualizações</span>
          <span className="mx-1">•</span>
          <span>{uploadDate}</span>
        </div>
      </div>
    </button>
  );
}
