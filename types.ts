
export type TabType = 'home' | 'map' | 'diary' | 'community';

export interface User {
  name: string;
  rank: string;
  affiliation: string;
  points: number;
  completedMissions: number;
}

export interface Mission {
  id: string;
  title: string;
  location: string;
  status: 'completed' | 'ongoing' | 'not-started';
  coords: { x: number, y: number };
}

export interface BongsuAlert {
  id: string;
  user: string;
  message: string;
  time: string;
  type: 'question' | 'help';
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  date: string;
}
