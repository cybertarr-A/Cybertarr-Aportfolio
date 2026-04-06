import { create } from 'zustand';

type InteractionState = 'idle' | 'ai_hover' | 'automation_hover' | 'reality_hover' | 'robot_hover' | 'clicked';

interface LogEntry {
  id: string;
  source: string;
  message: string;
  timestamp: number;
}

interface SystemStore {
  interactionState: InteractionState;
  setInteractionState: (state: InteractionState) => void;
  logs: LogEntry[];
  addLog: (source: string, message: string) => void;
  robotSpeech: string | null;
  setRobotSpeech: (speech: string | null) => void;
}

export const useSystemStore = create<SystemStore>((set) => ({
  interactionState: 'idle',
  setInteractionState: (state) => set({ interactionState: state }),
  logs: [
    { id: 'initial-1', source: 'SYS', message: 'Initializing neural lattice...', timestamp: Date.now() },
    { id: 'initial-2', source: 'NET', message: 'Establishing secure tunnel...', timestamp: Date.now() + 1 },
  ],
  addLog: (source, message) => set((state) => ({
      logs: [...state.logs.slice(-30), { 
          id: Math.random().toString(36).substring(7), 
          source, 
          message, 
          timestamp: Date.now() 
      }]
  })),
  robotSpeech: null,
  setRobotSpeech: (speech) => set({ robotSpeech: speech }),
}));
