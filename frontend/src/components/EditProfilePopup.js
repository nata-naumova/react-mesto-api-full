import React, { useContext, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./popups/PopupWithForm.js";

export function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    /* ---------- Подписка на контекст ----------- */
    const currentUser = useContext(CurrentUserContext);
    /* ---------- Переменные состояния ----------- */
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    /*  ----------
        После загрузки текущего пользователя из API, 
        его данные будут использованы в управляемых компонентах. 
        ----------
        */
    React.useEffect(() => {
        setName(currentUser.name || '');
        setDescription(currentUser.about || '');
    }, [isOpen, currentUser]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    /* ---------- 
        Передаём значения управляемых компонентов
        во внешний обработчик 
        ----------- 
    */
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name="profile"
            title="Редактировать профиль"
            button="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <>
                <label htmlFor="input-title" className="popup__field">
                    <input
                        type="text"
                        id="input-title"
                        className="popup__input"
                        name="name"
                        placeholder="Имя"
                        required
                        minLength="2"
                        maxLength="40"
                        value={name}
                        onChange={handleNameChange}
                    />
                    <span className="popup__input-error" id="input-title-error"></span>
                </label>
                <label htmlFor="input-job" className="popup__field">
                    <input
                        type="text"
                        id="input-job"
                        className="popup__input"
                        name="about"
                        placeholder="О себе"
                        required
                        minLength="2"
                        maxLength="200"
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                    <span className="popup__input-error" id="input-job-error"></span>
                </label>
            </>
        </PopupWithForm>
    )
} 