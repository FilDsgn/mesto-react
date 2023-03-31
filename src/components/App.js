import React from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getCardList()
      .then((cardList) => {
        setCards(cardList);
      })
      .catch((err) => console.log(err));

    api
      .getUserInfo()
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch((err) => console.log(err));
  }, []);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);

    api
      .changeLikeCardStatus(card.id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card.id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    const isOwn = card.owner._id === currentUser._id;

    if (isOwn) {
      api
        .deleteCard(card.id)
        .then(() => {
          setCards((state) => state.filter((c) => c._id !== card.id));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header />
          <Main
            cards={cards}
            onEditProfile={setIsEditProfilePopupOpen}
            onAddPlace={setIsAddPlacePopupOpen}
            onEditAvatar={setIsEditAvatarPopupOpen}
            onCardClick={setSelectedCard}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Footer />

          <PopupWithForm
            title="Редактировать профиль"
            name="content_profile"
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
          >
            <input
              name="name"
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

          <PopupWithForm
            title="Обновить аватар"
            name="update_avatar"
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
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

          <PopupWithForm
            title="Новое место"
            name="content_card"
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
          >
            <input
              name="name"
              type="text"
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
              placeholder="Ссылка на картинку"
              id="avatar-link"
              className="popup__input popup__input_place_image"
              required
            />
            <span class="avatar-link-error popup__input-error"></span>
          </PopupWithForm>

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          {/* Pop-up confirm
      <div className="popup popup_confirm">
        <div className="popup__container">
          <form action="#" name="profile-form" className="popup__form popup__form_card" noValidate>
            <h2 className="popup__title">Вы уверены?</h2>
            <button type="submit" aria-label="Сохранить" className="popup__button">Да</button>
          </form>
          <button type="button" className="popup__close-button"></button>
        </div>
      </div> */}
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
