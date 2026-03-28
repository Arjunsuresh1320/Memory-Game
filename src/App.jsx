import { useState, useEffect } from "react";
import "./App.css";

const emojis = ["🍎", "🍌", "🍇", "🍉", "🍒", "🥝"];

function shuffleArray(array) {
  return [...array, ...array]
    .sort(() => Math.random() - 0.5)
    .map((item, index) => ({
      id: index,
      value: item,
      flipped: false,
      matched: false,
    }));
}

function App() {
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    startGame();
  }, []);

  const startGame = () => {
    setCards(shuffleArray(emojis));
    setSelected([]);
    setMoves(0);
  };

  const handleClick = (card) => {
    if (card.flipped || card.matched || selected.length === 2) return;

    const updatedCards = cards.map((c) =>
      c.id === card.id ? { ...c, flipped: true } : c
    );

    const newSelected = [...selected, card];

    setCards(updatedCards);
    setSelected(newSelected);

    if (newSelected.length === 2) {
      setMoves((m) => m + 1);

      setTimeout(() => {
        checkMatch(newSelected);
      }, 800);
    }
  };

  const checkMatch = ([a, b]) => {
    let updatedCards = [...cards];

    if (a.value === b.value) {
      updatedCards = updatedCards.map((c) =>
        c.value === a.value ? { ...c, matched: true } : c
      );
    } else {
      updatedCards = updatedCards.map((c) =>
        c.id === a.id || c.id === b.id
          ? { ...c, flipped: false }
          : c
      );
    }

    setCards(updatedCards);
    setSelected([]);
  };

  return (
    <div className="app">
      <h1>🎮 Memory Match</h1>
      <p>Moves: {moves}</p>
      <button onClick={startGame}>Restart</button>

      <div className="grid">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card ${card.flipped || card.matched ? "flipped" : ""}`}
            onClick={() => handleClick(card)}
          >
            {card.flipped || card.matched ? card.value : "❓"}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;