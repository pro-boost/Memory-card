import "./Rules.css";

function Rules({ startGame }) {
  return (
    <div className="welcome_container">
      <h1>Pokémon Memory-Card</h1>
      <p>
        Test your memory! Click on each Pokémon card only once. If you click on
        the same card twice, your score resets to zero. Try to click all the
        cards without repeating to achieve the highest score!
      </p>
      <button onClick={startGame}>Start the Game</button>
    </div>
  );
}

export default Rules;
