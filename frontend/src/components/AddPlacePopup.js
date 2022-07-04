import PopupWithForm from "./PopupWithForm";
import {useState, useEffect} from "react";
import Popup from "./Popup";
import React from "react";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading, onOverlayClick }) {
  const [name, setName] = useState('')
  const [link, setLink] = useState('')

  const [nameIsValid, setNameIsValid] = useState(false);
  const [errorName, setErrorName] = useState('');
  const [linkIsValid, setLinkIsValid] = useState(false);
  const [errorLink, setErrorLink] = useState('');

  function handleNameChange(e) {
    const nameInput = e.target;
    setName(nameInput.value);
    setNameIsValid(nameInput.validity.valid);
    nameIsValid ? setErrorName('') : setErrorName(nameInput.validationMessage);
  }

  function handleLinkChange(e) {
    const linkInput = e.target;
    setLink(linkInput.value);
    setLinkIsValid(linkInput.validity.valid);
    linkIsValid ? setErrorLink('') : setErrorLink(linkInput.validationMessage);
  }

  useEffect(() => {
    setName('');
    setLink('');
    setErrorLink('');
    setErrorName('')
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(
      {
        name,
        link
      }
  )}

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
    >
      <PopupWithForm
        name='add-card'
        title='Новое место'
        onClose={onClose}
        onOverlayClick={onOverlayClick}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          id="title"
          className="form__field form__field_type_card-title"
          minLength="2"
          maxLength="30"
          required
          placeholder="Название"
          value={name}
          onChange={handleNameChange}
        />
        <span className="form__field-error title-error">{errorName}</span>
        <input
          type="url"
          name="link"
          id="imgUrl"
          className="form__field form__field_type_card-img"
          required
          placeholder="Ссылка на картинку"
          value={link}
          onChange={handleLinkChange}
        />
        <span className="form__field-error imgUrl-error">{errorLink}</span>
        <button
          disabled={!(nameIsValid && linkIsValid)}
          aria-label='Сохранить'
          type="submit"
          className={`form__submit-btn ${(nameIsValid && linkIsValid) ? '' : 'form__submit-btn_disabled'}`}
          onSubmit={handleSubmit}>
            {isLoading ? 'Сохранение...' : 'Сохранить'}
        </button>
      </PopupWithForm>
    </Popup>
  )
}

export default AddPlacePopup;
