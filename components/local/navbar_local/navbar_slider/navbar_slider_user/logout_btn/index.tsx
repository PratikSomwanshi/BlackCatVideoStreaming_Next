"use client";
import { logout } from "@/action/auth";
import { Button } from "@/components/ui/button";
import useGlobalContext from "@/hooks/useContext/useGlobalContext";
import { LogOut } from "lucide-react";
import React from "react";

function LogoutBtnLocal() {
    const { setIsUserAccountSliderOpen } = useGlobalContext();

    return (
        <div>
            <Button
                variant="ghost"
                className="flex w-full items-center justify-start space-x-2"
                onClick={async () => {
                    await logout();
                    setIsUserAccountSliderOpen(false);
                }}>
                <LogOut
                    className="-ms-1 me-2 mb-[0.10rem] opacity-60"
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                />
                Sign Out
            </Button>
        </div>
    );
}

export default LogoutBtnLocal;
