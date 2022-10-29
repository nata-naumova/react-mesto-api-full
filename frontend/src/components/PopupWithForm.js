import { React, useEffect } from 'react';

export default function PopupWithForm({
    name, title, defaultValue, children,
    isOpen, onClose, closeAllPopups, onChange, onSubmit, isLoading }) {

    useEffect(() => {
        if (!isOpen) return;
        const handleEscapeClose = (evt) => {
            if (evt.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", handleEscapeClose);
        return () => {
            document.removeEventListener("keydown", handleEscapeClose);
        };
    }, [isOpen, onClose]);

    const handleOverlayClose = (evt) => {
        if (evt.target === evt.currentTarget && isOpen) {
            onClose();
        }
    };

    return (
        <div className={`popup ${isOpen && 'popup_opened'}`}
            id={`popup-${name}`}
            onClick={handleOverlayClose}>
            <div className='popup__container'>
                <button
                    type='button'
                    aria-label='закрыть'
                    className='popup__close'
                    onClick={onClose}
                ></button>
                <form
                    name={`form-${name}`}
                    className='form'
                    id={`form-${name}`}
                    // noValidate
                    autoComplete='off'
                    onChange={onChange}
                    onSubmit={onSubmit}
                >
                    <h2 className='form__heading'>{title}</h2>

                    <fieldset className='form__fieldset'>
                        {children}
                    </fieldset>

                    <fieldset className='form__submit'>
                        <input
                            type='submit'
                            value={`${isLoading ? 'Сохранение...' : defaultValue}`}
                            className={`form__save ${isLoading && 'form__save_inactive'}`}
                            disabled={isLoading}
                            onClick={closeAllPopups}
                        />
                    </fieldset>
                </form>
            </div>
        </div>
    );
}