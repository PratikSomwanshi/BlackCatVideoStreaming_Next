"use client";
import { logout } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { LoaderCircle, LogOut } from "lucide-react";
import React from "react";
import { mutate } from "swr";

function NavBarSliderBtn() {
    const [loading, setLoading] = React.useState(false);

    return (
        <Button
            className="flex justify-start items-center w-full"
            variant="ghost"
            onClick={async () => {
                setLoading(true);
                await logout();
                mutate("session", { isLoggedIn: false, isPremium: false });
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
    );
}

export default NavBarSliderBtn;
