import React, { useRef } from "react";
import PopupWithForm from "./popups/PopupWithForm.js";

export function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    /* ---------- Используем реф, чтобы получить прямой доступ к DOM-элементу инпута и его значению ----------- */
    const userAvatarRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: userAvatarRef.current.value,
        });
    }

    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            button="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <>
                <label htmlFor="input-avatar" className="popup__field">
                    <input
                        type="url"
                        id="input-avatar"
                        name="avatar"
                        className="popup__input"
                        placeholder="Ссылка на картинку"
                        required
                        ref={userAvatarRef}
                    />
                    <span className="popup__input-error" id="input-avatar-error"></span>
                </label>
            </>
        </PopupWithForm>
    )
}
