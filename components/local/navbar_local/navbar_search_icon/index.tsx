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
        <div className="flex items-center">
            <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full hover:bg-muted"
                onClick={() => setIsSearchOpen(true)}
            >
                <Search className="h-5 w-5 text-foreground/70 hover:text-foreground" />
            </Button>

            {isSearchOpen && (
                <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex justify-center items-start pt-[10vh] z-[100]">
                    <div className="bg-card border shadow-2xl rounded-2xl w-[95vw] max-w-2xl max-h-[80vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-4 border-b flex justify-between items-center">
                            <h2 className="text-xl font-bold px-2">Search Videos</h2>
                            <Button
                                onClick={() => setIsSearchOpen(false)}
                                variant="ghost"
                                size="icon"
                                className="rounded-full"
                            >
                                <IoMdClose className="h-5 w-5" />
                            </Button>
                        </div>
                        
                        <div className="p-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <input
                                    autoFocus
                                    type="text"
                                    className="w-full bg-muted/50 border-none rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    placeholder="Type to search content..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto px-4 pb-4">
                            {loading && (
                                <div className="flex flex-col items-center justify-center py-12 gap-2 text-muted-foreground">
                                    <LoadingSpinnerLocal size={32} />
                                    <p className="text-sm">Searching...</p>
                                </div>
                            )}
                            {error && (
                                <div className="p-4 bg-destructive/10 text-destructive rounded-xl text-center">
                                    Error: {error}
                                </div>
                            )}
                            {!loading &&
                                !error &&
                                searchQuery.trim().length > 3 &&
                                searchResults.length === 0 && (
                                    <div className="py-12 text-center text-muted-foreground">
                                        No results found for "{searchQuery}"
                                    </div>
                                )}
                            {!loading && !error && searchResults.length > 0 && (
                                <ul className="space-y-2">
                                    {searchResults.map((result) => (
                                        <NavbarSearchResult
                                            key={result.id}
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
        </div>
    );
}
