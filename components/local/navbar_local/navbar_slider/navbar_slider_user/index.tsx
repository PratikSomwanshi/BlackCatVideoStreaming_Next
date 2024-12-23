import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Crown, LoaderCircle, LogOut, UserRound } from "lucide-react";
import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import NavbarSliderPremiumBtn from "./navbar_slider_premium_btn";
import { stat } from "fs";

function NavbarSliderUser() {
    const [loading, setLoading] = useState(false);

    const { data: session, status } = useSession();

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
                <h2>{session?.user.username}</h2>
            </div>
            <div>
                <NavbarSliderPremiumBtn />
            </div>
            <div>
                {status == "authenticated" && (
                    <Button
                        className="flex justify-start items-center w-full"
                        variant="ghost"
                        onClick={async () => {
                            setLoading(true);
                            await signOut();
                        }}>
                        {!loading ? (
                            <>
                                <LogOut
                                    className="-ms-1 me-2 mb-[0.10rem] opacity-60"
                                    size={16}
                                    strokeWidth={2}
                                    aria-hidden="true"
                                />
                                Sign Out
                            </>
                        ) : (
                            <div className="animate-spin flex justify-center items-center w-full">
                                <LoaderCircle
                                    style={{
                                        height: 24,
                                        width: 24,
                                    }}
                                />
                            </div>
                        )}
                    </Button>
                )}
            </div>
        </div>
    );
}

export default NavbarSliderUser;
