import "./Modal.css";

function LevelModal({ onNextLevel }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Congratulations!</h2>
        <p>You have passed to the next level.</p>
        <button onClick={onNextLevel}>Next Level</button>
      </div>
    </div>
  );
}

export default LevelModal;
