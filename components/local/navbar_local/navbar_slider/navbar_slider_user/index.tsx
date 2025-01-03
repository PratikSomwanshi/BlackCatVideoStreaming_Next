"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserRound } from "lucide-react";
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
        <div className="space-y-3 ">
            <div className="flex justify-end ">
                <Avatar>
                    <AvatarFallback>
                        {/* <AvatarImage src="./avatar-80-07.jpg" alt="Kelly King" /> */}
                        <UserRound
                            size={20}
                            strokeWidth={2}
                            className="opacity-60"
                            aria-hidden="true"
                        />
                    </AvatarFallback>
                </Avatar>
            </div>
            <div className="h-6">
                <h2>{username}</h2>
            </div>
            <div>
                <NavbarSliderPremiumBtn isPremium={isPremiumUser} />
            </div>
            <div>{isLoggedIn && <LogoutBtnLocal />}</div>
        </div>
    );
}

export default NavbarSliderUser;
