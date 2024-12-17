"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

function SearchPage() {
    const searchParam = useSearchParams();

    const search = searchParam.get("q");

    if (!search) {
        return <div>Search is empty</div>;
    }

    return (
        <div>
            SearchPage
            <h2>{search}</h2>
        </div>
    );
}

export default SearchPage;
