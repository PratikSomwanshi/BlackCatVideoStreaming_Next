"use client";
import React from "react";
import { IGlobalContext } from "@/utils/interface/context";
import SessionExpiredModel from "@/components/local/session_expired_model";

export const GlobalContext = React.createContext<IGlobalContext | undefined>(
    undefined
);

function GlobalProvider({ children }: { children: React.ReactNode }) {
    const [isJWTExpired, setIsJWTExpired] = React.useState(false);
    const [isUserAccountSliderOpen, setIsUserAccountSliderOpen] =
        React.useState(false);
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);

    return (
        <div>
            <GlobalContext.Provider
                value={{
                    isJWTExpired,
                    setIsJWTExpired,
                    isUserAccountSliderOpen,
                    setIsUserAccountSliderOpen,
                    isSearchOpen,
                    setIsSearchOpen,
                }}>
                {children}
                {isJWTExpired && <SessionExpiredModel />}
            </GlobalContext.Provider>
        </div>
    );
}

export default GlobalProvider;
