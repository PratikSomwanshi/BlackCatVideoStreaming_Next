"use client";
import React from "react";
import { PremiumContentLocal } from "../user_premium_local/premium_content_local";
import useSWR from "swr";
import { HOST } from "@/utils/enums/host";
import { SessionData } from "@/utils/interface/iron_session";
import DefaultLoading from "../default_loading";
import { isSessionExpired } from "@/utils/is_jwt_expired";
import useGlobalContext from "@/hooks/useContext/useGlobalContext";

async function fetch_video(token: string) {
    const res = await fetch(`${HOST.BACKEND_URL}/api/v1/single/video`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
            id: "123",
        }),
    });

    const data = await res.json();

    if (!res.ok) {
        if (data.error.code) {
            throw new Error(data.error.code);
        }

        throw new Error(data.error.explanation || "Failed to fetch video");
    }

    return data;
}

function VideoLocal({ session }: { session: SessionData }) {
    const { setIsJWTExpired } = useGlobalContext();

    const { data, isLoading, error } = useSWR(
        "fetch_video",
        (url) => fetch_video(session.token!),
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnMount: true,
            onError: (error) => {
                if (isSessionExpired(error.message)) {
                    console.log("jwt error ", error.message);
                    setIsJWTExpired(true);
                    return;
                }
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

    if (error)
        return (
            <div
                className="flex justify-center items-center w-full"
                style={{
                    height: "calc(100vh - 4rem)",
                }}>
                <h2>Something went wrong</h2>
            </div>
        );

    return (
        <div className=" mx-auto ">
            <div className="flex justify-center  ">
                <div className="w-full h-full max-w-[1079px] max-h-[607px] ">
                    <PremiumContentLocal
                        session={session}
                        premiumContent={data.data.isPremium}
                        premiumUser={session.isPremiumUser}
                        tittle={data.data.title}
                        description={data.data.description}
                    />
                </div>
            </div>
            <div className="w-[70%]  mx-auto mt-4 px-2">
                <div className="">
                    <h1 className="text-2xl font-bold">{data.data.title}</h1>
                </div>
                <div>
                    <p className="text-sm text-gray-500">
                        {data.data.description}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default VideoLocal;
