import Image from "next/image";
import Link from "next/link";
import React from "react";

function NavbarSliderUserUtility() {
    const utility_links = [
        {
            title: "Redeem Voucher",
            url: "/redeem",
            icon: "/ticket.svg",
        },
        {
            title: "Favorites",
            url: "/favorites",
            icon: "/heart.svg",
        },
        {
            title: "Watchlist",
            url: "/watchlist",
            icon: "/book-marked.svg",
        },
    ];

    return (
        <div className="flex flex-col space-y-3">
            {utility_links.map((link) => (
                <Link
                    key={link.url}
                    href={link.url}
                    className="flex items-center space-x-2">
                    <Image
                        src={link.icon}
                        alt={link.title}
                        width={16}
                        height={16}
                    />
                    <span>{link.title}</span>
                </Link>
            ))}
        </div>
    );
}

export default NavbarSliderUserUtility;
