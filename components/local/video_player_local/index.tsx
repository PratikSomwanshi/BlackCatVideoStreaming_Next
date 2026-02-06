"use client";
import React, { useRef, useState, useEffect } from "react";
import Hls from "hls.js";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
    FaArrowRotateLeft,
    FaArrowRotateRight,
    FaPause,
    FaPlay,
} from "react-icons/fa6";
import { RxEnterFullScreen } from "react-icons/rx";
import { Volume2 } from "lucide-react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

import { SessionData } from "@/utils/interface/iron_session";
import VideoSettingLocal from "../video_setting";
import { HOST } from "@/utils/enums/host";

export default function VideoPlayerLocal({
    id,
    session,
    tittle,
    description,
    filePath,
}: {
    id: string;
    session: SessionData;
    tittle: string;
    description: string;
    filePath: string;
}) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [volume, setVolume] = useState(0.8);
    const [seek, setSeek] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [sliderHoverTime, setSliderHoverTime] = useState<number | null>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const [videoTime, setVideoTime] = useState<number | undefined>(0);
    const [quality, setQuality] = useState<string>("1080p");
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (videoRef) {
            setVideoTime(videoRef.current?.currentTime);
        }
    }, [videoRef.current?.currentTime]);

    // Initialize HLS
    useEffect(() => {
        const video = videoRef.current;

        setIsLoading(true);
        if (video && Hls.isSupported()) {
            // Save current time before loading a new source

            const hls = new Hls();

            hls.loadSource(filePath);

            hls.attachMedia(video);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                console.log("Manifest loaded, starting playback.");
                if (videoTime) video.currentTime = videoTime;
                setIsLoading(false);
            });

            hls.on(Hls.Events.ERROR, (event: any, data: any) => {
                if (data.fatal) {
                    if (data.error) {
                        setError(
                            data.error.message || "Something went wrong..."
                        );
                    }
                }
            });
        } else if (video?.canPlayType("application/vnd.apple.mpegurl")) {
            // For Safari
            const currentTime = video.currentTime;

            video.src = `${HOST.BACKEND_URL}/api/v1/video/${id}/480p/playlist.m3u8`;
            video.setAttribute("Authorization", `Bearer ${session.token}`);
            video.addEventListener("loadedmetadata", () => {
                video.currentTime = currentTime; // Resume from saved time
                video.play();
                setIsLoading(false);
            });
        } else {
            console.error("This browser does not support HLS playback.");
        }
    }, []);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => {
            document.removeEventListener(
                "fullscreenchange",
                handleFullscreenChange
            );
        };
    }, []);

    const handleProgress = () => {
        const video = videoRef.current;

        if (video) {
            setSeek(video.currentTime);
        }
    };

    const togglePlay = () => {
        const video = videoRef.current;
        if (video) {
            if (isPlaying) {
                video.pause();
            } else {
                video.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleVolumeChange = (values: number[]) => {
        if (values && values[0] !== undefined) {
            const newVolume = values[0];
            const video = videoRef.current;
            if (video) {
                video.volume = newVolume;
                setVolume(newVolume);
            }
        }
    };

    const handleSeekChange = (values: number[]) => {
        if (values && values[0] !== undefined) {
            const newSeekTime = values[0];
            const video = videoRef.current;
            if (video) {
                video.currentTime = newSeekTime;
                setSeek(newSeekTime);
            }
        }
    };

    const formatTime = (time: number) => {
        const hrs = Math.floor(time / 3600);
        const mins = Math.floor((time % 3600) / 60);
        const secs = Math.floor(time % 60);
        return `${hrs > 0 ? `${hrs}:` : ""}${mins
            .toString()
            .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const handleSliderHover = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        if (!sliderRef.current) return;

        const sliderBounds = sliderRef.current.getBoundingClientRect();
        const hoverX = event.clientX - sliderBounds.left; // Mouse X position relative to the slider
        const hoverPercentage = Math.max(
            0,
            Math.min(hoverX / sliderBounds.width, 1)
        ); // Clamp between 0 and 1
        const hoverTime = hoverPercentage * duration;

        setSliderHoverTime(hoverTime);
    };

    if (error) {
        return (
            <div className="text-white flex justify-center items-center h-[38rem]  bg-black">
                <h3 className="text-xl">{error}</h3>
            </div>
        );
    }

    return (
        <div
            className="relative group bg-black text-white h-full w-full select-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            {/* Video Element */}
            <div className="relative w-full h-full flex items-center justify-center">
                <video
                    ref={videoRef}
                    className="w-full h-full max-h-full"
                    onTimeUpdate={handleProgress}
                    onLoadedMetadata={() => {
                        const video = videoRef.current;
                        if (video) {
                            setDuration(video.duration);
                        }
                    }}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onWaiting={() => setIsLoading(true)}
                    onPlaying={() => setIsLoading(false)}
                    onClick={togglePlay}
                />

                {/* Loading Spinner */}
                {isLoading && (
                    <div className="absolute inset-0 flex justify-center items-center bg-black/20 backdrop-blur-[2px]">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
            </div>

            {/* Overlays */}
            <div
                className={cn(
                    "absolute inset-0 transition-opacity duration-500",
                    isHovered || !isPlaying ? "opacity-100" : "opacity-0"
                )}>
                {/* Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

                {/* Top Bar */}
                <div className="absolute top-0 left-0 right-0 p-4 md:p-6 flex justify-between items-start">
                    <div className="flex flex-col gap-1 max-w-[80%]">
                        <h2 className="text-lg md:text-xl font-bold truncate drop-shadow-lg">
                            {tittle}
                        </h2>
                        <p className="text-xs text-gray-300 line-clamp-1 opacity-80">
                            {description}
                        </p>
                    </div>
                    <VideoSettingLocal
                        quality={quality}
                        setQuality={setQuality}
                        isFullscreen={isFullscreen}
                    />
                </div>

                {/* Center Play/Pause Button (Large) */}
                {!isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                togglePlay();
                            }}
                            className={cn(
                                "p-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all pointer-events-auto",
                                !isPlaying ? "scale-110 opacity-100" : "scale-100 opacity-0 group-hover:opacity-100"
                            )}>
                            {isPlaying ? (
                                <FaPause className="h-8 w-8 text-white" />
                            ) : (
                                <FaPlay className="h-8 w-8 text-white translate-x-0.5" />
                            )}
                        </button>
                    </div>
                )}

                {/* Bottom Controls */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 space-y-4">
                    {/* Progress Bar Area */}
                    <div className="relative flex items-center gap-4 group/slider">
                        <span className="text-xs font-mono min-w-[40px]">
                            {formatTime(seek)}
                        </span>
                        
                        <div className="relative flex-1 h-6 flex items-center group">
                            <SliderPrimitive.Root
                                ref={sliderRef}
                                className="relative flex w-full touch-none select-none items-center cursor-pointer h-full"
                                onMouseMove={handleSliderHover}
                                onValueChange={handleSeekChange}
                                onMouseEnter={() => setSliderHoverTime(null)}
                                onMouseLeave={() => setSliderHoverTime(null)}
                                min={0}
                                max={duration || 100}
                                step={0.1}
                                value={[seek]}>
                                <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-white/20 group-hover:h-1.5 transition-all">
                                    <SliderPrimitive.Range className="absolute h-full bg-primary" />
                                </SliderPrimitive.Track>
                                <SliderPrimitive.Thumb className="block h-3 w-3 rounded-full border border-primary bg-white ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 opacity-0 group-hover:opacity-100" />
                            </SliderPrimitive.Root>

                            {/* Hover Time Indicator */}
                            {sliderHoverTime !== null && (
                                <div
                                    className="absolute -top-8 px-2 py-1 bg-black/90 border border-white/10 text-[10px] rounded transform -translate-x-1/2"
                                    style={{
                                        left: `${(sliderHoverTime / duration) * 100}%`,
                                    }}>
                                    {formatTime(sliderHoverTime)}
                                </div>
                            )}
                        </div>

                        <span className="text-xs font-mono min-w-[40px] text-right">
                            {formatTime(duration)}
                        </span>
                    </div>

                    {/* Buttons Row */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 md:gap-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                    if (videoRef.current) videoRef.current.currentTime -= 10;
                                }}
                                className="hover:bg-white/10 rounded-full h-10 w-10">
                                <FaArrowRotateLeft className="h-5 w-5" />
                            </Button>
                            
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={togglePlay}
                                className="hover:bg-white/10 rounded-full h-10 w-10">
                                {isPlaying ? (
                                    <FaPause className="h-5 w-5" />
                                ) : (
                                    <FaPlay className="h-5 w-5 translate-x-0.5" />
                                )}
                            </Button>

                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                    if (videoRef.current) videoRef.current.currentTime += 10;
                                }}
                                className="hover:bg-white/10 rounded-full h-10 w-10">
                                <FaArrowRotateRight className="h-5 w-5" />
                            </Button>

                            <div className="flex items-center gap-2 ml-2 group/volume">
                                <Volume2 className="h-5 w-5 text-gray-400 group-hover/volume:text-white transition-colors" />
                                <div className="w-0 group-hover/volume:w-24 overflow-hidden transition-all duration-300">
                                    <Slider
                                        min={0}
                                        max={1}
                                        step={0.01}
                                        value={[volume]}
                                        onValueChange={handleVolumeChange}
                                        className="w-24"
                                    />
                                </div>
                            </div>
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                                const container = videoRef.current?.parentElement?.parentElement;
                                if (document.fullscreenElement) {
                                    document.exitFullscreen();
                                } else if (container?.requestFullscreen) {
                                    container.requestFullscreen();
                                }
                            }}
                            className="hover:bg-white/10 rounded-full h-10 w-10">
                            <RxEnterFullScreen className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
