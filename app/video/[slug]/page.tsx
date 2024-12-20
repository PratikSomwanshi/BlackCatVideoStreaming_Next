import { auth } from "@/auth";
import { PremiumContentLocal } from "@/components/local/user_premium_local/premium_content_local";
import React from "react";

async function VideoPage({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;

    const session = await auth();

    if (!session?.user.isLoggedIn) {
        return <div>Not logged in</div>;
    }

    console.log(session);

    return (
        <div className="container mx-auto">
            <div className="flex justify-center">
                <div className=" w-[1079px] h-[607px] bg-black ">
                    <PremiumContentLocal
                        premiumContent={false}
                        premiumUser={!session.user.isPremium}
                    />
                </div>
            </div>
            <div className="w-[70%]  mx-auto mt-4 px-2">
                <div className="">
                    <h1 className="text-2xl font-bold">Video Title</h1>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Video Description</p>
                </div>
            </div>
        </div>
    );
}

export default VideoPage;
