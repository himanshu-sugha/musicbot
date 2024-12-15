import axios from 'axios';

const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Battle {
  id: string;
  track1: Track;
  track2: Track;
  votes: number;
  status: 'active' | 'completed';
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  votes: number;
}

export interface User {
  id: string;
  username: string;
  tokens: number;
  nfts: string[];
}

export const battleService = {
  getCurrentBattles: () => api.get<Battle[]>('/battles/active'),
  vote: (battleId: string, trackId: string) => 
    api.post(`/battles/${battleId}/vote`, { trackId }),
  getBattleResults: (battleId: string) => 
    api.get<Battle>(`/battles/${battleId}`),
};

export const userService = {
  getProfile: (userId: string) => api.get<User>(`/users/${userId}`),
  updateProfile: (userId: string, data: Partial<User>) => 
    api.patch(`/users/${userId}`, data),
};

export const playlistService = {
  getMoodPlaylist: (mood: string) => 
    api.get(`/playlists/mood/${mood}`),
};