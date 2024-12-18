"use client";
import { Search } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

function NavbarSearchIcon() {
    const { theme } = useTheme();

    const color = theme === "dark" ? "white" : "black";

    return (
        <div>
            <Search color={color} />
        </div>
    );
}

export default NavbarSearchIcon;
