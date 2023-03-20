function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_content_image ${card.link && 'popup_opened'}`}>
        <div className="popup__image-container">
          <figure className="popup__figure">
            <img src={card.link} alt={card.name} className="popup__image" />
            <figcaption className="popup__caption">{card.name}</figcaption>
          </figure>
          <button type="button" className="popup__close-button" onClick={onClose}></button>
        </div>
      </div>
  )
}

export default ImagePopup;