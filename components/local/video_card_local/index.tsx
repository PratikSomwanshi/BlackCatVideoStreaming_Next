"use client";

import { VideoCardProps } from "@/utils/interface/video_interface";
import Link from "next/link";
import React, { useState } from "react";
import { FaMedal, FaPlay } from "react-icons/fa";
import { IoIosHeartEmpty } from "react-icons/io";

const VideoCardLocal: React.FC<VideoCardProps> = ({
    video_id,
    thumbnail: imageUrl,
    fallback_image_url: fallbackImageUrl = "/fallback.jpg",
    title,
    description,
    isVideoPremium,
}) => {
    const [imageLoaded, setImageLoaded] = useState<boolean>(true);

    // Handle image error and fallback
    const handleImageError = () => {
        setImageLoaded(false);
    };

    return (
        <div className="relative group w-full aspect-video bg-[#01010d] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
            {/* Video Container */}
            <Link href={`/video/${video_id}`} key={imageUrl} className="block w-full h-full">
                <div
                    className="bg-cover bg-center h-full w-full flex flex-col justify-between p-4 relative"
                    style={{
                        backgroundImage: `url(${
                            imageLoaded ? imageUrl : fallbackImageUrl
                        })`,
                        backgroundColor: "#01010d", // Fallback color if the image is unavailable
                    }}
                    onError={handleImageError} // Trigger fallback image on error
                >
                    {/* Always visible premium icon */}
                    {isVideoPremium && (
                        <div className="absolute top-2 left-2 z-10 bg-black/50 p-1 rounded-full backdrop-blur-sm">
                            <FaMedal size={20} color="gold" />
                        </div>
                    )}

                    {/* Controls - Initially hidden, becomes visible on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between h-full w-full absolute inset-0 bg-black/40 p-4">
                        <div></div>

                        {/* Play Button */}
                        <div className="flex items-center justify-center w-full">
                            <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm hover:scale-110 transition-transform">
                                <FaPlay size={24} color="white" />
                            </div>
                        </div>

                        {/* Video Title & Description */}
                        <div className="flex justify-between items-end text-white w-full gap-2">
                            <div className="flex-1 min-w-0">
                                <h2 className="text-lg font-bold truncate text-shadow-sm">
                                    {title}
                                </h2>
                                <p className="text-xs text-gray-200 line-clamp-1 text-shadow-sm">{description}</p>
                            </div>

                            {/* Heart Icon */}
                            <div className="hover:scale-110 transition-transform cursor-pointer">
                                <IoIosHeartEmpty size={24} />
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default VideoCardLocal;
