import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import styles from '../styles/BubbleGame.module.css';
import bubbleStyles from '../styles/Bubbles.module.css';

const BubbleGame = () => {
  const [bubbles, setBubbles] = useState([]);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    // Start the game timer
    let timer;
    if (isPlaying && timeLeft > 0) {
        timer = setInterval(() => {
          setTimeLeft(prevTime => prevTime - 1);
        }, 1000);
      } else if (timeLeft === 0) {
        setIsPlaying(false);
      }
      return () => clearInterval(timer);
    }, [isPlaying, timeLeft]);

  useEffect(() => {
    if (isPlaying) {
      // Create new bubbles at random intervals
      const interval = setInterval(() => {
        if (bubbles.length < 10) {
          const newBubble = {
            id: Math.random(),
            top: Math.random() * 80 + "%",
            left: Math.random() * 80 + "%"
          };
          setBubbles(prevBubbles => [...prevBubbles, newBubble]);
        }
      }, 500);

      return () => clearInterval(interval);
    }
  }, [isPlaying, bubbles]);

  const handleBubbleClick = (id) => {
    setScore(score + 1);
    setBubbles(bubbles.filter(bubble => bubble.id !== id));
  };

  const startGame = () => {
    setIsPlaying(true);
    setTimeLeft(60);
  };

  return (
    <div className={`${styles.gameContainer} pt-5`}>
      <div className={styles.score}>Score: <strong>{score}</strong></div>
      {isPlaying ? (
        <>
        <div className={styles.timer}>Time Left: <strong>{timeLeft}s</strong></div>
        <div className={styles.bubbleContainer}>
          {bubbles.map(bubble => (
            <div
              key={bubble.id}
              className={styles.bubble}
              style={{ top: bubble.top, left: bubble.left }}
              onClick={() => handleBubbleClick(bubble.id)}
            ></div>
          ))}
        </div>
        {!isPlaying && <div><strong>Game Over! Your final score is {score}</strong></div>}
        </>
        ) : (
            <div onClick={startGame}>
            <Card className={`${bubbleStyles.Bubble} mx-auto mt-5`}>
            <strong className={`${styles.startGame} m-auto text-uppercase`} style={{ fontSize: "20px" }}>Start Game</strong>
            </Card>
            </div>
      )}
    </div>
  );
};

export default BubbleGame;
