import React from "react";
import NavbarSearch from "./navbar_search";
import NavbarHamburgerMenu from "./navbar_hamburger_menu";
import NavbarSearchIcon from "./navbar_search_icon";
import LogoLocal from "../logo_local";
import { NavbarButtonsLocal } from "@/components/local/navbar_local/navbar_buttons";
import Link from "next/link";
import { getSession } from "@/action/auth";

const nav_links = [
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
    const session = await getSession();

    return (
        <div className="h-16  flex items-center justify-between px-4 ">
            <div className="flex items-center space-x-2">
                <div className="">
                    <NavbarHamburgerMenu />
                </div>

                <Link href="/">
                    <LogoLocal size={40} />
                </Link>
            </div>
            <div className="h-full w-[20rem] hidden justify-center items-center space-x-8 1000:flex text-black">
                {nav_links.map((link) => (
                    <Link key={link.url} href={link.url}>
                        {link.name}
                    </Link>
                ))}
            </div>
            <div className="flex gap-4 h-full items-center space-x-2">
                <div className="flex  gap-2 400:gap-4 h-full items-center space-x-2">
                    {/* COMPONENT: Search */}
                    <div className="h-full">
                        <div className="h-full  flex items-center">
                            <NavbarSearchIcon token={session.token!} />
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
