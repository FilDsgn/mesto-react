function Card(card) {
  function handleCardClick() {
    card.onCardClick(card);
  }

  return (
    <article className="element">
      <button
        type="button"
        aria-label="Удалить"
        className="element__delete"
      ></button>
      <img
        src={card.link}
        alt={card.name}
        className="element__image"
        onClick={handleCardClick}
      />
      <div className="element__wrapper">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-container">
          <button
            type="button"
            aria-label="Поставить лайк"
            className="element__like"
          ></button>
          <p
            className={`element__like-counter ${
              card.likes.length > 0 && "element__like-counter_active"
            }`}
          >
            {card.likes.length}
          </p>
        </div>
      </div>
    </article>
  );
}

export default Card;
