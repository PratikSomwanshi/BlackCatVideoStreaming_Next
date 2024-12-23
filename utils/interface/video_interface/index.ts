export interface TooltipState {
    visible: boolean;
    position: number; // Pixel position of the tooltip
    value: number; // Tooltip value (slider value at the position)
}

// video card

export interface VideoCardProps {
    title: string;
    description: string;
    thumbnail: string;
    video_id: string;
    isVideoPremium: boolean;
    fallback_image_url?: string;
}

export interface IVideoCard {
    id: string;
    thumbnail: string;
    description: string;
    title: string;
    isPremium: boolean;
}

// video player

export interface VideoPlayerProps {
    videoUrl: string;
}
