import { useState, useEffect } from "react";
import "./App.css";
import Card from "./Components/Cards/Card";

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [shuffledPhotos, setShuffledPhotos] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);

  // Function to shuffle array
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Function to handle card click
  const handleCardClick = (photo) => {
    if (clickedCards.includes(photo.name)) {
      setScore(0);
      setClickedCards([]);
    } else {
      setClickedCards((prevClicked) => [...prevClicked, photo.name]);
      setScore((prevScore) => {
        const newScore = prevScore + 1;
        if (newScore > bestScore) {
          setBestScore(newScore);
        }
        return newScore;
      });
    }
    setShuffledPhotos(shuffleArray([...shuffledPhotos]));
  };

  // Fetching Pokémon data on component mount
  useEffect(() => {
    const fetchPhotos = async () => {
      const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=12";
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
  }, []);

  return (
    <>
      <div className="body">
        <div className="title">
          <h1>Pokémon Memory-Card</h1>
          <p>
            Test your memory! Click on each Pokémon card only once. If you click
            on the same card twice, your score resets to zero. Try to click all
            the cards without repeating to achieve the highest score!
          </p>
        </div>
        <div className="score">
          <p>Your score: {score}</p>
          <p>Best score: {bestScore}</p>
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
      </div>
    </>
  );
}

export default App;
