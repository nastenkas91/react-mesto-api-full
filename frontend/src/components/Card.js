import React from "react";
import {useContext} from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onClick, onCardLike, onDeleteButtonClick, onCardDeleteConfirm}) {
  const currentUser = useContext(CurrentUserContext)

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `element__delete-btn ${isOwn ? 'element__delete-btn_type_visible' : 'element__delete-btn_type_hidden'}`
  );

  const isLiked = card.likes.some(i => i._id === currentUser._id)
  const cardLikeButtonClassName = (
    `element__like-btn ${isLiked ? 'element__like-btn_active' : ''}`
  );

  function handleClick() {
    onClick(card);
  }

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleDeleteButtonClick() {
    onDeleteButtonClick(card);
  }

  return (
    <li className="element">
      <img style={{ backgroundImage: `url(${card.link})` }} className="element__image" onClick={handleClick}/>
      <button aria-label="Удалить" type="button" className={cardDeleteButtonClassName} onClick={handleDeleteButtonClick}></button>
      <div className="element__name-wraper">
        <h2 className="element__name">{card.name}</h2>
        <div className="element__like-container">
          <button aria-label="Нравится" type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <p className="element__likes-count">{card.likes.length}</p>
        </div>
      </div>
    </li>
  )

}

export default Card;
