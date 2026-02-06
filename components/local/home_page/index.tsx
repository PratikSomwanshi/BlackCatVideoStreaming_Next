"use client";
import { HOST } from "@/utils/enums/host";
import React from "react";
import useSWR from "swr";
import { IVideoCard } from "@/utils/interface/video_interface";
import DefaultLoading from "../default_loading";
import VideoCardLocal from "../video_card_local";

function HomeComponentLocal() {
    const { data, isLoading, error } = useSWR(
        "fetch_video_card",
        async () => {
            const res = await fetch(`${HOST.BACKEND_URL}/api/v1/video`);
            return await res.json();
        },
        {
            revalidateOnMount: true,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            refreshInterval: 0,
            refreshWhenHidden: false,
            refreshWhenOffline: false,
        }
    );

    if (isLoading) {
        return <DefaultLoading />;
    }

    if (error) {
        return (
            <div
                className="flex justify-center items-center"
                style={{
                    height: "calc(100vh - 64px)",
                }}>
                <h2 className="text-xl text-red-500 underline underline-offset-2">
                    {"Something went wrong"}
                </h2>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-2xl font-bold mb-6 tracking-tight">Currently Available</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {data.data.map((video: IVideoCard) => (
                    <VideoCardLocal
                        key={video.id}
                        video_id={video.id}
                        thumbnail={video.thumbnail || "/default_video_card.png"}
                        description={video.description}
                        title={video.title}
                        isVideoPremium={video.isPremium}
                    />
                ))}
            </div>
        </div>
    );
}

export default HomeComponentLocal;
