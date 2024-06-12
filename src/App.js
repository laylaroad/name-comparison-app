import './App.css';
import React, { useState, useEffect } from 'react';

const womanNames = [
  "Прасковья", "Агриппина", "Глафира", "Алевтина", "Евдокия", "Матрона", "Серафима", "Суссана", "Фёкла", "Октябрина", "Евлампия", "Анфиса", "Августа", "Алмаза", "Амвросия", "Мстислава", "Павлина", "Таисия", "Юнона", "Рассказа"
];

const App = () => {
  const [currentRound, setCurrentRound] = useState([]);
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [roundComplete, setRoundComplete] = useState(false);

  useEffect(() => {
    const initialRound = womanNames.map((name, index) => ({ name, index }));
    setCurrentRound(initialRound);
  }, []);

  useEffect(() => {
    if (roundComplete) {
      if (selectedIndices.length === 1) {
        //Winner is not found
        setCurrentRound(selectedIndices.map(index => currentRound.find(item => item.index === index)));
      } else {
        //Start of the next round
        const newRound = selectedIndices.map(index => currentRound.find(item => item.index === index));
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

  return (
    <div className="App">
      <h1 className="App-title">Самое необычное женское имя?</h1>
      {currentRound.length > 1 ? (
        currentPair.length === 2 ? (
          <div>
            <p>Я выбираю:</p>
            <button className="App-button" onClick={() => handleSelect(currentPair[0].index)}>
              {currentPair[0].name}
            </button>
            <button className="App-button" onClick={() => handleSelect(currentPair[1].index)}>
              {currentPair[1].name}
            </button>
          </div>
        ) : (
          <p>Ошибка: Пара не сформирована должным образом</p>
        )
      ) : (
        <p>Наш победитель: {currentRound[0]?.name}</p>
      )}
    </div>
  );
};

export default App;
