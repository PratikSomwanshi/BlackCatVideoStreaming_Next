"use client";
import { saveSession } from "@/action/auth";
import LoginLocal from "@/components/local/login_local";
import { Button } from "@/components/ui/button";
import useGlobalContext from "@/hooks/useContext/useGlobalContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function LoginPage() {
    const { setIsJWTExpired, setIsSearchOpen } = useGlobalContext();

    useEffect(() => {
        setIsJWTExpired(false);
        setIsSearchOpen(false);
    }, []);

    return (
        <div>
            <LoginLocal />
        </div>
    );
}

export default LoginPage;
