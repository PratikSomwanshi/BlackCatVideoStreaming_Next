"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserRound, Crown } from "lucide-react";
import React from "react";
import NavbarSliderPremiumBtn from "./navbar_slider_premium_btn";

import LogoutBtnLocal from "./logout_btn";

function NavbarSliderUser({
    username,
    isPremiumUser,
    isLoggedIn,
}: {
    username: string | undefined;
    isPremiumUser: boolean;
    isLoggedIn: boolean;
}) {
    return (
        <div className="flex flex-col items-center space-y-4 pb-6 border-b border-border w-full">
            <div className="relative">
                <Avatar className="h-20 w-20 border-2 border-primary/10">
                    <AvatarFallback className="bg-primary/5 text-primary">
                        <UserRound
                            size={32}
                            strokeWidth={1.5}
                        />
                    </AvatarFallback>
                </Avatar>
                {isPremiumUser && (
                    <div className="absolute -bottom-1 -right-1 bg-yellow-400 rounded-full p-1 shadow-sm">
                        <Crown size={14} className="text-black" />
                    </div>
                )}
            </div>
            
            <div className="text-center">
                <h2 className="text-xl font-bold text-foreground">
                    {isLoggedIn ? username : "Guest User"}
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                    {isLoggedIn ? (isPremiumUser ? "Premium Member" : "Standard Account") : "Sign in to access more features"}
                </p>
            </div>

            <div className="w-full pt-2 flex flex-col gap-2">
                <NavbarSliderPremiumBtn isPremium={isPremiumUser} />
                {isLoggedIn && <LogoutBtnLocal />}
            </div>
        </div>
    );
}

export default NavbarSliderUser;
