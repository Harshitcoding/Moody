import React from 'react';

import type { Mood } from "@/types/index"


interface MoodSelectorProps {
  onMoodSelect: (mood: Mood) => void;
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({ onMoodSelect }) => {
  const moods: Mood[] = [
    { name: 'Happy', color: 'bg-yellow-400', params: { valence: 0.7, energy: 0.7 } },
    { name: 'Sad', color: 'bg-blue-500', params: { valence: 0.3, energy: 0.3 } },
    { name: 'Energetic', color: 'bg-orange-500', params: { energy: 0.8, danceability: 0.7 } },
    { name: 'Calm', color: 'bg-green-300', params: { energy: 0.3, acousticness: 0.7 } }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {moods.map((mood) => (
        <button
          key={mood.name}
          className={`h-32 ${mood.color} hover:opacity-90 transition-opacity`}
          onClick={() => onMoodSelect(mood)}
        >
          <span className="text-xl font-semibold">{mood.name}</span>
        </button>
      ))}
    </div>
  );
};
