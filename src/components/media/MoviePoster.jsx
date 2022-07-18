import React from "react";
import { img_500, unavailable } from "../../config/config";
export default function MoviePoster({ media }) {
  return (
    <img
      className="rounded-2xl overflow-hidden col-span-2 lg:col-span-1 w-full h-full relative"
      src={media.poster_path ? `${img_500}/${media.poster_path}` : unavailable}
      alt={media.name || media.title}
    />
  );
}
