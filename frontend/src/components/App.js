import React, { useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import '../index.css';
import logo from '../logo.svg';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { CurrentCardContext } from '../contexts/CurrentCardContext';
import api from '../utils/api';

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
import * as Auth from "../utils/Auth";

function App() {
  /* ---------- Переменные состояния ----------- */
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [registration, setRegisration] = React.useState(false);
  const [InfoTooltipIsOpened, setInfoTooltipIsOpened] = React.useState(false);
  const history = useHistory();
  //const token = localStorage.getItem('token');

   /* ---------- Проверка токена ----------- */
  
   useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      Auth.checkToken(token)
      .then((res) => {
        if (res) {
          setEmail(res.email);
          setCurrentUser(res);
          setLoggedIn(true);
          history.push('/');
        }
      })
      .catch((err) => console.log(err))
    }
  }, [history]);

  /* ---------- Эффект при монтировании ----------- */
  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, initialCards]) => {
          setCurrentUser(userData);
          setCards(initialCards);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, [history, loggedIn]);

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
    //console.log(card)
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);
    if (isLiked) {
      // Отправляем запрос в API и получаем обновлённые данные карточки
      api.deleteLike(card, isLiked).then((newCard) => {
        setCards((cards) => 
          cards.map((c) => c._id === card._id ? newCard.card : c)
        );
      }).catch(() => { console.log('Что-то пошло не так') })
    }
    else {
      api.setLike(card, !isLiked).then((newCard) => {
        setCards((cards) => cards.map((c) => c._id === card._id ? newCard.card : c));
      }).catch(() => { console.log('Что-то пошло не так') })
    }
  }

  /* ---------- Кнопка корзины (удаление карточки) ----------- */
  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((cards) => cards.filter((c) => c._id !== card._id));
    })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  /* ---------- Обновление данных пользователя ----------- */
  function handleUpdateUser(userInfo) {
    api.editUserInfo(userInfo).then((data) => {
      setCurrentUser(data.data);
      closeAllPopups();
    }).catch(() => {
      console.log('Что-то пошло не так :(')
    })
  }

  /* ---------- Обновление аватара ----------- */
  function handleUpdateAvatar(newData) {
    api.editAvatar(newData).then((data) => {
      setCurrentUser(data.data);
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
    api.addCard(card).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch(() => {
      console.log('Что-то пошло не так');
    })
  }

  /* ---------- Регистрация ----------- */
  function handleSubmitRegister({ email, password }) {
    Auth.register(password, email)
      .then(res => {
        if(res.statusCode !== 400) {
          setRegisration(true);
          openInfoTooltip();
          history.push('/sign-in');
        }
      })
      .catch(err => {
        setRegisration(false);
        openInfoTooltip();
        console.log(err);
      });
  }

  /* ---------- Авторизация ----------- */
  function handleSubmitLogin({ email, password }) {
    Auth.authorize(password, email)
      .then((data) => {
        if(data.token) {
          setEmail(email);
          setLoggedIn(true);
          localStorage.setItem('jwt', data.token);
          history.push('/');
        }
      }).catch((err) => {
        openInfoTooltip();
        console.log(err);
      });
  }

  /* ---------- Кнопка Выйти ----------- */
  const handleSignOut = () => {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  }

 
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
