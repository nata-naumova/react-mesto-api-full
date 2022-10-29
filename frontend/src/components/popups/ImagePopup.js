import React from 'react';

function ImagePopup({ card, onClose }) {
    return (
        <div id="popup_img" className={`popup popup_overlay ${card.link ? 'popup_opened' : ''}`}>
            <div className="popup__content popup__content_img">
                <button
                    type="button"
                    className="btn popup__close popup-close-img"
                    aria-label="Закрыть"
                    onClick={onClose}
                ></button>
                <img src={card.link} alt={card.name} className="popup__img" />
                <h2 className="popup__img-title">{card.name}</h2>
            </div>
        </div>
    )
}

export default ImagePopup;