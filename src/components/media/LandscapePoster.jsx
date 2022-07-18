import React from "react";
import { img_500, unavailableLandscape } from "../../config/config";
export default function LandscapePoster({ media, className }) {
  return (
    <img
      className={`${className} w-full h-full rounded-2xl overflow-hidden mb-4`}
      src={
        media.backdrop_path
          ? `${img_500}/${media.backdrop_path}`
          : unavailableLandscape
      }
      alt={media.name || media.title}
    />
  );
}
