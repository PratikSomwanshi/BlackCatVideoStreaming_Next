"use client";
import { logout } from "@/action/auth";
import { Button } from "@/components/ui/button";
import useGlobalContext from "@/hooks/useContext/useGlobalContext";
import { LogOut } from "lucide-react";
import React from "react";

function LogoutBtnLocal() {
    const { setIsUserAccountSliderOpen } = useGlobalContext();

    return (
        <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 text-destructive border-destructive/20 hover:bg-destructive/5 hover:border-destructive/30 transition-all rounded-xl py-5"
            onClick={async () => {
                setIsUserAccountSliderOpen(false);
                await logout();
            }}>
            <LogOut size={16} />
            <span className="font-semibold">Sign Out</span>
        </Button>
    );
}

export default LogoutBtnLocal;
