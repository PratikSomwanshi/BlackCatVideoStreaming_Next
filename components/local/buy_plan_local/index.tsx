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
        <div
            style={{
                height: "calc(100vh - 4rem)",
            }}
            className="flex justify-center  items-center gap-1">
            <div className="w-full 400:w-1/2 flex justify-center items-center m-1">
                <BuyPlanCard
                    email={session.email as string}
                    token={session.token as string}
                />
            </div>
            <div
                className="hidden w-1/2 800:flex justify-center items-center bg-black"
                style={{
                    height: "calc(100vh - 4rem)",
                }}>
                <Image
                    src="/buy_plan.jpeg"
                    alt="Buy Plan"
                    width={100}
                    height={100}
                    className="h-full w-1/2"
                />
            </div>
        </div>
    );
}

export default BuyPlanLocal;
