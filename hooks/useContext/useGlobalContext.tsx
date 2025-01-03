import React, { useContext } from "react";
import { GlobalContext } from "@/global_provider";
import { IGlobalContext } from "@/utils/interface/context";

const useGlobalContext = (): IGlobalContext => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error(
            "userGlobalContext must be used within a SessionProvider"
        );
    }
    return context;
};

export default useGlobalContext;
