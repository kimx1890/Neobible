import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 2rem;
`;

const Description = styled.div`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const StartButton = styled(motion.button)`
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

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <Container>
      <Title>성경마스터 인증게임!</Title>
      <Description>
        <p>👉 15초 안에 괄호 안에 알맞은 단어를 입력하세요!</p>
        <p>총 3문제가 출제되며,</p>
        <p>맞춘 문제 수에 따라</p>
        <p>각기 다른 인증서가 발급됩니다!</p>
      </Description>
      <StartButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
      >
        시작하기 ▶️
      </StartButton>
    </Container>
  );
};

export default StartScreen; 