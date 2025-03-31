import "./ItemModal.css";

function ItemModal({ activeModal, card, onClose, onDelete }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close-preview"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__footer-caption">
            <p className="modal__caption">{card.name}</p>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>

          <div className="modal__delete">
            <button
              onClick={() => onDelete(card)}
              type="button"
              className="modal__delete-btn"
            >
              Delete Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
