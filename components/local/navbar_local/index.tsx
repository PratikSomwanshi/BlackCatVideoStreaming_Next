import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import NavbarSearch from "./navbar_search";
import ThemeSwitcher from "../theme_switcher";

const nav_links = [
    {
        name: "Home",
        url: "/",
    },
    {
        name: "Shorts",
        url: "/shorts",
    },
    {
        name: "Premium",
        url: "/premium",
    },
];

function NavbarLocal() {
    return (
        <div className="h-16  flex items-center justify-between px-4">
            <div>
                <Image
                    src="/black_cat_logo.svg"
                    alt="logo_image"
                    width={100}
                    height={100}
                    className="h-10 w-10"
                />
            </div>
            <div className="h-full w-[20rem] flex justify-center items-center space-x-8 ">
                {nav_links.map((link) => (
                    <a key={link.url} href={link.url}>
                        {link.name}
                    </a>
                ))}
            </div>

            <div className="flex  gap-4 h-full items-center space-x-2">
                <div>
                    <ThemeSwitcher />
                </div>
                {/* COMPONENT: Search */}
                <div>
                    <NavbarSearch />
                </div>
                {/* COMPONENT: sign in */}
                <div>
                    <Button variant="outline">Sign In</Button>
                </div>
                {/* COMPONENT: buy plan */}
                <div>
                    <Button>Buy Plan</Button>
                </div>
            </div>
        </div>
    );
}

export default NavbarLocal;
