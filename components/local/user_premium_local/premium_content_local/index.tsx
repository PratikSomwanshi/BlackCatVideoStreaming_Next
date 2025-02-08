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
    videoId,
}: {
    premiumContent: boolean;
    premiumUser: boolean;
    tittle: string;
    description: string;
    session: SessionData;
    videoId: string;
}) {
    const { data, isLoading, error } = useSWR(
        "fetch_video_detail",
        async () => {
            const res = await fetch(
                `${HOST.BACKEND_URL}/api/v1/video/hls/${videoId}/1080p/playlist.m3u8`,
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
            onSuccess: (data) => {
                console.log("success ", data);
            },
        }
    );

    if (isLoading)
        return (
            <div>
                <DefaultLoading />
            </div>
        );

    // if (error) {
    //     <div className="flex justify-center  ">
    //         <div className="w-full h-full max-w-[1079px] max-h-[607px] ">
    //             <div
    //                 className="flex justify-center items-center w-full"
    //                 style={{
    //                     height: "calc(100vh - 4rem)",
    //                 }}>
    //                 <h2>Something went wrong</h2>
    //             </div>
    //         </div>
    //     </div>;
    // }

    if (error) {
        return <UserPremiumLocal />;
    }

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
