import Link from "next/link";
import React from "react";
import { Film, Crown, Ticket, Heart, Bookmark } from "lucide-react";

function NavbarSliderUserUtility() {
    const utility_links = [
        {
            title: "Shorts",
            url: "/shorts",
            icon: Film,
        },
        {
            title: "Premium",
            url: "/premium",
            icon: Crown,
        },
        {
            title: "Redeem Voucher",
            url: "/redeem",
            icon: Ticket,
        },
        {
            title: "Favorites",
            url: "/favorites",
            icon: Heart,
        },
        {
            title: "Watchlist",
            url: "/watchlist",
            icon: Bookmark,
        },
    ];

    return (
        <div className="flex flex-col space-y-4">
            {utility_links.map((link) => (
                <Link
                    key={link.url}
                    href={link.url}
                    className="flex items-center space-x-3 text-sm font-medium hover:text-primary transition-colors">
                    <link.icon size={18} />
                    <span>{link.title}</span>
                </Link>
            ))}
        </div>
    );
}

export default NavbarSliderUserUtility;
