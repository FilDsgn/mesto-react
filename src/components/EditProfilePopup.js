import { useState, useContext, useEffect } from "react";

import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="content_profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        name="name"
        value={name}
        onChange={handleChangeName}
        type="text"
        placeholder="Ваше имя"
        minLength="2"
        maxLength="40"
        required
        id="username"
        className="popup__input popup__input_place_name"
      />
      <span className="username-error popup__input-error"></span>
      <input
        name="about"
        value={description}
        onChange={handleChangeDescription}
        type="text"
        placeholder="Дополнительная информация"
        minLength="2"
        maxLength="200"
        required
        id="about"
        className="popup__input popup__input_place_about"
      />
      <span className="about-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
