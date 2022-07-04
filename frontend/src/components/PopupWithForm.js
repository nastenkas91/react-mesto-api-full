import React from "react";

function PopupWithForm({ title, name, onClose, submitTitle, children, onSubmit }) {

  return (
    <div className={`popup__container popup__container_type_${name}`}>
      <button aria-label="Закрыть" type="button" className="popup__close-btn" onClick={onClose} ></button>
      <h2 className={`popup__name popup__name_type_${name}`}>{ title }</h2>
      <form className="form" name={`${name}Form`} onSubmit={onSubmit} noValidate>
        { children }
        {/*<button aria-label={submitTitle} type="submit" className="form__submit-btn" onSubmit={onSubmit}>{submitTitle}</button>*/}
      </form>
    </div>
  );
}

export default PopupWithForm;
