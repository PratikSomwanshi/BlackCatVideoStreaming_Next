import React from "react";
import NavbarSearch from "./navbar_search";
import NavbarHamburgerMenu from "./navbar_hamburger_menu";
import NavbarSearchIcon from "./navbar_search_icon";
import LogoLocal from "../logo_local";
import { NavbarButtonsLocal } from "@/components/local/navbar_local/navbar_buttons";
import Link from "next/link";

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

async function NavbarLocal() {
    return (
        <div className="h-16  flex items-center justify-between px-4">
            <div className="flex items-center space-x-2">
                <div className="">
                    <NavbarHamburgerMenu />
                </div>

                <LogoLocal size={40} />
            </div>
            <div className="h-full w-[20rem] hidden justify-center items-center space-x-8 1000:flex text-black">
                {nav_links.map((link) => (
                    <Link key={link.url} href={link.url}>
                        {link.name}
                    </Link>
                ))}
            </div>
            <div className="flex gap-4 h-full items-center space-x-2">
                <div className="hidden 450:flex  gap-4 h-full items-center space-x-2">
                    {/* COMPONENT: Search */}
                    <div className="h-full">
                        <div className="hidden 750:flex h-full  items-center space-x-2">
                            <NavbarSearch />
                        </div>

                        <div className="h-full 750:hidden flex items-center">
                            <NavbarSearchIcon />
                        </div>
                    </div>
                </div>
                {/* COMPONENT: buy plan */}
                <NavbarButtonsLocal />
            </div>
        </div>
    );
}

export default NavbarLocal;
