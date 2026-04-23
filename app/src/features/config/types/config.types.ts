export interface AudioSettings {
    masterVolume: number;
    musicVolume: number;
    effectsVolume: number;
}

export interface Song {
    id: string;
    title: string;
    artist: string;
    url: string;
}
