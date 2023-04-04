import PopupWithForm from "./PopupWithForm.js";

function DeleteCardPopup({ card, isOpen, onClose, onCardDelete, onLoading }) {
  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete(card);
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="confirm"
      buttonText="Да"
      buttonTextOnLoading="Удаление"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onLoading={onLoading}
    />
  );
}

export default DeleteCardPopup;
