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
            <div className="bg-black/95 min-h-[calc(100vh-4rem)]">
                <div className="container mx-auto px-0 md:px-4 py-0 md:py-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Player Column */}
                        <div className="flex-1">
                            <div className="aspect-video w-full bg-black shadow-2xl md:rounded-xl overflow-hidden ring-1 ring-white/10">
                                <PremiumContentLocal
                                    session={session}
                                    premiumContent={data.data.isPremium}
                                    premiumUser={session.isPremiumUser}
                                    tittle={data.data.title}
                                    description={data.data.description}
                                    videoId={data.data.id}
                                />
                            </div>
                            
                            <div className="mt-6 px-4 md:px-0">
                                <div className="flex flex-col gap-4">
                                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight">
                                        {data.data.title}
                                    </h1>
                                    
                                    <div className="flex items-center gap-4 py-4 border-y border-white/10">
                                        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center font-bold text-primary-foreground">
                                            BC
                                        </div>
                                        <div>
                                            <p className="font-semibold text-white">BlackCat Streaming</p>
                                            <p className="text-xs text-muted-foreground">Premium Content</p>
                                        </div>
                                    </div>

                                    <div className="bg-white/5 rounded-xl p-4 mt-2">
                                        <p className="text-sm md:text-base text-gray-300 whitespace-pre-wrap leading-relaxed">
                                            {data.data.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Column (Future recommendations can go here) */}
                        <div className="w-full lg:w-[350px] px-4 md:px-0 pb-12">
                            <h3 className="text-white font-bold mb-4 uppercase text-xs tracking-widest opacity-50">Related Content</h3>
                            <div className="space-y-4">
                                <div className="p-4 rounded-xl border border-white/10 bg-white/5 text-gray-400 text-sm italic text-center py-12">
                                    More videos coming soon...
                                </div>
                            </div>
                        </div>
                    </div>
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
