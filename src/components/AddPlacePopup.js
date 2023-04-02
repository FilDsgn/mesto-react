import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup({ isOpen, onClose, onAddPlace, onLoading }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name: name, link: link });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="content_card"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onLoading={onLoading}
    >
      <input
        name="name"
        type="text"
        value={name}
        onChange={handleChangeName}
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        id="locate-name"
        className="popup__input popup__input_place_locate"
      />
      <span className="locate-name-error popup__input-error"></span>
      <input
        name="link"
        type="url"
        value={link}
        onChange={handleChangeLink}
        placeholder="Ссылка на картинку"
        id="avatar-link"
        className="popup__input popup__input_place_image"
        required
      />
      <span class="avatar-link-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
