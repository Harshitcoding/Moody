declare global {
    interface Window {
      onSpotifyWebPlaybackSDKReady: () => void;
      Spotify: any;
    }
  }
  
  export const loadSpotifySDK = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.async = true;
  
      document.body.appendChild(script);
  
      window.onSpotifyWebPlaybackSDKReady = () => {
        resolve(true);
      };
    });
  };