import { useEffect, useState } from "react";
import api from "../utils/api.js";
import Card from "./Card.js";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getUserInfo()
      .then((userInfo) => {
        setUserName(userInfo.name);
        setUserDescription(userInfo.about);
        setUserAvatar(userInfo.avatar);
      })
      .catch((err) => console.log(err));

    api
      .getCardList()
      .then((cardList) => {
        setCards(cardList);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="content">
      {/* Profile */}
      <section className="profile">
        <div className="profile__avatar-wrapper">
          <img
            src={userAvatar}
            alt="Аватар профиля"
            className="profile__avatar"
            onClick={() => {
              onEditAvatar(true);
            }}
          />
        </div>

        <div className="profile__info">
          <div className="profile__wrapper">
            <h1 className="profile__name">{userName}</h1>
            <button
              type="button"
              aria-label="Редактировать профиль"
              className="profile__edit-button"
              onClick={() => {
                onEditProfile(true);
              }}
            ></button>
          </div>
          <p className="profile__work">{userDescription}</p>
        </div>
        <button
          type="button"
          aria-label="Добавть карточку"
          className="profile__add-button"
          onClick={() => {
            onAddPlace(true);
          }}
        ></button>
      </section>

      {/* Elements */}
      <section
        aria-label="Карточки с фотографиями и названиями мест"
        className="elements"
      >
        <div className="elements__container">
          {cards.map((card) => (
            <Card
              name={card.name}
              link={card.link}
              likes={card.likes}
              key={card.id}
              onCardClick={onCardClick}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
