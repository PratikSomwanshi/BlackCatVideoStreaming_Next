import VideoPlayerLocal from "@/components/local/video_local";
import React from "react";

async function VideoPage({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;

    return (
        <div className="container mx-auto">
            <div className="flex justify-center">
                <VideoPlayerLocal />
            </div>
            <div className="w-[70%]  mx-auto mt-4 px-2">
                <div className="">
                    <h1 className="text-2xl font-bold">Video Title</h1>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Video Description</p>
                </div>
            </div>
        </div>
    );
}

export default VideoPage;
