"use client";
import { auth } from "@/auth";
import VideoCardLocal from "@/components/local/video_card_local";
import Link from "next/link";
import React from "react";
import useSWR from "swr";
import { fetch_video_card } from "@/action/fetch_video_card/fetch_video";
import { IVideoCard } from "@/utils/interface/video_interface";

function HomePage() {
    const { data, isLoading } = useSWR("fetch_video_card", fetch_video_card);

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (data.error) {
        return <h1>{data.error || "Something went wrong"}</h1>;
    }

    console.log(data);

    return (
        <div>
            <h2>Currently Available</h2>
            <div className="flex gap-2 p-2 overflow-y-scroll">
                {data.data.map((video: IVideoCard) => (
                    <VideoCardLocal
                        key={video.id}
                        video_id={video.id}
                        thumbnail={video.thumbnail || "/gold.jpeg"}
                        description={video.description}
                        title={video.title}
                        isVideoPremium={video.isPremium}
                    />
                ))}
            </div>
        </div>
    );
}

export default HomePage;
