// lib/spotify.ts
import { SpotifyApi } from '@spotify/web-api-ts-sdk';

const clientId = "a1f7afe124e64d6fa056dc775170454e"; // Spotify Developer Portal se milega

export const spotify = SpotifyApi.withClientCredentials(
  clientId,
  "a3d33f268bd345eab0b6511c460b5bbe"
);