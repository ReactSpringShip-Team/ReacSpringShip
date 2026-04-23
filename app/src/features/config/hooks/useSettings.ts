import { useState, useEffect } from 'react';

const SETTINGS_KEY = 'reactship_settings';

interface Settings {
  masterVolume: number;
  musicVolume: number;
  effectsVolume: number;
}

export const useSettings = () => {
  const defaultSettings: Settings = {
    masterVolume: 80,
    musicVolume: 70,
    effectsVolume: 100
  };

  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (!saved) return defaultSettings;
    
    try {
      const parsed = JSON.parse(saved);
      // Merge saved with defaults to handle cases where new properties were added
      return { ...defaultSettings, ...parsed };
    } catch (e) {
      return defaultSettings;
    }
  });

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateVolume = (key: keyof Settings, value: number) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return {
    settings,
    updateVolume
  };
};
