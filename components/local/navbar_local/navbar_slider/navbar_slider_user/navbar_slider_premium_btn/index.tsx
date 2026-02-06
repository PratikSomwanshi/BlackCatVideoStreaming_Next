"use client";
import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";
import Link from "next/link";
import React from "react";

function NavbarSliderPremiumBtn({
    isPremium,
}: Readonly<{ isPremium: boolean }>) {
    if (isPremium) {
        return (
            <div className="w-full">
                <Button className="w-full flex justify-center items-center bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-xl py-5 cursor-default shadow-md">
                    <Crown
                        className="me-2"
                        size={18}
                        strokeWidth={2.5}
                    />
                    {"Premium Member"}
                </Button>
            </div>
        );
    }

    return (
        <div className="w-full">
            <Link href="/go_premium" className="w-full block">
                <Button className="w-full flex justify-center items-center bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-xl py-5 shadow-lg active:scale-[0.98] transition-all">
                    <Crown
                        className="me-2"
                        size={18}
                        strokeWidth={2.5}
                    />
                    {"Upgrade to Premium"}
                </Button>
            </Link>
        </div>
    );
}

export default NavbarSliderPremiumBtn;
