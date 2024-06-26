import "./Card.css";

function Card({ photo, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <img
        className="card_img"
        src={photo.sprites.front_default}
        alt={photo.name}
      />
      <h2 className="Card_title">{photo.name}</h2>
    </div>
  );
}
export default Card;
