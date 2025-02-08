"use client";
import { Button } from "@/components/ui/button";
import useGlobalContext from "@/hooks/useContext/useGlobalContext";
import Image from "next/image";
import Link from "next/link";
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
            <div className="text-white w-1/2 space-y-8">
                <h2 className="text-2xl font-bold w-[75%] mb-4">{tittle}</h2>
                <Link href="/go_premium">
                    <Button variant="secondary">Upgrade Account</Button>
                </Link>
            </div>
        </div>
    );
}

export default UserPremiumLocal;
