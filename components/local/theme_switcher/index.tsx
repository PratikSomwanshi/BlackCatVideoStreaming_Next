"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [clicked, setClicked] = useState(false);

    // Ensure that the theme is applied only on the client-side (to avoid hydration errors)
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // Return null while the component is mounting

    const toggleTheme = () => {
        setClicked(true);
        setTheme(theme === "dark" ? "light" : "dark");

        // Reset the click animation after a short duration (300ms in this case)
        setTimeout(() => setClicked(false), 300);
    };

    return (
        <div className="">
            <button
                onClick={toggleTheme}
                className={`relative p-3  transition-all duration-300 ease-in-out transform 
          ${clicked ? "  text-white" : " text-black"}
           focus:outline-none`}>
                {theme === "dark" ? (
                    <span role="img" aria-label="Light Mode">
                        🌞
                    </span>
                ) : (
                    <span role="img" aria-label="Dark Mode">
                        🌙
                    </span>
                )}

                <span
                    className={`absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-20 ${
                        clicked ? "scale-100" : "scale-0"
                    } transition-all duration-300`}></span>
            </button>
        </div>
    );
};

export default ThemeSwitcher;
