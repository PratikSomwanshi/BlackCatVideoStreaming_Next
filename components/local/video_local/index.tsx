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
import { IoMdSettings } from "react-icons/io";
import { Volume2 } from "lucide-react";

export default function VideoPlayerLocal() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [volume, setVolume] = useState(0.8);
    const [seek, setSeek] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [sliderHoverTime, setSliderHoverTime] = useState<number | null>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    // Initialize HLS
    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            setTimeout(() => {
                video.src = "/test.mp4";
            }, 2000);
        }
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

    const handleSliderHover = (event: React.MouseEvent<HTMLDivElement>) => {
        if (sliderRef.current) {
            const sliderWidth = sliderRef.current.offsetWidth;
            const offsetX = event.nativeEvent.offsetX;
            const newTime = (offsetX / sliderWidth) * duration;
            setSliderHoverTime(newTime);
        }
    };

    return (
        <div
            className="relative w-[800px] h-[450px] bg-black group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            {/* Video */}
            <video
                ref={videoRef}
                className="w-full h-full pointer-events-none" // Prevent video from blocking clicks
                onTimeUpdate={handleProgress}
                onLoadedMetadata={() => {
                    const video = videoRef.current;
                    if (video) {
                        setDuration(video.duration);
                        setIsLoading(false);
                    }
                }}
                onPlay={() => {
                    setIsPlaying(true);
                    setIsLoading(false);
                }}
                onPause={() => setIsPlaying(false)}
                onWaiting={() => setIsLoading(true)}
                onPlaying={() => setIsLoading(false)}
            />

            {/* Loading Spinner */}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 pointer-events-none">
                    <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                </div>
            )}

            {/* Controls */}
            {!isLoading && (
                <div
                    className={`absolute inset-0 flex flex-col justify-between p-4 transition-opacity duration-300 z-10 ${
                        isHovered || !isPlaying ? "opacity-100" : "opacity-0"
                    }`}>
                    {/* Top Controls */}
                    <div className="flex justify-between text-white z-10">
                        <span className="font-bold">Video Title</span>
                        <Button
                            variant="ghost"
                            className="bg-transparent hover:bg-transparent px-2 py-1 rounded">
                            <IoMdSettings
                                style={{
                                    width: "1.5rem",
                                    height: "1.5rem",
                                }}
                                color="white"
                            />
                        </Button>
                    </div>

                    {/* Center Controls */}
                    <div className="absolute inset-0 flex items-center justify-center gap-4">
                        <div>
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    const video = videoRef.current;
                                    if (video) video.currentTime -= 10;
                                }}
                                className="bg-transparent hover:bg-transparent rounded z-10 ">
                                {/* <RotateCcw size={44} color="white" /> */}
                                <FaArrowRotateLeft
                                    style={{
                                        width: "1.8rem",
                                        height: "1.8rem",
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
                                            width: "2rem",
                                            height: "2rem",
                                        }}
                                    />
                                ) : (
                                    <FaPlay
                                        color="white"
                                        style={{
                                            width: "1.8rem",
                                            height: "1.8rem",
                                        }}
                                    />
                                )}
                            </Button>
                        </div>
                        <Button
                            onClick={() => {
                                const video = videoRef.current;
                                if (video) video.currentTime += 10;
                            }}
                            className="bg-transparent hover:bg-transparent px-4 py-2 ">
                            <FaArrowRotateRight
                                style={{
                                    width: "1.8rem",
                                    height: "1.8rem",
                                }}
                                color="white"
                            />
                        </Button>
                    </div>

                    {/* Bottom Controls */}
                    <div className="flex flex-col text-white">
                        <div className="flex justify-between items-center text-sm mb-1">
                            <span>{formatTime(seek)}</span>
                            <span>{formatTime(duration - seek)}</span>
                        </div>
                        <Slider
                            value={[seek]}
                            max={duration}
                            step={0.1}
                            onValueChange={handleSeekChange}
                            onMouseMove={handleSliderHover}
                            className="cursor-pointer"
                        />
                        {sliderHoverTime !== null && (
                            <div
                                className="absolute top-0 left-0 z-20 bg-black text-white text-sm px-2 py-1 rounded"
                                style={{
                                    left: `${
                                        (sliderHoverTime / duration) * 100
                                    }%`,
                                    transform: "translateX(-50%)",
                                    bottom: "30px",
                                }}>
                                {formatTime(sliderHoverTime)}
                            </div>
                        )}
                        <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center z-10">
                                <label htmlFor="volume" className="mr-2">
                                    <Volume2
                                        style={{
                                            width: "1.5rem",
                                            height: "1.5rem",
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
                                        width: "1.5rem",
                                        height: "1.5rem",
                                    }}
                                    color="white"
                                />
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
