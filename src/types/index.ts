export interface BibleQuestion {
  verse: string;
  answer: string;
  fullVerse: string;
  initialSound: string;
}

export interface GameState {
  currentQuestion: number;
  correctAnswers: number;
  totalQuestions: number;
  gameStatus: 'ready' | 'playing' | 'finished';
}

export type CertificateLevel = 
  | '성경 마스터'
  | '성경 마스터 예정자'
  | '성경 마스터 잠재 예정자'
  | '성경 마스터 희망자'; 