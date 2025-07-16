import React, { useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import useSound from 'use-sound';
import html2canvas from 'html2canvas';
import { CertificateLevel } from '../types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
`;

const Certificate = styled.div`
  background-color: white;
  border: 2px solid #4CAF50;
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const Level = styled.div`
  font-size: 1.8rem;
  color: #4CAF50;
  margin: 1rem 0;
  font-weight: bold;
`;

const Button = styled(motion.button)`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin: 0.5rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

interface ResultScreenProps {
  correctAnswers: number;
  totalQuestions: number;
  onRestart: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({
  correctAnswers,
  totalQuestions,
  onRestart,
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [playSuccess] = useSound('/assets/suc_01.mp3');
  const [playFail] = useSound('/assets/fail_01.mp3');

  useEffect(() => {
    if (correctAnswers > 0) {
      playSuccess();
    } else {
      playFail();
    }
  }, []);

  const getCertificateLevel = (): CertificateLevel => {
    switch (correctAnswers) {
      case 3:
        return '성경 마스터';
      case 2:
        return '성경 마스터 예정자';
      case 1:
        return '성경 마스터 잠재 예정자';
      default:
        return '성경 마스터 희망자';
    }
  };

  const getMessage = (): string => {
    switch (correctAnswers) {
      case 3:
        return '🎉 축하합니다! 당신은 성경을 열심히 읽는 분이시군요!!';
      case 2:
        return '🎉 축하합니다! 당신은 성경을 쫌 읽으시는 분이시군요!';
      case 1:
        return '🎉 축하합니다! 당신은 성경을 종종 읽는 분이시군요!';
      default:
        return '아쉽습니다. 다음엔 더 잘하실 수 있을 거에요!';
    }
  };

  const handleSave = async () => {
    if (certificateRef.current) {
      const canvas = await html2canvas(certificateRef.current);
      const link = document.createElement('a');
      link.download = '성경마스터_인증서.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <Container>
      <Certificate ref={certificateRef}>
        <Title>성경마스터 인증서</Title>
        <Message>{getMessage()}</Message>
        <Level>🥤 {getCertificateLevel()}</Level>
        <Message>맞춘 문제: {correctAnswers}/{totalQuestions}</Message>
      </Certificate>
      <div>
        <Button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
        >
          상장 저장하기 💾
        </Button>
        <Button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRestart}
        >
          홈으로 🏠
        </Button>
      </div>
    </Container>
  );
};

export default ResultScreen; 