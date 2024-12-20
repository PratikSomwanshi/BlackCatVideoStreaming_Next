"use client";

import { Button } from "@/components/ui/button";
import {
    Dispatch,
    SetStateAction,
    useState,
    RefObject,
    useRef,
    useEffect,
} from "react";
import { IoMdSettings } from "react-icons/io";

interface VideoSettingLocalProps {
    quality: string;
    setQuality: Dispatch<SetStateAction<string>>;
    isFullscreen: boolean;
}

const VideoSettingLocal: React.FC<VideoSettingLocalProps> = ({
    quality,
    setQuality,
    isFullscreen,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });

    const qualities = ["144p", "240p", "360p", "480p", "720p", "1080p"];

    const handleQualityChange = (selectedQuality: string) => {
        setQuality(selectedQuality);
        setIsOpen(false);
    };

    // Update menu position when opening or when fullscreen changes
    useEffect(() => {
        if (isOpen && buttonRef.current) {
            setMenuPosition({
                top: 0,
                right: 0,
            });
        }
    }, [isOpen, isFullscreen]);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <Button
                ref={buttonRef}
                variant="ghost"
                size="icon"
                className="bg-transparent hover:bg-transparent p-1 rounded"
                onClick={() => setIsOpen(!isOpen)}>
                <IoMdSettings
                    style={{
                        width: "1.25rem",
                        height: "1.25rem",
                    }}
                    color="white"
                />
            </Button>

            {isOpen && (
                <div
                    style={{
                        position: "absolute",
                        top: menuPosition.top,
                        right: menuPosition.right,
                    }}
                    className={`
                        w-[250px] bg-black bg-opacity-90 
                        rounded-lg shadow-lg border border-gray-700 p-4 z-50
                    `}>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-white">
                            <IoMdSettings className="w-5 h-5" />
                            <span className="text-sm font-medium">
                                Settings
                            </span>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:text-gray-300 transition-colors">
                            ×
                        </button>
                    </div>

                    <div className="space-y-2">
                        <h4 className="text-sm font-medium text-white mb-2">
                            Video Quality
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                            {qualities.map((q) => (
                                <button
                                    key={q}
                                    onClick={() => handleQualityChange(q)}
                                    className={`
                                        px-3 py-2 text-sm rounded-md transition-colors
                                        ${
                                            quality === q
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-700 text-white hover:bg-gray-600"
                                        }
                                    `}>
                                    {q}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoSettingLocal;
