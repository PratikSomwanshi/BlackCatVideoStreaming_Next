"use client";
import React from "react";
import { IGlobalContext } from "@/utils/interface/context";

export const GlobalContext = React.createContext<IGlobalContext | undefined>(
    undefined
);

function GlobalProvider({ children }: { children: React.ReactNode }) {
    const [isJWTExpired, setIsJWTExpired] = React.useState(false);
    const [isUserAccountSliderOpen, setIsUserAccountSliderOpen] =
        React.useState(false);

    return (
        <div>
            <GlobalContext.Provider
                value={{
                    isJWTExpired,
                    setIsJWTExpired,
                    isUserAccountSliderOpen,
                    setIsUserAccountSliderOpen,
                }}>
                {children}
            </GlobalContext.Provider>
        </div>
    );
}

export default GlobalProvider;
