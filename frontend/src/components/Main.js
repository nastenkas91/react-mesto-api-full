import React, { useEffect, useState, useContext } from "react";
import editAvatarImg from '../images/editAvatar.svg';
import { api } from "../utils/api";
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDeleteConfirm, handleDeleteClick }) {

  const currentUser = useContext(CurrentUserContext)

  return (<main>
    <section className="profile">
      <div className="profile__avatar-container" onClick={ onEditAvatar }>
        <img src={currentUser.avatar} alt={currentUser.name} className="profile__avatar" />
        <img src={editAvatarImg} alt="Изменить аватар"
             className="profile__avatar-edit-btn" />
      </div>
      <div className="profile__info">
        <div className="profile__name-wraper">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__occupation">{currentUser.about}</p>
        </div>
        <button aria-label="Редактировать профиль" type="button" className="profile__edit-btn" onClick={ onEditProfile }></button>
      </div>
      <button aria-label="Добавить" type="button" className="profile__add-img-btn" onClick={ onAddPlace }></button>
    </section>

    <section className="elements">
      <ul className="elements__list">
        {
          cards.map(card => (
            <Card
              key={card._id}
              card={card}
              onClick={onCardClick}
              onCardLike={onCardLike}
              onCardDeleteConfirm={onCardDeleteConfirm}
              onDeleteButtonClick={handleDeleteClick}
            />
            )
          )}
      </ul>
    </section>
  </main>
  )
}

export default Main;
