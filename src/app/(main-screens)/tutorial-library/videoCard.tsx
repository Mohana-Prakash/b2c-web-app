import { orange500 } from "@/utils/constants";
import { EditIcon } from "@/utils/icons";
import React from "react";

interface VideoItem {
  title: string;
  description: string;
  videoUrl: string;
}

interface VideoCardProps {
  item: VideoItem;
  actionHandler?: (action: "edit" | "add", item: VideoItem) => void;
}

export default function VideoCard({ item, actionHandler }: VideoCardProps): JSX.Element {
  const getYouTubeEmbedUrl = (url: string) => {
    const videoIdMatch = url.match(/(?:\?v=|\/embed\/|\.be\/)([^&?/]+)/);
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : null;
  };
  return (
    <div className="w-full aspect-video my-2 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <iframe
        className="rounded-t-lg w-full h-48"
        src={getYouTubeEmbedUrl(item?.videoUrl) || undefined}
        title="What is Hedera Hashgraph? HBAR Explained with Animations"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" // Allows rich media features
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
      <div className="p-3 hover:bg-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-sm font-bold text-grey-500">{item.title}</h5>
          <button
            className="hover:opacity-70"
            onClick={() => actionHandler && actionHandler("edit", item as VideoItem)}
          >
            <EditIcon color={orange500} />
          </button>
        </div>
        <p className="text-xs text-grey-400">
          {item.description.length > 100
            ? item.description.substring(0, 100) + "..."
            : item.description}
        </p>
      </div>
    </div>
  );
}
