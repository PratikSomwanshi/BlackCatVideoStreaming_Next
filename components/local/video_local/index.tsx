"use client";
import React, { useEffect, useCallback } from "react";
import useSWR from "swr";
import { PremiumContentLocal } from "../user_premium_local/premium_content_local";
import { HOST } from "@/utils/enums/host";
import { SessionData } from "@/utils/interface/iron_session";
import DefaultLoading from "../default_loading";
import { isSessionExpired } from "@/utils/is_jwt_expired";
import useGlobalContext from "@/hooks/useContext/useGlobalContext";
import UserPremiumLocal from "../user_premium_local";
import showVideo from "@/utils/show_video";

async function fetch_video(token: string, videoId: string) {
    if (!token) throw new Error("Missing token");

    const res = await fetch(`${HOST.BACKEND_URL}/api/v1/single/video`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: videoId }),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(
            data.error?.code ||
                data.error?.explanation ||
                "Failed to fetch video"
        );
    }

    return data;
}

function VideoLocal({
    session,
    videoId,
}: {
    session: SessionData;
    videoId: string;
}) {
    const { setIsJWTExpired, setIsSearchOpen } = useGlobalContext();

    useEffect(() => {
        setIsSearchOpen(false);
    }, []);

    const fetchVideo = useCallback(
        () => fetch_video(session.token!, videoId),
        [session.token, videoId]
    );

    const { data, isLoading, error } = useSWR(
        ["fetch_video", videoId],
        fetchVideo,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnMount: true,
            onError: (error) => {
                if (isSessionExpired(error.message)) {
                    console.log("JWT expired:", error.message);
                    setIsJWTExpired(true);
                }
            },
        }
    );

    if (isLoading) return <DefaultLoading />;

    if (error)
        return (
            <div className="flex justify-center">
                <div
                    className="w-full h-full max-w-[1079px] max-h-[607px] flex items-center justify-center"
                    style={{ height: "calc(100vh - 4rem)" }}>
                    <h2>Something went wrong</h2>
                </div>
            </div>
        );

    if (data && showVideo(data.data.isPremium, session.isPremiumUser)) {
        return (
            <div className="mx-auto">
                <div className="flex justify-center">
                    <div className="w-full h-full max-w-[1079px] max-h-[607px]">
                        <PremiumContentLocal
                            session={session}
                            premiumContent={data.data.isPremium}
                            premiumUser={session.isPremiumUser}
                            tittle={data.data.title}
                            description={data.data.description}
                            videoId={data.data.id}
                        />
                    </div>
                </div>
                <div className="w-[70%] mx-auto mt-4 px-2">
                    <h1 className="text-2xl font-bold">{data.data.title}</h1>
                    <p className="text-sm text-gray-500">
                        {data.data.description}
                    </p>
                </div>
            </div>
        );
    }

    console.log("Blocking access: video is premium and user is non-premium");

    return (
        <div className="overflow-hidden">
            <UserPremiumLocal tittle="Please upgrade to watch" />
        </div>
    );
}

export default VideoLocal;
