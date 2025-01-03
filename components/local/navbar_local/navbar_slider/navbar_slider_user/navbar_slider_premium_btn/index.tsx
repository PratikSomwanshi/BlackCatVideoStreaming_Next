"use client";
import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";
import React from "react";

function NavbarSliderPremiumBtn({
    isPremium,
}: Readonly<{ isPremium: boolean }>) {
    if (isPremium) {
        return (
            <div>
                <Button className="flex justify-center items-center cursor-default">
                    <Crown
                        className="-ms-1 me-2 mb-[0.10rem] opacity-60"
                        size={16}
                        strokeWidth={2}
                        aria-hidden="true"
                    />
                    {"Premium User"}
                </Button>
            </div>
        );
    }

    return (
        <div>
            <Button className="flex justify-center items-center">
                <Crown
                    className="-ms-1 me-2 mb-[0.10rem] opacity-60"
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                />
                {"Be Premium User"}
            </Button>
        </div>
    );
}

export default NavbarSliderPremiumBtn;
