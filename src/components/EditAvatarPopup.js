import { useRef, useEffect } from "react";

import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, onLoading }) {
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = "";
  });

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({ avatar: avatarRef.current.value });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="update_avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onLoading={onLoading}
    >
      <input
        name="avatar"
        ref={avatarRef}
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
