"use client";

import { Search } from "lucide-react";
import * as React from "react";
import { HOST } from "@/utils/enums/host";
import { isSessionExpired } from "@/utils/is_jwt_expired";
import useGlobalContext from "@/hooks/useContext/useGlobalContext";
import { IoMdClose } from "react-icons/io";
import { Button } from "@/components/ui/button";
import LoadingSpinnerLocal from "../../loading_spinner";
import { SearchResults } from "@/utils/interface/search_result_navbar";
import NavbarSearchResult from "./navbar_search_results";

export default function NavbarSearchIcon({ token }: { token: string }) {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [searchResults, setSearchResults] = React.useState<SearchResults[]>(
        []
    );
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    const { setIsJWTExpired, setIsSearchOpen, isSearchOpen } =
        useGlobalContext();

    React.useEffect(() => {
        if (searchQuery.trim().length === 0) {
            setSearchResults([]);
            return;
        }

        if (searchQuery.trim().length <= 3) {
            return;
        }

        const fetchSearchResults = async () => {
            setLoading(true);
            setError("");

            try {
                const response = await fetch(
                    `${
                        HOST.BACKEND_URL
                    }/api/v1/video/search?query=${encodeURIComponent(
                        searchQuery
                    )}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    if (isSessionExpired(data.error.code)) {
                        console.log("jwt error ", data.error.code);
                        setIsJWTExpired(true);
                        return;
                    }
                    throw new Error("Failed to fetch search results");
                }

                setSearchResults(data.data || []);
            } catch (err: any) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        // Debounce API calls
        const debounceTimeout = setTimeout(() => {
            fetchSearchResults();
        }, 300);

        return () => clearTimeout(debounceTimeout);
    }, [searchQuery]);

    return (
        <>
            <div>
                <Search color="black" onClick={() => setIsSearchOpen(true)} />
            </div>

            {isSearchOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-10">
                    <div className="bg-white p-4 rounded-lg w-[95vw] 700:w-1/3 max-h-[80vh] overflow-auto">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-lg font-semibold ">Search</h2>
                            <div>
                                <Button
                                    onClick={() => setIsSearchOpen(false)}
                                    variant="ghost">
                                    <IoMdClose />
                                </Button>
                            </div>
                        </div>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                            placeholder="Type a command or search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <div className="max-h-[60vh] overflow-y-auto">
                            {loading && (
                                <div className="flex items-center justify-center h-6">
                                    <LoadingSpinnerLocal size={20} />
                                </div>
                            )}
                            {error && (
                                <p className="text-red-500">Error: {error}</p>
                            )}
                            {!loading &&
                                !error &&
                                searchResults.length === 0 && (
                                    <p>No results found.</p>
                                )}
                            {!loading && !error && searchResults.length > 0 && (
                                <ul>
                                    {searchResults.map((result) => (
                                        <NavbarSearchResult
                                            result={result}
                                            setOpen={setIsSearchOpen}
                                        />
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
