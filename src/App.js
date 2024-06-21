import './App.css';
import React, { useState, useEffect } from 'react';

const womanNames = [
  "Прасковья", "Агриппина", "Глафира", "Алевтина", "Евдокия", "Матрона", "Серафима", "Суссана", "Фёкла", "Октябрина", "Евлампия", "Анфиса", "Августа", "Алмаза", "Амвросия", "Мстислава", "Павлина", "Таисия", "Юнона", "Зоя", "Рассказа", "Тереза", "Голуба", "Услада", "Дельфина", "Фрося", "Мотя", "Базилика", "Богдана"
];

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-bar">
      <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
    </div>
  );
};

const calculateTotalRounds = (length) => {
  let rounds = 0;
  while (length > 1) {
    rounds += length;
    length = Math.ceil(length / 2);
  }
  return rounds;
};

const App = () => {
  const [currentRound, setCurrentRound] = useState([]);
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [roundComplete, setRoundComplete] = useState(false);
  const [completedRounds, setCompletedRounds] = useState(0);
  const [totalRounds, setTotalRounds] = useState(0);

  useEffect(() => {
    const initialRound = shuffleArray(womanNames.map((name, index) => ({ name, index })));
    setCurrentRound(initialRound);
    setTotalRounds(calculateTotalRounds(initialRound.length));
  }, []);

  useEffect(() => {
    if (roundComplete) {
      setCompletedRounds(prev => prev + currentRound.length);
      if (selectedIndices.length === 1) {
        setCurrentRound(selectedIndices.map(index => currentRound.find(item => item.index === index)));
      } else {
        const newRound = shuffleArray(selectedIndices.map(index => currentRound.find(item => item.index === index)));
        setCurrentRound(newRound);
        setSelectedIndices([]);
        setCurrentPairIndex(0);
      }
      setRoundComplete(false);
    }
  }, [roundComplete, selectedIndices, currentRound]);

  const handleSelect = (selectedIndex) => {
    setSelectedIndices(prev => [...prev, selectedIndex]);
    if (currentPairIndex + 1 >= Math.floor(currentRound.length / 2)) {
      setRoundComplete(true);
    } else {
      setCurrentPairIndex(prev => prev + 1);
    }
  };

  const currentPair = currentRound.slice(currentPairIndex * 2, currentPairIndex * 2 + 2);

  const progress = ((completedRounds + currentPairIndex) / totalRounds) * 100;

  return (
    <div className="App">
      <h1 className="App-title">Самое необычное женское имя?</h1>
      <ProgressBar progress={progress} />
      {currentRound.length > 1 ? (
        currentPair.length === 2 ? (
          <div>
            <p className="App-text">Я выбираю:</p>
            <button className="App-button" onClick={() => handleSelect(currentPair[0].index)}>
              {currentPair[0].name}
            </button>
            <button className="App-button" onClick={() => handleSelect(currentPair[1].index)}>
              {currentPair[1].name}
            </button>
          </div>
        ) : (
          <p className="App-text">Ошибка</p>
        )
      ) : (
        <p className="App-text">Наш победитель: {currentRound[0]?.name}</p>
      )}
    </div>
  );
};

export default App;
