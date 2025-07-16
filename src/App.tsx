import React, { useState } from 'react';
import styled from '@emotion/styled';
import { GameState } from './types';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #f5f5f5;
  font-family: 'Suit', 'Google Sans', sans-serif;
`;

const App = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentQuestion: 0,
    correctAnswers: 0,
    totalQuestions: 3,
    gameStatus: 'ready'
  });

  const startGame = () => {
    setGameState(prev => ({ ...prev, gameStatus: 'playing', currentQuestion: 0, correctAnswers: 0 }));
  };

  const handleCorrectAnswer = () => {
    setGameState(prev => ({
      ...prev,
      correctAnswers: prev.correctAnswers + 1,
      currentQuestion: prev.currentQuestion + 1,
      gameStatus: prev.currentQuestion === prev.totalQuestions - 1 ? 'finished' : 'playing'
    }));
  };

  const handleWrongAnswer = () => {
    setGameState(prev => ({
      ...prev,
      currentQuestion: prev.currentQuestion + 1,
      gameStatus: prev.currentQuestion === prev.totalQuestions - 1 ? 'finished' : 'playing'
    }));
  };

  const resetGame = () => {
    setGameState({
      currentQuestion: 0,
      correctAnswers: 0,
      totalQuestions: 3,
      gameStatus: 'ready'
    });
  };

  return (
    <AppContainer>
      {gameState.gameStatus === 'ready' && (
        <StartScreen onStart={startGame} />
      )}
      {gameState.gameStatus === 'playing' && (
        <GameScreen
          currentQuestion={gameState.currentQuestion}
          onCorrectAnswer={handleCorrectAnswer}
          onWrongAnswer={handleWrongAnswer}
        />
      )}
      {gameState.gameStatus === 'finished' && (
        <ResultScreen
          correctAnswers={gameState.correctAnswers}
          totalQuestions={gameState.totalQuestions}
          onRestart={resetGame}
        />
      )}
    </AppContainer>
  );
};

export default App; 