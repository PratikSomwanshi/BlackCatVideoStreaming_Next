"use client";

import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Dispatch, SetStateAction, useState } from "react";
import { IoMdSettings } from "react-icons/io";

export default function VideoSettingLocal({
    quality,
    setQuality,
}: {
    quality: string;
    setQuality: Dispatch<SetStateAction<string>>;
}) {
    const [isOpen, setIsOpen] = useState(false); // Default quality

    const handleQualityChange = (quality: string) => {
        setQuality(quality);
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    className="bg-transparent hover:bg-transparent p-1 rounded"
                    onClick={() => setIsOpen(true)}>
                    <IoMdSettings
                        style={{
                            width: "1.25rem",
                            height: "1.25rem",
                        }}
                        color="white"
                    />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="max-w-[200px] shadow-none -translate-x-[5.8rem] -translate-y-8 p-0 py-1 px-2 m-0"
                side="top">
                <div className="h-auto">
                    {/* Header Section */}
                    <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center space-x-1">
                            <IoMdSettings
                                style={{
                                    width: "1.25rem",
                                    height: "1.25rem",
                                }}
                                color="black"
                            />
                            <h3 className="text-sm font-medium">Settings</h3>
                        </div>
                        <Button
                            variant="ghost"
                            className="p-0 bg-transparent hover:bg-transparent"
                            onClick={() => setIsOpen(false)}>
                            ❌
                        </Button>
                    </div>

                    {/* Video Quality Section */}
                    <div className="border-t pt-2">
                        <h4 className="text-xs font-semibold mb-1">
                            Video Quality
                        </h4>
                        <ul className="flex flex-wrap justify-around gap-2">
                            {[
                                "144p",
                                "240p",
                                "360p",
                                "480p",
                                "720p",
                                "1080p",
                            ].map((q) => (
                                <li
                                    key={q}
                                    className={`cursor-pointer text-sm w-[40%] h-7  px-2 py-1 rounded text-center ${
                                        quality === q
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-100"
                                    }`}
                                    onClick={() => handleQualityChange(q)}>
                                    {q}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
