import "./DeleteConfirmModal.css";

function DeleteConfirmModal({ onClose, card, activeModal, handleCardDelete }) {
  return (
    <div
      className={`modal ${
        activeModal === "delete-garment"
      } ? "modal_opened" : ""}`}
    >
      <div className="modal__content modal__content_type_confirm">
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>
        <p className="modal__confirm-caption">Confirm Deletion</p>
        <p className="modal__confirm-caption-confirmation">
          This action is irreversible. Are you sure you want to delete this
          item?
        </p>
        <div className="modal__button">
          <button
            onClick={() => handleCardDelete(card._id)}
            type="button"
            className="modal__confirm-button"
          >
            {" "}
            Yes delete item
          </button>
          <button
            onClick={onClose}
            type="button"
            className="modal__cancel-button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
