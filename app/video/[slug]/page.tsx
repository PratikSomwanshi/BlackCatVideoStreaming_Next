import { getSession } from "@/action/auth";
import UserPremiumLocal from "@/components/local/user_premium_local";
import VideoLocal from "@/components/local/video_local";
import React from "react";

async function VideoPage({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;

    const session = await getSession();

    if (!session.isLoggedIn) {
        return (
            <div className="overflow-hidden">
                <UserPremiumLocal tittle="Please log in to watch" />
            </div>
        );
    }

    return (
        <div>
            <VideoLocal
                session={{
                    ...session,
                }}
            />
        </div>
    );
}

export default VideoPage;
