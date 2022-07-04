import Popup from "./Popup";
import React from "react";
import successLogo from '../images/success.svg';
import failLogo from '../images/fail.svg'

function InfoTooltip({ onClose, isOpen, registrationFailed}) {
  return (
    <Popup onClose={onClose} isOpen={isOpen}>
      <div className={`popup__container popup__container_type_InfoTooltip`}>
        <button aria-label="Закрыть" type="button" className="popup__close-btn" onClick={onClose} ></button>
        <img src={registrationFailed ? failLogo : successLogo} alt='info' className='popup__picture'/>
        <p className='popup__message'>{registrationFailed ? 'Что-то пошло не так!\n' +
          'Попробуйте ещё раз.' : 'Вы успешно зарегистрировались!'}</p>
      </div>
    </Popup>
  )
}

export default InfoTooltip;
