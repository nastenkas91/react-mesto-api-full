import React, {useEffect, useRef} from "react";
import Popup from "./Popup";

function ImagePopup({ card, onClose }) {

  return (
    <Popup
      onClose={onClose}
      isOpen={card.isOpen}
    >
      <div className="popup__container popup__container_type_image">
        <button aria-label="Закрыть" type="button" className="popup__close-btn" onClick={onClose}></button>
        <img src={card.link} className="popup__image" alt={card.name} />
        <p className="popup__caption">{card.name}</p>
      </div>
    </Popup>
  );
}

export default ImagePopup;
