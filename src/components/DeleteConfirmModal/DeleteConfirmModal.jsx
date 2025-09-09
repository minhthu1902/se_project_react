import "./DeleteConfirmModal.css";

function DeleteConfirmModal({ activeModal, onClose, handleCardDelete }) {
  return (
    <div
      className={`modal ${
        activeModal === "delete-garment" ? "modal_opened" : ""
      }`}
    >
      <div className="modal__content modal__content_type_confirm">
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>
        <p className="modal__confirm-caption">
          Are you sure you want to delete this item?
        </p>
        <p className="modal__confirm-caption-confirmation">
          This action is irreversible.{" "}
        </p>
        <div className="modal__button">
          <button
            // onClick={() => handleCardDelete(card._id)}
            onClick={handleCardDelete}
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
