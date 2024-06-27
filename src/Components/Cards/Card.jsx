import "./Card.css";

function Card({ photo, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <img
        className="card_img"
        src={`https://img.pokemondb.net/artwork/${photo.name}.jpg`}
        alt={`${photo.name} img`}
      />
      <h2 className="Card_title">{photo.name}</h2>
    </div>
  );
}
export default Card;
