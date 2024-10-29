

export interface Track {
    id: string;
    name: string;
    artist: string;
    albumArt?: string;
    duration: string;
    uri: string;
  }
  
  export interface Mood {
    name: string;
    color: string;
    params: {
      valence?: number;
      energy?: number;
      danceability?: number;
      acousticness?: number;
    };
  }