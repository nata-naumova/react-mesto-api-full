import React from "react";
import succesSvg from '../images/succes-reg.svg';
import errorSvg from '../images/error-reg.svg';

function InfoTooltip({ isOpen, onClose, registration }) {
    return (
        <section className={`popup ${isOpen ? "popup_opened" : ""}`}>
            <div className="popup__content">
                <button className="btn popup__close" onClick={onClose}></button>
                <img
                    className="popup__icon"
                    src={registration ? succesSvg : errorSvg}
                    alt={
                        registration ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'
                    }
                />
                <h2 className="popup__title popup__title_type_tooltip">
                    {registration ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}
                </h2>
            </div>
        </section>
    );
}

export default InfoTooltip;
