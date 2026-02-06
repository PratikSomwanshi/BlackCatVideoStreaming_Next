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
        <div className="flex flex-col space-y-1 w-full pt-4">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2 px-3">
                Menu & Settings
            </h3>
            <div className="grid grid-cols-1 gap-1">
                {utility_links.map((link) => (
                    <Link
                        key={link.url}
                        href={link.url}
                        className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-muted transition-all active:scale-[0.98]">
                        <div className="bg-muted p-1.5 rounded-lg group-hover:bg-background">
                            <link.icon size={16} />
                        </div>
                        <span>{link.title}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default NavbarSliderUserUtility;
