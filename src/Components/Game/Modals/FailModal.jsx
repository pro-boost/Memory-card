import "./Modal.css";

function FailModal({ onRestartGame }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>You have lost 3 times in a row!</h2>
        <p>Try again from the start.</p>
        <button onClick={onRestartGame}>Restart from Level 1</button>
      </div>
    </div>
  );
}

export default FailModal;
