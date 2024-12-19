import { auth } from "@/auth";
import VideoCardLocal from "@/components/local/video_card_local";
import Link from "next/link";
import React from "react";

async function HomePage() {
    const session = await auth();

    // if (!session?.user.isLoggedIn) {
    //     return <div>Logged in</div>;
    // }

    return (
        <div>
            <h2>Currently Available</h2>
            <div className="flex gap-2 p-2 overflow-y-scroll">
                {Array.from({ length: 10 }).map((_, index) => {
                    return (
                        <VideoCardLocal
                            key={index}
                            video_id="somehting"
                            thumbnail="/gold.jpeg"
                            description="this is a description"
                            title="Gold Rush"
                            isVideoPremium={true}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default HomePage;
