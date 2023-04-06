import { useRef, useEffect } from "react";

import PopupWithForm from "./PopupWithForm.js";
import useFormValidation from "../utils/useFormValidation.js";

function EditAvatarPopup({
  isOpen,
  onClose,
  onOverlayClick,
  onUpdateAvatar,
  onLoading,
}) {
  const avatarRef = useRef();
  const { values, errors, isValid, handleChange, setValue, reset, formRef } =
    useFormValidation();

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen, setValue]);

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      onUpdateAvatar({ avatar: avatarRef.current.value });
    }
  }

  const onClosePopup = () => {
    onClose();
    reset();
  };

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="update_avatar"
      isOpen={isOpen}
      onClose={onClosePopup}
      onOverlayClick={onOverlayClick}
      onSubmit={handleSubmit}
      onLoading={onLoading}
      isValid={isValid}
      ref={formRef}
    >
      <input
        name="avatar"
        value={values["avatar"]}
        ref={avatarRef}
        type="url"
        onChange={handleChange}
        placeholder="Ссылка на картинку"
        id="image-link"
        className="popup__input popup__input_place_image"
        required
      />
      <span className="popup__input-error">{errors["avatar"]}</span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
