import { SearchResults } from "@/utils/interface/search_result_navbar";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function NavbarSearchResult({
    result,
    setOpen,
}: {
    result: SearchResults;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <Link
            key={result.id}
            href={`/video/${result.id}`}
            onClick={() => setOpen(false)}
            className="flex space-x-4 p-2 border-b border-gray-200">
            <div className="w-12 h-8">
                <Image
                    src="/default_video_card.png"
                    alt={result.title}
                    width={50}
                    height={50}
                    className="w-20 h-8"
                />
            </div>
            <li key={result.id} className="">
                {result.title}
            </li>
        </Link>
    );
}

export default NavbarSearchResult;
