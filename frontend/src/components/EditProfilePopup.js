import PopupWithForm from './PopupWithForm'
import React from "react";
import { useContext, useState, useEffect } from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import Popup from "./Popup";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading, onOverlayClick }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [nameIsValid, setNameIsValid] = useState(false);
  const [errorName, setErrorName] = useState('');
  const [descriptionIsValid, setDescriptionIsValid] = useState(false);
  const [errorDescription, setErrorDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name || '');
    setDescription(currentUser.about || '');
    setErrorDescription('');
    setErrorName('');
  }, [currentUser, isOpen])


  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  function handleNameChange(e) {
    const nameInput = e.target;
    setName(nameInput.value);
    setNameIsValid(nameInput.validity.valid);
    nameIsValid ? setErrorName('') : setErrorName(nameInput.validationMessage);
  }

  function handleDescriptionChange(e) {
    const descriptionInput = e.target;
    setDescription(descriptionInput.value);
    setDescriptionIsValid(descriptionInput.validity.valid);
    descriptionIsValid ? setErrorDescription('') : setErrorDescription(descriptionInput.validationMessage);
  }

  return (
    <Popup
      onClose={onClose}
      isOpen={isOpen}
    >
      <PopupWithForm
        name='edit-profile'
        title='Редактировать профиль'
        onClose={onClose}f
        onSubmit={handleSubmit}
        onOverlayClick={onOverlayClick}
      >
        <input
          type="text"
          name="profileName"
          id="name"
          className="form__field form__field_type_name"
          minLength="2"
          maxLength="40"
          required
          placeholder="Имя"
          value={name || ''}
          onChange={handleNameChange}
        />
        <span className="form__field-error name-error">{errorName}</span>
        <input
          type="text"
          name="profileOccupation"
          id="occupation"
          className="form__field form__field_type_occupation"
          minLength="2"
          maxLength="200"
          required
          placeholder="Род деятельности"
          value={description || ''}
          onChange={handleDescriptionChange}
        />
        <span className="form__field-error occupation-error">{errorDescription}</span>
        <button
          disabled={!(nameIsValid && descriptionIsValid)}
          aria-label='Сохранить'
          type="submit"
          className={`form__submit-btn ${(nameIsValid && descriptionIsValid) ? '' : 'form__submit-btn_disabled'}`}
          onSubmit={handleSubmit}>
          {isLoading ? 'Сохранение...' : 'Сохранить'}
        </button>
      </PopupWithForm>
    </Popup>
  )
}

export default EditProfilePopup;
