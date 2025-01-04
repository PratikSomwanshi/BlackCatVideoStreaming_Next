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
        <div className="relative group min-h-52 min-w-[22rem] bg-[#01010d]">
            {/* Video Container */}
            <Link href={`/video/${video_id}`} key={imageUrl}>
                <div
                    className="bg-cover bg-center h-full w-full  flex flex-col justify-between p-4 relative"
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
                        <div className="absolute top-0 left-1 z-10">
                            <FaMedal size={26} color="gold" />
                        </div>
                    )}

                    {/* Controls - Initially hidden, becomes visible on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between h-full cursor-pointer">
                        <div></div>

                        {/* Play Button */}
                        <div className="h-10 flex items-center mt-8 justify-center w-full">
                            <FaPlay size={26} color="white" />
                        </div>

                        {/* Video Title & Description */}
                        <div className="flex justify-between items-end  text-white">
                            <div>
                                <h2 className="text-xl font-semibold">
                                    {title}
                                </h2>
                                <p className="text-sm">{description}</p>
                            </div>

                            {/* Heart Icon */}
                            <div>
                                <IoIosHeartEmpty size={26} />
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default VideoCardLocal;
