import { auth } from "@/auth";
import { PremiumContentLocal } from "@/components/local/user_premium_local/premium_content_local";
import React from "react";
import { HOST } from "@/utils/configuration/host";

async function VideoPage({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;

    const session = await auth();

    let res;
    let data;

    try {
        res = await fetch(`${HOST.BACKEND_URL}/api/v1/video`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: "123",
            }),
        });

        data = await res.json();
    } catch (error: any) {
        console.log(error.message);
    }

    if (!session?.user.isLoggedIn) {
        return <div>Not logged in</div>;
    }

    if (!res?.ok) {
        return <div>Failed to fetch</div>;
    }

    console.log(session);

    return (
        <div className="container mx-auto">
            <div className="flex justify-center">
                <div className=" w-[1079px] h-[607px] bg-black ">
                    <PremiumContentLocal
                        premiumContent={data.data.isPremium}
                        premiumUser={session.user.isPremium}
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

export default VideoPage;
