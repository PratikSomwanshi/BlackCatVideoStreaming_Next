import Image from "next/image";
import React from "react";
import BuyPlanCard from "./buy_plan_card";
import { getSession } from "@/action/auth";
import { redirect } from "next/navigation";

async function BuyPlanLocal() {
    const session = await getSession();

    if (!session.isLoggedIn) {
        redirect("/login");
    }

    return (
        <div className="flex min-h-[calc(100vh-4rem)] w-full">
            {/* Left side: Plan Card */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-background">
                <BuyPlanCard
                    email={session.email as string}
                    token={session.token as string}
                />
            </div>

            {/* Right side: Image (Hidden on mobile) */}
            <div className="hidden lg:flex w-1/2 bg-black items-center justify-center relative overflow-hidden">
                <Image
                    src="/buy_plan.jpeg"
                    alt="Premium Plan"
                    fill
                    className="object-cover opacity-80"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center pb-20">
                     <div className="text-center text-white p-6 max-w-lg">
                        <h2 className="text-4xl font-bold mb-2">Upgrade to Premium</h2>
                        <p className="text-lg text-gray-200">Experience ad-free streaming and exclusive content.</p>
                     </div>
                </div>
            </div>
        </div>
    );
}

export default BuyPlanLocal;
