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
        <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-4">
                    <div className="md:hidden">
                        <NavbarHamburgerMenu />
                    </div>

                    <Link href="/" className="flex items-center gap-2">
                        <LogoLocal size={32} />
                        <span className="hidden font-bold sm:inline-block">BlackCat</span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                        {nav_links.map((link) => (
                            <Link
                                key={link.url}
                                href={link.url}
                                className="transition-colors hover:text-foreground/80 text-foreground/60">
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>
                
                <div className="flex items-center gap-4">
                    {/* COMPONENT: Search */}
                    <div className="flex items-center">
                        <NavbarSearchIcon token={session.token!} />
                    </div>
                    
                    {/* COMPONENT: buy plan */}
                    <NavbarButtonsLocal />
                </div>
            </div>
        </div>
    );
}

export default NavbarLocal;
