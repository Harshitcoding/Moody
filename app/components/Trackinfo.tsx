import React from 'react';
import type { Track } from '@/types/index';

interface TrackInfoProps {
  track: Track | null;
}

export const TrackInfo: React.FC<TrackInfoProps> = ({ track }) => {
  return (
    <div className="flex-1">
      <h2 className="text-xl font-semibold mb-1">
        {track?.name || "Select a mood to play"}
      </h2>
      <p className="text-gray-400 mb-4">{track?.artist}</p>
    </div>
  );
};