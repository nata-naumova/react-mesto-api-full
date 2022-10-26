import React, { useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import '../index.css';
import logo from '../logo.svg';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { CurrentCardContext } from '../contexts/CurrentCardContext';

import { Header } from './Header.js';
import { Main } from './Main.js';
import { EditProfilePopup } from './EditProfilePopup';
import { EditAvatarPopup } from './EditAvatarPopup';
import { AddPlacePopup } from './AddPlacePopup';
import { Footer } from './Footer.js';
import ImagePopup from "./popups/ImagePopup";

import InfoTooltip from "./InfoTooltip";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";

import Api from '../utils/api';
import { optionsApi } from '../utils/optionsApi';
import * as Auth from "../utils/Auth";

const api = new Api(optionsApi);

function App() {
  /* ---------- Переменные состояния ----------- */
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState(''); // eslint-disable-next-line
  const [registration, setRegisration] = React.useState(false);
  const [InfoTooltipIsOpened, setInfoTooltipIsOpened] = React.useState(false);
  const history = useHistory();

  const [token, setToken] = React.useState('');

  /* ---------- Эффект при монтировании ----------- */
  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(token), api.getInitialCards(token)])
        .then(([userData, initialCards]) => {
          setCurrentUser(userData);
          setCards(initialCards);
          setEmail(userData.emil);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, [loggedIn]);

  // Вход по токену при загрузке страницы
  useEffect(() => {
    handleCheckToken();
  }, []);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  /* ---------- Кнопка лайка ----------- */
  function handleCardLikeClick(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (isLiked) {
      api.deleteLike(card, token, isLiked).then((newCard) => {
        setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
      }).catch(() => { console.log('Что-то пошло не так') })
    }
    else {
      api.setLike(card, token, !isLiked).then((newCard) => {
        setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
      }).catch(() => { console.log('Что-то пошло не так') })
    }
  }

  /* ---------- Кнопка корзины (удаление карточки) ----------- */
  function handleCardDelete(card) {
    api.deleteCard(card._id, token).then(() => {
      setCards((cards) => cards.filter((c) => c._id !== card._id));
    })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  /* ---------- Обновление данных пользователя ----------- */
  function handleUpdateUser(userInfo) {
    api.editUserInfo(userInfo, token).then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    }).catch(() => {
      console.log('Что-то пошло не так :(')
    })
  }

  /* ---------- Обновление аватара ----------- */
  function handleUpdateAvatar(newData) {
    api.editAvatar(newData, token).then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    }).catch(() => {
      console.log('Что-то пошло не так')
    })
  }

  const openInfoTooltip = () => {
    setInfoTooltipIsOpened(true);
  };

  /* ---------- Закрытие всех модальных окон ----------- */
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setInfoTooltipIsOpened(false);
  }

  /* ---------- Сохранение данных ----------- */
  function handleAddPlaceSubmit(card) {
    api.addCard(card, token).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch(() => {
      console.log('Что-то пошло не так');
    })
  }

  /* ---------- Регистрация ----------- */
  function handleSubmitRegister({ email, password }) {
    Auth.register({ password, email })
      .then(() => {
        setRegisration(true);
        openInfoTooltip();
        history.push('/sign-in');
      })
      .catch((err) => {
        console.log(err);
        setRegisration(false);
        openInfoTooltip();
      });
  }

  /* ---------- Авторизация ----------- */
  function handleSubmitLogin({ email, password }) {
    setLoggedIn(true);
    Auth.authorize({ password, email })
      .then((data) => {
        setLoggedIn(true);
        localStorage.setItem('jwt', JSON.stringify(data.token));
        setToken(data.token);
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
        openInfoTooltip();
      });
  }

  /* ---------- Кнопка Выйти ----------- */
  const handleSignOut = () => {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    setToken('');
    history.push('/sign-in');
  }

  /* ---------- Проверка токена ----------- */
  function handleCheckToken() {
    if (localStorage.getItem('jwt')) {
      const token = JSON.parse(localStorage.getItem('jwt'))
      Auth.checkToken(token)
      .then(() => {
        setToken(token)
        setLoggedIn(true);
        history.push('/');
      })
      .catch((err) => console.log(err))
    }
  }
  /*
  useEffect(() => {
    if (loggedIn) {
      history.push('/');
    }
  }, [loggedIn]);
  */
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} src={logo} email={email} handleSignOut={handleSignOut} />
        <CurrentCardContext.Provider value={cards}>
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLikeClick}
              onCardDelete={handleCardDelete}
              loggedIn={loggedIn}
              component={Main}
            ></ProtectedRoute>
            <Route path="/sign-up">
              <Register handleSubmitRegister={handleSubmitRegister} />
            </Route>
            <Route path="/sign-in">
              <Login handleSubmitLogin={handleSubmitLogin} />
            </Route>
            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
        </CurrentCardContext.Provider>
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip
          isOpen={InfoTooltipIsOpened}
          onClose={closeAllPopups}
          registration={registration}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
