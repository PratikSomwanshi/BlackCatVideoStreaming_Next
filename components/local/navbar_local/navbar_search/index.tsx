"use client";
import { Input } from "@/components/ui/input";
import { CircleX } from "lucide-react";
import React, { useRef, useState } from "react";

function NavbarSearch() {
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClearInput = () => {
        setInputValue("");
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <div className="">
            <div className="relative">
                <Input
                    id="input-24"
                    ref={inputRef}
                    className="pe-9 w-[20rem]"
                    placeholder="Search..."
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                {inputValue && (
                    <button
                        className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Clear input"
                        onClick={handleClearInput}>
                        <CircleX size={16} strokeWidth={2} aria-hidden="true" />
                    </button>
                )}
            </div>
        </div>
    );
}

export default NavbarSearch;
