import { useState, useEffect } from "react";
import "./Game.css";
import Card from "./Cards/Card";
import LevelModal from "./Modals/LevelModal";
import FailModal from "./Modals/FailModal";
import SuccessModal from "./Modals/SuccessModal";

function Game() {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [cards, setCards] = useState(4);
  const [bestScore, setBestScore] = useState(0);
  const [shuffledPhotos, setShuffledPhotos] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [showLevelModal, setShowLevelModal] = useState(false);
  const [showFailModal, setShowFailModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [consecutiveLosses, setConsecutiveLosses] = useState(0);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleCardClick = (photo) => {
    if (clickedCards.includes(photo.name)) {
      setScore(0);
      setClickedCards([]);
      setConsecutiveLosses(consecutiveLosses + 1);

      if (consecutiveLosses + 1 >= 3) {
        setShowFailModal(true);
        setConsecutiveLosses(0);
      }
    } else {
      setClickedCards((prevClicked) => [...prevClicked, photo.name]);
      setScore((prevScore) => {
        const newScore = prevScore + 1;
        if (newScore > bestScore) {
          setBestScore(newScore);
        }
        if (newScore === cards) {
          setShowLevelModal(true);
        }
        return newScore;
      });
    }
    setShuffledPhotos(shuffleArray([...shuffledPhotos]));
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${cards}`;
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const pokemonData = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return res.json();
          })
        );
        setShuffledPhotos(shuffleArray(pokemonData));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPhotos();
  }, [cards, level]);

  const handleNextLevel = () => {
    setLevel((prevLevel) => prevLevel + 1);
    setCards((prevCards) => prevCards + 4);
    setShowLevelModal(false);
    setScore(0);
  };

  const handleRestartGame = () => {
    setScore(0);
    setBestScore(0);
    setLevel(1);
    setCards(4);
    setClickedCards([]);
    setConsecutiveLosses(0);
    setShowLevelModal(false);
    setShowFailModal(false);
    setShowSuccessModal(false);

    // Refetch photos to reset the game
    const fetchPhotos = async () => {
      const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=4`;
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const pokemonData = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return res.json();
          })
        );
        setShuffledPhotos(shuffleArray(pokemonData));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchPhotos();
  };

  return (
    <>
      <div className="game_container">
        <div className="title">
          <h1>Pokémon Memory-Card</h1>
        </div>

        <div className="scoreboard">
          <div>
            <p>Level: {level}</p>
            <p>Cards: {cards}</p>
          </div>
          <div>
            <p>Score: {score}</p>
            <p>Best score: {bestScore}</p>
          </div>
        </div>

        <div className="card_container">
          {shuffledPhotos.map((photo) => (
            <Card
              key={photo.name}
              photo={photo}
              onClick={() => handleCardClick(photo)}
            />
          ))}
        </div>
        <div className="footer">
          <p className="copyright">&copy; 2024 Memory-Card Game</p>
          <p className="created-by">Created by Pro-Boost</p>
        </div>

        {showLevelModal && <LevelModal onNextLevel={handleNextLevel} />}
        {showFailModal && <FailModal onRestartGame={handleRestartGame} />}
        {showSuccessModal && <SuccessModal onRestartGame={handleRestartGame} />}
      </div>
    </>
  );
}

export default Game;
