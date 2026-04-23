import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import type { Song } from '../types/config.types';
import { useSettings } from '../hooks/useSettings';

interface MusicContextType {
  currentSong: Song;
  isPlaying: boolean;
  volume: number; // Backward compatibility alias for musicVolume
  masterVolume: number;
  musicVolume: number;
  effectsVolume: number;
  play: () => void;
  pause: () => void;
  next: () => void;
  previous: () => void;
  setVolume: (key: 'masterVolume' | 'musicVolume' | 'effectsVolume', value: number) => void;
  playlist: Song[];
}

const PLAYLIST: Song[] = [
  { id: '1', title: 'Bad Sister', artist: 'Soundtrack', url: '/music/BadSister-Soundtrack-1.mp3' },
  { id: '2', title: 'Underclocked', artist: 'Eric Skiff', url: '/music/Eric-Skiff-Underclocked-Soundtrack-2.mp3' },
  { id: '3', title: 'Space Track 3', artist: 'Soundtrack', url: '/music/Soundtrack-3.mp3' },
  { id: '4', title: 'Space Track 4', artist: 'Soundtrack', url: '/music/Soundtrak-4.mp3' },
];

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { settings, updateVolume } = useSettings();
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const calculateVolume = () => {
    const master = settings.masterVolume ?? 80;
    const music = settings.musicVolume ?? 70;
    return (master / 100) * (music / 100);
  };

  useEffect(() => {
    audioRef.current = new Audio(PLAYLIST[currentSongIndex].url);
    audioRef.current.loop = true;
    audioRef.current.volume = calculateVolume();

    const handleEnded = () => next();
    audioRef.current.addEventListener('ended', handleEnded);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleEnded);
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = PLAYLIST[currentSongIndex].url;
      if (isPlaying) {
        audioRef.current.play().catch(err => console.log("Autoplay blocked or error:", err));
      }
    }
  }, [currentSongIndex]);

  useEffect(() => {
    if (audioRef.current) {
      const vol = calculateVolume();
      if (!isNaN(vol)) {
        audioRef.current.volume = vol;
      }
    }
  }, [settings.masterVolume, settings.musicVolume]);

  const play = () => {
    audioRef.current?.play();
    setIsPlaying(true);
  };

  const pause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const next = () => {
    setCurrentSongIndex((prev) => (prev + 1) % PLAYLIST.length);
  };

  const previous = () => {
    setCurrentSongIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
  };

  const setVolume = (key: 'masterVolume' | 'musicVolume' | 'effectsVolume', value: number) => {
    updateVolume(key, value);
  };

  return (
    <MusicContext.Provider value={{
      currentSong: PLAYLIST[currentSongIndex],
      isPlaying,
      volume: settings.musicVolume,
      masterVolume: settings.masterVolume,
      musicVolume: settings.musicVolume,
      effectsVolume: settings.effectsVolume,
      play,
      pause,
      next,
      previous,
      setVolume,
      playlist: PLAYLIST
    }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};
