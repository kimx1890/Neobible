import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import useSound from 'use-sound';
import { bibleVerses } from '../data/bibleVerses';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
`;

const QuestionCount = styled.div`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 1rem;
`;

const Question = styled.div`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
  line-height: 1.6;
`;

const TimerBar = styled(motion.div)`
  width: 100%;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  margin-bottom: 2rem;
  overflow: hidden;
`;

const TimerProgress = styled(motion.div)`
  height: 100%;
  background-color: #4CAF50;
  border-radius: 4px;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  font-size: 1.2rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;

  &:focus {
    outline: none;
    border-color: #4CAF50;
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

interface GameScreenProps {
  currentQuestion: number;
  onCorrectAnswer: () => void;
  onWrongAnswer: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({
  currentQuestion,
  onCorrectAnswer,
  onWrongAnswer,
}) => {
  const [answer, setAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(15);
  const [playCorrect] = useSound('/assets/Ascending 3.mp3');
  const [playWrong] = useSound('/assets/fail_01.mp3');

  const currentVerse = bibleVerses[currentQuestion];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleWrongAnswer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion]);

  const handleSubmit = () => {
    if (answer.trim().toLowerCase() === currentVerse.answer.toLowerCase()) {
      playCorrect();
      onCorrectAnswer();
    } else {
      handleWrongAnswer();
    }
  };

  const handleWrongAnswer = () => {
    playWrong();
    onWrongAnswer();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <Container>
      <QuestionCount>문제 {currentQuestion + 1}/3</QuestionCount>
      <TimerBar>
        <TimerProgress
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: 15, ease: 'linear' }}
        />
      </TimerBar>
      <Question>{currentVerse.verse}</Question>
      <Input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="답을 입력하세요"
        autoFocus
      />
      <SubmitButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSubmit}
      >
        확인
      </SubmitButton>
    </Container>
  );
};

export default GameScreen; 