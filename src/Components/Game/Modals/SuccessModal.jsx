import "./Modal.css";

function SuccessModal({ onRestartGame }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Congratulations!</h2>
        <p>You have passed all levels successfully.</p>
        <button onClick={onRestartGame}>Restart from Level 1</button>
      </div>
    </div>
  );
}

export default SuccessModal;
