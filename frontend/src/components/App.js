import { useEffect, useState } from "react";
import { Switch, Route, useHistory } from 'react-router-dom';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from "../utils/api";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth"

function App() {
  //состояние попапов
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);

  //данные карточки для превью и для удаления
  const [selectedCard, setSelectedCard] = useState({ isOpen: false });
  const [selectedCardId, setSelectedCardId] = useState('');

  //данные пользователя и карточек
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  //состояние загрузчика
  const [loadingButton, setLoadingButton] = useState(false);

  //состояния для авторизации и регистрации
  const [loggedIn, setLoggedIn] = useState(false);
  const [registrationFailed, setRegistrationFailed] = useState(false);
  const [userEmail, setUserEmail] = useState()

  //бургерное меню в мобильной версии
  const [burgerMenuActive, setBurgerMenuActive] = useState(false);

  const history = useHistory();

  useEffect(() => {
    checkToken();
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(res => {
        setCurrentUser(res[0]);
        setCards(res[1]);
      })
      .catch(((err) => {
        console.log(err)
      }));
  }, [])

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard({ isOpen: true, ...card });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeStatus(card._id, !isLiked)
      .then(newCard => {
        setCards(state => state.map(c => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err));
  }

  function handleDeleteClick(card) {
    setConfirmPopupOpen(true);
    setSelectedCardId(card._id);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setConfirmPopupOpen(false);
    setSelectedCard({ isOpen: false });
    setSelectedCardId('');
    setInfoTooltipOpen(false);
  }

  function handleUpdateUser(data) {
    setLoadingButton(true);
    api.editProfileInfo({userName: data.name, occupation: data.about})
      .then(info => {
        setCurrentUser(info);
        closeAllPopups();
      })
      .catch(((err) => {
        console.log(err)
      }))
      .finally(() => setLoadingButton(false));
  }

  function handleUpdateAvatar(link) {
    setLoadingButton(true);
    api.editAvatar(link)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(((err) => {
        console.log(err)
      }))
      .finally(() => setLoadingButton(false));
  }

  function handleCardDelete() {
    setLoadingButton(true);
    api.deleteCard(selectedCardId)
      .then(() => {
        setCards(cards.filter(c => c._id !== selectedCardId));
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => {
        setLoadingButton(false);
      })
  }

  function handleAddPlaceSubmit(data) {
    setLoadingButton(true);
    api.addNewCard(data)
      .then(card => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setLoadingButton(false));
  }

  function handleTooltip(boolean) {
    setInfoTooltipOpen(true);
    setRegistrationFailed(boolean);
  }

  function handleRegistration(boolean) {
    handleTooltip(boolean)
  }

  function handleLogin(email) {
    setLoggedIn(true);
    setUserEmail(email);
  }

  function handleLogOut() {
    setBurgerMenuActive(false);
    setLoggedIn(false);
    localStorage.setItem('token', '')
  }

  function checkToken() {
    const token = localStorage.getItem('token');
    if(token) {
      auth.tokenCheck(token)
        .then((res) => {
          if (res.data) {
            setLoggedIn(true);
            setUserEmail(res.data.email);
            history.push('/');
          } else if (res.message) {
            return res.message
          }
        })
    } else {
      return;
    }
  }

  function handleBurgerClick() {
    setBurgerMenuActive(!burgerMenuActive);
  }

  return (
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <div className="page__wraper">
            <Header
              onLogout={handleLogOut}
              userEmail={userEmail}
              handleBurgerClick={handleBurgerClick}
              burgerMenuActive={burgerMenuActive}
            />

              <Route path="/signin">
                <Login handleLogin={handleLogin} onFail={handleTooltip}/>
              </Route>

              <Route path="/signup">
                <Register onRegister={handleRegistration} />
              </Route>

            <Switch>
              <ProtectedRoute component={Main}
                              exact path="/"
                              loggedIn={loggedIn}
                              onAddPlace={handleAddPlaceClick}
                              onEditAvatar={handleEditAvatarClick}
                              onEditProfile={handleEditProfileClick}
                              onCardClick={handleCardClick}
                              handleDeleteClick={handleDeleteClick}
                              onCardLike={handleCardLike}
                              cards={cards}
                              onCardDeleteConfirm={handleCardDelete}
              >
              <Main />
              <Footer />
              </ProtectedRoute>
            </Switch>

              <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
                isLoading={loadingButton}
              />

              <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
                isLoading={loadingButton}
              />

              <ConfirmDeletePopup
                isOpen={isConfirmPopupOpen}
                onClose={closeAllPopups}
                cardId={selectedCardId}
                onSubmit={handleCardDelete}
                isLoading={loadingButton}
              />

              <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
                isLoading={loadingButton}
              />

              <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups}
              />

            <InfoTooltip
              isOpen={isInfoTooltipOpen}
              onClose={closeAllPopups}
              registrationFailed={registrationFailed}
            />

          </div>
        </CurrentUserContext.Provider>
      </div>
  )}

export default App;
