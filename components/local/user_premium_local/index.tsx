"use client";
import { Button } from "@/components/ui/button";
import useGlobalContext from "@/hooks/useContext/useGlobalContext";
import Image from "next/image";
import React, { useEffect } from "react";

function UserPremiumLocal({
    tittle = "You Should be a Premium User to watch this",
}: {
    tittle?: string;
}) {
    const { setIsSearchOpen } = useGlobalContext();

    useEffect(() => {
        setIsSearchOpen(false);
    }, []);

    return (
        <div
            className="flex items-center justify-center h-full bg-black "
            style={{
                height: "calc(100vh - 4rem)",
            }}>
            <div className="w-1/2 flex justify-center">
                <Image
                    src="/premium__account.svg"
                    alt="fallback"
                    width={300}
                    height={300}
                />
            </div>
            <div className="text-white w-1/2 space-y-4">
                <h2 className="text-2xl font-bold w-[75%]">{tittle}</h2>
                <div>
                    <Button variant="secondary">Upgrade Account</Button>
                </div>
            </div>
        </div>
    );
}

export default UserPremiumLocal;
