"use client";
import React from "react";
import { IGlobalContext } from "@/utils/interface/context";
import SessionExpiredModel from "@/components/local/session_expired_model";
import WebSocketClient from "@/components/local/websocket_client";

export const GlobalContext = React.createContext<IGlobalContext | undefined>(
    undefined
);

function GlobalProvider({
    username,
    children,
}: {
    username: string;
    children: React.ReactNode;
}) {
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
                <WebSocketClient username={username} />
            </GlobalContext.Provider>
        </div>
    );
}

export default GlobalProvider;
