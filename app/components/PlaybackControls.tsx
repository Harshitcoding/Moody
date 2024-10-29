import React from 'react';

import { Play, Pause, SkipForward, Volume2 } from 'lucide-react';


interface PlaybackControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  duration: string;
}

export const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  isPlaying,
  onPlayPause,
  onNext,
  duration
}) => {
  return (
    <div className="flex items-center gap-4">
      <button
        className="h-12 w-12 rounded-full bg-white text-black flex justify-center items-center text-center"
        onClick={onPlayPause}
      >
        {isPlaying ? <Pause /> : <Play />}
      </button>
      <button className="text-white" onClick={onNext}>
        <SkipForward />
      </button>
      <button  className="text-white">
        <Volume2 />
      </button>

      <div className="flex-1 h-1 bg-gray-700 rounded-full">
        <div className="w-1/3 h-full bg-green-500 rounded-full"></div>
      </div>
      <span className="text-sm text-gray-400">{duration}</span>
    </div>
  );
};