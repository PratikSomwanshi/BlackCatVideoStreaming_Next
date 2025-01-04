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
        <div className="p-1 400:p-2 py-4 ">
            <h2 className="text-2xl font-semibold">Currently Available</h2>
            <div className="flex gap-2 p-0 400:p-2 home_container">
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
