import VideoPlayerLocal from "@/components/local/video_local";
import React from "react";

async function VideoPage({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;

    return (
        <div>
            <div>
                <VideoPlayerLocal />
            </div>
        </div>
    );
}

export default VideoPage;
