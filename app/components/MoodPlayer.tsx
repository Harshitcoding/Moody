'use client'
import React, { useState } from 'react';
import { MoodSelector } from './MoodSelector';
import { Player } from './Player';
import type { Track, Mood } from '@/types/index';
import { spotify } from '@/lib/spotify';

export const MoodPlayer: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(-1);
  const [currentMood, setCurrentMood] = useState<Mood | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentTrack = currentTrackIndex >= 0 ? tracks[currentTrackIndex] : null;

  const msToMinutesAndSeconds = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`;
  };

  const fetchTracks = async (mood: Mood) => {
    try {
      const recommendations = await spotify.recommendations.get({
        seed_genres: ['pop'],
        target_valence: mood.params.valence,
        target_energy: mood.params.energy,
        limit: 20  // Fetch more tracks at once
      });

      const formattedTracks = recommendations.tracks.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        albumArt: track.album.images[0]?.url,
        duration: msToMinutesAndSeconds(track.duration_ms),
        uri: track.uri
      }));

      setTracks(formattedTracks);
      setCurrentTrackIndex(0);
      setIsPlaying(true);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  const handleMoodSelect = async (mood: Mood) => {
    setCurrentMood(mood);
    await fetchTracks(mood);
  };

  const handleNext = async () => {
    // If we're at the last track or near the end, fetch more tracks
    if (currentTrackIndex >= tracks.length - 3 && currentMood) {
      try {
        const newRecommendations = await spotify.recommendations.get({
          seed_genres: ['pop'],
          target_valence: currentMood.params.valence,
          target_energy: currentMood.params.energy,
          limit: 20
        });

        const newTracks = newRecommendations.tracks.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          albumArt: track.album.images[0]?.url,
          duration: msToMinutesAndSeconds(track.duration_ms),
          uri: track.uri
        }));

        // Append new tracks to existing playlist
        setTracks(prevTracks => [...prevTracks, ...newTracks]);
      } catch (error) {
        console.error('Error fetching more tracks:', error);
      }
    }

    // Move to next track if available
    if (currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex(prevIndex => prevIndex + 1);
    }
  };

  // Optional: Auto-play next track when current track ends
  const handleTrackEnd = () => {
    handleNext();
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">MoodPlay</h1>
        <p className="text-gray-400">Select your mood to start listening</p>
      </div>

      <MoodSelector onMoodSelect={handleMoodSelect} />
      
      <Player
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onNext={handleNext}
      />

      {/* Optional: Display upcoming tracks */}
      {tracks.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-white mb-4">Up Next</h2>
          <div className="space-y-2">
            {tracks.slice(currentTrackIndex + 1, currentTrackIndex + 4).map((track) => (
              <div key={track.id} className="flex items-center space-x-4 text-gray-400">
                <img
                  src={track.albumArt}
                  alt={track.name}
                  className="w-10 h-10 rounded"
                />
                <div>
                  <p className="text-white">{track.name}</p>
                  <p className="text-sm">{track.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
