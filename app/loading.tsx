"use client";
import React from "react";
import DefaultLoadingLocal from "../components/local/default_loading/index";
import { useTheme } from "next-themes";

function DefaultLoading() {
    const { theme } = useTheme();

    const color = theme === "dark" ? "white" : "black";

    return (
        <div>
            <DefaultLoadingLocal size={50} color={color} />
        </div>
    );
}

export default DefaultLoading;
