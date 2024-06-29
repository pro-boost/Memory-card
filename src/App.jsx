import "./App.css";
import Game from "./Components/Game/Game";
import Rules from "./Components/Game/Rules/Rules";
import { useState } from "react";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const startGame = () => {
    setGameStarted(true);
  };

  return <>{!gameStarted ? <Rules startGame={startGame} /> : <Game />}</>;
}

export default App;
