import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup({ isOpen, onClose }) {
  return (
    <PopupWithForm
      title="Обновить аватар"
      name="update_avatar"
      isOpen={isOpen}
      onClose={onClose}
    >
      <input
        name="avatar"
        type="url"
        placeholder="Ссылка на картинку"
        id="image-link"
        className="popup__input popup__input_place_image"
        required
      />
      <span className="image-link-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
