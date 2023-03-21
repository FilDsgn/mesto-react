function PopupWithForm({
  title,
  name,
  buttonText = "Сохранить",
  isOpen,
  onClose,
  children,
}) {
  return (
    <div className={`popup popup_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <form
          action="#"
          name={name}
          className="popup__form popup__form_card"
          noValidate
        >
          <h2 className="popup__title">{title}</h2>
          {children}
          <button
            type="submit"
            aria-label="Сохранить"
            className="popup__button"
          >
            {buttonText}
          </button>
        </form>
        <button
          type="button"
          className="popup__close-button"
          onClick={() => {
            onClose(true);
          }}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
