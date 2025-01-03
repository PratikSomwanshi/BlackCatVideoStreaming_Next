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
            className="relative  group bg-black text-black h-[38rem] "
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            {/* Video */}
            <div>
                <video
                    ref={videoRef}
                    className="w-full h-full pointer-events-none" // Prevent video from blocking clicks
                    onTimeUpdate={handleProgress}
                    onLoadedMetadata={() => {
                        const video = videoRef.current;
                        if (video) {
                            setDuration(video.duration);
                        }
                    }}
                    onPlay={() => {
                        setIsPlaying(true);
                    }}
                    onPause={() => setIsPlaying(false)}
                    onWaiting={() => setIsLoading(true)}
                    onPlaying={() => setIsLoading(false)}
                />

                {/* Top Overlay with Gradient */}
                <div
                    className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black via-transparent to-transparent transition-opacity duration-300 ${
                        isHovered || !isPlaying ? "opacity-100" : "opacity-0"
                    }`}
                />

                {isLoading && (
                    <div className="absolute top-[50%] left-[50%] flex justify-center items-center transform -translate-x-1/2 -translate-y-1/2 ">
                        <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                    </div>
                )}

                {/* Bottom Overlay with Increased Height and Gradient */}
                <div
                    className={`absolute bottom-0 left-0 right-0 h-52 bg-gradient-to-t from-black via-transparent to-transparent transition-opacity duration-300 ${
                        isHovered || !isPlaying ? "opacity-100" : "opacity-0"
                    }`}
                />

                {/* Controls */}
                {
                    <div
                        className={`absolute inset-0 flex flex-col justify-between p-1 300:p-4 transition-opacity duration-300 z-10 ${
                            isHovered || !isPlaying
                                ? "opacity-100"
                                : "opacity-0"
                        }`}>
                        {/* Top Controls */}
                        <div className="flex justify-between text-white z-10">
                            <span className="font-medium 400:font-bold">
                                {tittle}
                            </span>

                            <div>
                                <VideoSettingLocal
                                    quality={quality}
                                    setQuality={setQuality}
                                    isFullscreen={isFullscreen}
                                />
                            </div>
                        </div>

                        {/* Center Controls */}
                        <div className="absolute inset-0 ">
                            {!isLoading && (
                                <div className="h-full flex items-center justify-center gap-1 300:gap-4">
                                    <div>
                                        <Button
                                            variant="ghost"
                                            onClick={() => {
                                                const video = videoRef.current;
                                                if (video)
                                                    video.currentTime -= 10;
                                            }}
                                            className="bg-transparent hover:bg-transparent rounded z-10 ">
                                            <FaArrowRotateLeft
                                                style={{
                                                    width: "1.5em",
                                                    height: "1.5em",
                                                }}
                                                color="white"
                                            />
                                        </Button>
                                    </div>
                                    <div className=" h-20 w-14 flex justify-center items-center">
                                        <Button
                                            variant="ghost"
                                            onClick={togglePlay}
                                            className="bg-transparent hover:bg-transparent  rounded">
                                            {isPlaying ? (
                                                <FaPause
                                                    color="white"
                                                    style={{
                                                        width: "1.6em",
                                                        height: "1.6em",
                                                    }}
                                                />
                                            ) : (
                                                <FaPlay
                                                    color="white"
                                                    style={{
                                                        width: "1.5em",
                                                        height: "1.5em",
                                                    }}
                                                />
                                            )}
                                        </Button>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        onClick={() => {
                                            const video = videoRef.current;
                                            if (video) video.currentTime += 10;
                                        }}
                                        className="bg-transparent hover:bg-transparent px-4 py-2 ">
                                        <FaArrowRotateRight
                                            style={{
                                                width: "1.4em",
                                                height: "1.4em",
                                            }}
                                            color="white"
                                        />
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Bottom Controls */}
                        <div className="flex flex-col  text-white ">
                            <div className="flex  justify-end items-center relative">
                                <span>{formatTime(seek)}</span>

                                <SliderPrimitive.Root
                                    ref={sliderRef}
                                    className={cn(
                                        "relative flex w-full touch-none select-none items-center px-1 cursor-pointer transition-[height] duration-300 ease-in-out h-1.5 hover:h-[0.65rem]"
                                    )}
                                    onMouseMove={handleSliderHover}
                                    onValueChange={handleSeekChange}
                                    onMouseEnter={() =>
                                        setSliderHoverTime(null)
                                    }
                                    onMouseLeave={() =>
                                        setSliderHoverTime(null)
                                    }
                                    min={0}
                                    max={duration}
                                    step={0.1}
                                    value={[seek]}>
                                    <SliderPrimitive.Track className="relative h-full w-full grow overflow-hidden rounded-full bg-slate-500 bg-opacity-50">
                                        <SliderPrimitive.Range className="absolute h-full bg-white rounded-lg" />
                                    </SliderPrimitive.Track>
                                </SliderPrimitive.Root>

                                <span>{formatTime(duration - seek)}</span>

                                {sliderHoverTime !== null && (
                                    <div
                                        className="absolute -top-4 left-0 h-5 px-1 z-20 bg-black text-white text-sm rounded"
                                        style={{
                                            left: `${
                                                (sliderHoverTime / duration) *
                                                100
                                            }%`,
                                            transform: "translateX(-50%)",
                                            bottom: "30px",
                                        }}>
                                        {formatTime(sliderHoverTime)}
                                    </div>
                                )}
                            </div>
                            <div className="hidden 300:flex justify-between items-center">
                                <div className="flex items-center z-10">
                                    <label htmlFor="volume" className="mr-2">
                                        <Volume2
                                            style={{
                                                width: "1.5em",
                                                height: "1.5em",
                                            }}
                                            color="white"
                                        />
                                    </label>
                                    <Slider
                                        min={0}
                                        max={1}
                                        step={0.01}
                                        value={[volume]}
                                        onValueChange={handleVolumeChange}
                                        className="w-32 z-10 cursor-pointer"
                                    />
                                </div>
                                <Button
                                    className="z-10 bg-transparent hover:bg-transparent"
                                    variant="ghost"
                                    onClick={() => {
                                        const container =
                                            videoRef.current?.parentElement;
                                        if (document.fullscreenElement) {
                                            // If in fullscreen mode, exit fullscreen
                                            document.exitFullscreen();
                                        } else if (container) {
                                            // If not in fullscreen, enter fullscreen
                                            if (container.requestFullscreen) {
                                                container.requestFullscreen();
                                            }
                                        }
                                    }}>
                                    <RxEnterFullScreen
                                        style={{
                                            width: "1.5em",
                                            height: "1.5em",
                                        }}
                                        color="white"
                                    />
                                </Button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}
