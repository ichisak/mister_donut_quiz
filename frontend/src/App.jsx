import React, { useEffect, useState } from 'react';
import './App.css';

const BASE_URL = 'https://backend-service-172686701692.asia-northeast1.run.app' || 'http://localhost:3001';

function App() {
  const [quizList, setQuizList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

useEffect(() => {
    const API_URL = `${BASE_URL}/api/quiz`;

    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const shuffled = [...data].sort(() => Math.random() - 0.5);
        setQuizList(shuffled);
      });
  }, []);

  if (quizList.length === 0) return <div>Loading...</div>;

  const quiz = quizList[currentIndex];

  const handleSubmit = (e) => {
    e.preventDefault();
    const normalize = (str) =>
    str.trim().toLowerCase().replace(/[・\s\-ー＿]/g, '');

    const isCorrect = normalize(answer) === normalize(quiz.answer);
    
    setResult(isCorrect ? '正解！' : '不正解...正解は「'+ quiz.answer +'」です');
    if (isCorrect) {
    setCorrectCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < quizList.length) {
    setCurrentIndex(prev => prev + 1);
    setAnswer('');
    setResult('');
    } else {
    setIsQuizFinished(true); // 最後の問題が終わったら終了フラグ
    }
  };

  const resetQuiz = () => {
  const shuffled = [...quizList].sort(() => Math.random() - 0.5);
  setQuizList(shuffled);
  setCurrentIndex(0);
  setAnswer('');
  setResult('');
  setCorrectCount(0);
  setIsQuizFinished(false);
};

  return (
    <div className="App">
    {isQuizFinished ? (
      <div>
        <h2>クイズ終了！</h2>
        <p>あなたの正解数は {correctCount} / {quizList.length} 問です。</p>
        {correctCount === quizList.length && (
      　<p style={{ color: 'gold', fontWeight: 'bold' }}>🎉素晴らしい！あなたはミスドマスターです！！🎉</p>
        )}
        <button onClick={resetQuiz}>もう一度挑戦する</button>
      </div>
    ) : (
      <>
        <h2>{quiz.question}</h2>
        <img src={`${BASE_URL}${quiz.image}`} alt="quiz" width="300" />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            disabled={!!result}
          />
          <button type="submit" disabled={!!result}>回答する</button>
        </form>
        {result && (
          <>
            <p>{result}</p>
            <button onClick={handleNext}>次の問題へ</button>
          </>
        )}
        <p>正解数: {correctCount} / {quizList.length}</p>
      </>
    )}
  </div>
  );
}

export default App;
