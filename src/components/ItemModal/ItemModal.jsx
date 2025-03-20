import "./ItemModal.css";

function ItemModal({ activeModal, card, onClose, onDelete }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          {/* {" "}
          CLOSE{" "} */}
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
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
