import React from "react";
import PopupWithForm from "./popups/PopupWithForm.js";

export function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    /* ---------- Переменные состояния ----------- */
    const [cardName, setCardName] = React.useState('');
    const [cardLink, setCardLink] = React.useState('');
    /* ---------- Получаем название ----------- */
    function handleCardNameChange(e) {
        setCardName(e.target.value);
    }
    /* ---------- Получаем ссылку ----------- */
    function handleCardLinkChange(e) {
        setCardLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({
            name: cardName,
            link: cardLink
        });
    }

    return (
        <PopupWithForm
            name="add-card"
            title="Новое место"
            button="Создать"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <>
                <label htmlFor="input-name" className="popup__field">
                    <input
                        type="text"
                        id="input-name"
                        className="popup__input"
                        name="name"
                        placeholder="Название"
                        required
                        minLength="2"
                        maxLength="30"
                        onChange={handleCardNameChange}
                    />
                    <span className="popup__input-error" id="input-name-error"></span>
                </label>
                <label htmlFor="input-link" className="popup__field">
                    <input
                        type="url"
                        id="input-link"
                        className="popup__input"
                        name="link"
                        placeholder="Ссылка на картинку"
                        required
                        onChange={handleCardLinkChange}
                    />
                    <span className="popup__input-error" id="input-link-error"></span>
                </label>
            </>
        </PopupWithForm>
    )
}