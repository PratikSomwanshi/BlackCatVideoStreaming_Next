"use client";
import React from "react";
import { PremiumContentLocal } from "../user_premium_local/premium_content_local";
import useSWR from "swr";
import { HOST } from "@/utils/enums/host";
import { SessionData } from "@/utils/interface/iron_session";
import DefaultLoading from "../default_loading";

async function fetch_video() {
    const res = await fetch(`${HOST.BACKEND_URL}/api/v1/video`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: "123",
        }),
    });

    const data = await res.json();

    return data;
}

function VideoLocal({ session }: { session: SessionData }) {
    const { data, isLoading, error } = useSWR("fetch_video", fetch_video, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnMount: true,
    });

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
