"use client";
import { SessionData } from "@/utils/interface/iron_session";
import UserPremiumLocal from "..";
import VideoPlayerLocal from "../../video_player_local";
import useSWR from "swr";
import { HOST } from "@/utils/enums/host";
import DefaultLoading from "../../default_loading";

export function PremiumContentLocal({
    premiumContent,
    premiumUser,
    tittle,
    description,
    session,
}: {
    premiumContent: boolean;
    premiumUser: boolean;
    tittle: string;
    description: string;
    session: SessionData;
}) {
    const { data, isLoading, error } = useSWR(
        "fetch_video_detail",
        async () => {
            const res = await fetch(
                `${HOST.BACKEND_URL}/api/v1/video/hls/123/1080p/playlist.m3u8`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + session.token,
                    },
                }
            );

            const data = await res.json();
            if (!res.ok) {
                console.log("error ", data);
                throw new Error("Failed to fetch video");
            }

            return data;
        },
        {
            refreshInterval: 0,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            revalidateIfStale: false,
            refreshWhenHidden: false,
            refreshWhenOffline: false,
            revalidateOnMount: true,
            onError: (error) => {
                console.log("general error ", error.message);
            },
        }
    );

    if (isLoading)
        return (
            <div>
                <DefaultLoading />
            </div>
        );

    if (error) return <div>Something Went Wrong...</div>;

    if (!premiumContent) {
        return (
            <VideoPlayerLocal
                id="123"
                session={session}
                tittle={tittle}
                description={description}
                filePath={data.fileURL}
            />
        );
    }

    if (premiumUser) {
        return (
            <VideoPlayerLocal
                id="123"
                session={session}
                tittle={tittle}
                description={description}
                filePath={data.fileURL}
            />
        );
    }

    return <UserPremiumLocal />;
}
