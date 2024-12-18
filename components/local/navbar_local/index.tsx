import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import NavbarSearch from "./navbar_search";
import ThemeSwitcher from "../theme_switcher";
import NavbarHamburgerMenu from "./navbar_hamburger_menu";
import { Search } from "lucide-react";
import NavbarSearchIcon from "./navbar_search_icon";
import LogoLocal from "../logo_local";

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
            <div className="flex items-center space-x-2">
                <div className="">
                    <NavbarHamburgerMenu />
                </div>

                <LogoLocal size={40} />
            </div>
            <div className="h-full w-[20rem] hidden justify-center items-center space-x-8 1000:flex">
                {nav_links.map((link) => (
                    <a key={link.url} href={link.url}>
                        {link.name}
                    </a>
                ))}
            </div>
            <div className="flex gap-4 h-full items-center space-x-2">
                <div className="hidden 450:flex  gap-4 h-full items-center space-x-2">
                    <div>
                        <ThemeSwitcher />
                    </div>
                    {/* COMPONENT: Search */}
                    <div className="h-full">
                        <div className="hidden 750:flex h-full  items-center space-x-2">
                            <NavbarSearch />
                        </div>

                        <div className="h-full 750:hidden flex items-center">
                            <NavbarSearchIcon />
                        </div>
                    </div>
                    {/* COMPONENT: sign in */}
                    <div>
                        <Button variant="outline">Sign In</Button>
                    </div>
                </div>
                {/* COMPONENT: buy plan */}
                <div className="">
                    <Button>Buy Plan</Button>
                </div>
            </div>
        </div>
    );
}

export default NavbarLocal;

//
