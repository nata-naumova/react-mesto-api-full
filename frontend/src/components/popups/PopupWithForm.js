import React from 'react';

function PopupWithForm({ name, title, button, children, isOpen, onClose, onSubmit }) {
    return (
        <div id={`popup_${name}`} className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
            <div className="popup__content">
                <h2 className="popup__title">{title}</h2>
                <form
                    action="#"
                    method="POST"
                    name={`${name}ProfileForm`}
                    className={`popup__form ${name}-profile`}
                    noValidate
                    onSubmit={onSubmit}
                >
                    {children}
                    <button type="submit" className="popup__btn">{button}</button>
                </form>
                <button
                    type="button"
                    className="btn popup__close popup-close-avatar"
                    aria-label="Закрыть"
                    onClick={onClose}
                ></button>
            </div>
        </div>
    )
}
export default PopupWithForm;