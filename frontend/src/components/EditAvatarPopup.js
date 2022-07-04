import PopupWithForm from "./PopupWithForm";
import {useRef, useEffect, useState} from "react";
import Popup from "./Popup";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading, onOverlayClick }) {
  const avatarLink = useRef()

  const [avatarIsValid, setAvatarIsValid] = useState(false);
  const [error, setError] = useState('');

  function handleAvatarChange() {
    const avatarInput = avatarLink.current;
    setAvatarIsValid(avatarInput.validity.valid);
    avatarIsValid ? setError('') : setError(avatarInput.validationMessage);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarLink.current.value
    });
  }

  useEffect(() => {
    avatarLink.current.value = ''
    setError('')
  }, [isOpen])

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
    >
      <PopupWithForm
        name='avatar'
        title='Обновить аватар'
        onClose={onClose}
        onSubmit={handleSubmit}
        onOverlayClick={onOverlayClick}
      >
        <input
          ref={avatarLink}
          onChange={handleAvatarChange}
          type="url"
          name="avatarLink"
          id="avatarUrl"
          className="form__field form__field_type_avatar"
          required
          placeholder="Ссылка на аватар"
        />
        <span className="form__field-error avatarUrl-error">{error}</span>
        <button
          disabled={!avatarIsValid}
          aria-label='Создать'
          type="submit"
          className={`form__submit-btn ${avatarIsValid ? '' : 'form__submit-btn_disabled'}`}
          onSubmit={handleSubmit}>
          {isLoading ? 'Создание...' : 'Создать'}
        </button>
      </PopupWithForm>
    </Popup>
  )
}

export default EditAvatarPopup;
