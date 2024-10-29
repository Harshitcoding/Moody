import React from 'react';
import { PlaybackControls } from './PlaybackControls';
import type { Track } from '@/types/index';
import { TrackInfo } from './Trackinfo';

interface PlayerProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
}

export const Player: React.FC<PlayerProps> = ({
  currentTrack,
  isPlaying,
  onPlayPause,
  onNext
}) => {
  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-lg">
      <div className="p-6">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-gray-700 rounded-lg">
            {currentTrack?.albumArt && (
              <img
                src={currentTrack.albumArt}
                alt="Album Art"
                className="w-full h-full object-cover rounded-lg"
              />
            )}
          </div>

          <div className="flex-1">
            <TrackInfo track={currentTrack} />
            <PlaybackControls
              isPlaying={isPlaying}
              onPlayPause={onPlayPause}
              onNext={onNext}
              duration={currentTrack?.duration || "0:00"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};