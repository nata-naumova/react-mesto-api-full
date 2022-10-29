import { React, useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import Header from './Header';
import Main from './Main';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import ConfirmPopup from './ConfirmPopup';
import Footer from './Footer';
import { api } from '../utils/api';
import { auth } from '../utils/auth'


export default function App() {
  //register & login
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signupState, setSignupState] = useState(false);
  const [email, setEmail] = useState('');
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  //popup state
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  // jwt
  const token = localStorage.getItem('jwt');

  function handleMenuClick() {
    setIsMenuActive(!isMenuActive);
  }
  //user info & cards
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  //open popups
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  //update user info
  function handleUpdateUser(userInfo) {
    setIsLoading(true);
    api.setUserInfo(userInfo, token)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  //update user avatar
  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api.setUserAvatar(avatar, token)
      .then((newAvatar) => {
        setCurrentUser(newAvatar.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  //add a new place
  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    api.postCard(card, token)
      .then((newCard) => {
        setCards([newCard.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  //close all popoups
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsTooltipOpen(false);

    setSelectedCard({});
  }
  //card options
  function handleCardLike(card) {
    //check out whether there's my like on the card already
    const isLiked = card.likes.some((i) => i === currentUser._id);
    //send a request to API and get new card data
    api.changeLikeCardStatus(card._id, !isLiked, token)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleCardDeleteClick(card) {
    setSelectedCard(card);
    setIsConfirmPopupOpen(true);
  }
  function handleCardDelete(card) {
    setIsLoading(true);
    //send a request to API and get new cards array
    api.deleteCard(card._id, token)
      .then((newCard) => {
        setCards((state) => state.filter((c) => c._id === card._id ? '' : newCard));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  //register a new user
  function handleRegister({ email, password }) {
    setIsLoading(true);
    auth.register(email, password)
      .then((res) => {
        if (res) {
          setSignupState(true);
          history.push('/sign-in')
        }
      })
      .catch((err) => {
        console.log(err);
        setSignupState(false);
      })
      .finally(() => {
        setIsTooltipOpen(true);
        setIsLoading(false);
      });
  }
  //login & save token
  function handleLogin({ email, password }) {
    setIsLoading(true);
    auth.authorize(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setSignupState(true);
        setEmail(email);
        setIsLoggedIn(true);
        history.push('/');
        return res.token
      })
      .catch((err) => {
        console.log(err);
        setSignupState(false);
      })
      .finally(() => {
        setIsTooltipOpen(true);
        setIsLoading(false);
      })
  }
  //signout & remove token
  function handleSignout() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setEmail('');
    history.push('/sign-in');
  }
  //if token in local storage is correct
  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (token) {
      auth.getData(token)
        .then((data) => {
          setIsLoggedIn(true)
          setEmail(data.data.email)
          history.push('/')
        })
        .catch(err => console.log(err))
    }
  }, [history])

  //initial user info & cards set
  useEffect(() => {
    if (isLoggedIn) {
      // вызываем получение данных
      Promise.all([api.getUserInfo(token), api.getCards(token)])
        .then(resData => {
          const [userData, cardList] = resData;
          setCurrentUser(userData.data);
          setCards(cardList.data.reverse());
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [isLoggedIn, token]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header
          //header content depends on loggedIn state
          isLoggedIn={isLoggedIn}
          onSignOut={handleSignout}
          email={email}
          isMenuActive={isMenuActive}
          onMenuClick={handleMenuClick}
        />
        <Switch>
          <ProtectedRoute
            //protected path available to authorized users only
            exact path='/'
            isLoggedIn={isLoggedIn}
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            cards={cards}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDeleteClick={handleCardDeleteClick}
          />

          <Route path='/sign-up'>
            <Register
              onRegister={handleRegister}
              isLoading={isLoading}
            />
          </Route>

          <Route path='/sign-in'>
            <Login
              onLogin={handleLogin}
              isLoading={isLoading}
            />
          </Route>

          <Route path='*'>
            {isLoggedIn
              //unauthorized user redirection
              ? <Redirect to='/' />
              : <Redirect to='/sign-in'
              />}
          </Route>
        </Switch>
        <Footer />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <ImagePopup
          name='view'
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
        <ConfirmPopup
          title='Вы уверены?'
          defaultValue='Да'
          card={selectedCard}
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onConfirm={handleCardDelete}
          isLoading={isLoading}
        />

        <InfoTooltip
          name='tooltip'
          isOpen={isTooltipOpen}
          onClose={closeAllPopups}
          signupState={signupState}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}