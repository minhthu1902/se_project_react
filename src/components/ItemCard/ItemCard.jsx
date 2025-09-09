import "./ItemCard.css";
import { useUser } from "../../utils/contexts/UserContext.jsx";

function ItemCard({ item, onCardClick = () => {}, onCardLike }) {
  const { user } = useUser();
  
  const handleCardClick = () => {
    onCardClick(item);
    console.log("Card clicked", item);
  };

  const handleLike = () => {
    if (!onCardLike || !user) return;
    
    // Check if user has already liked this item
    const isLiked = item.likes && item.likes.some((id) => id === user._id);
    
    // Call the handler with item id and current like status
    onCardLike({ id: item._id, isLiked });
  };

  // Determine if current user has liked this item
  const isLiked = item.likes && user ? item.likes.some((id) => id === user._id) : false;

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        {user && (
          <button
            className={`card__like-button ${
              isLiked ? "card__like-button_active" : ""
            }`}
            onClick={handleLike}
            type="button"
            aria-label={isLiked ? "Unlike this item" : "Like this item"}
          >
            <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="m8 12.4-6.9-7.1C-.4 4.1-.1 1.9 1.5.5A4.4 4.4 0 0 1 5 0c1.5 0 3 .8 3 2.1C8 .8 9.5 0 11 0a4.4 4.4 0 0 1 3.5.5c1.6 1.4 1.9 3.6.4 4.8L8 12.4Z" fill="currentColor"/>
            </svg>
          </button>
        )}
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;