import "./DeleteConfirmModal.css";

function DeleteConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;
  return (
    <div className={"modal modal__opened modal__type-confirm"}>
      <div className="modal__delete-content">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={close} alt="Close" className="modal__close-icon" />
        </button>
        <h2 className="modal__confirm-text">Confirm Deletion</h2>
        <p className="modal__confirm-action">
          {" "}
          This action is nonreversible. Are you sure you want to delete this
          item?
        </p>
        <div className="modal__button">
          <button onClick={onConfirm} className="modal__confirm-button">
            Delete item
          </button>
          <button onClick={onClose} className="modal__cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
