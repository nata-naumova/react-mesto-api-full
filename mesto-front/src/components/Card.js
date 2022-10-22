import React, { useContext } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = useContext(CurrentUserContext);
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (`btn ${isOwn ? 'element__trash' : ''}`);
    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = `element__like-btn ${isLiked ? 'element__like-btn_active' : ''}`;

    function handleCardClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <article className="element">
            <div className="element__img-wrapper">
                <div className="element__img-bg popup-img" data-dismiss="popup_img" onClick={handleCardClick}></div>
                <img
                    src={card.link}
                    alt={card.name}
                    className="element__img"
                />
            </div>
            <button
                type="button"
                className={cardDeleteButtonClassName}
                aria-label="Удалить карточку"
                onClick={handleDeleteClick}
            ></button>
            <div className="element__group">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__likes">
                    <button
                        type="button"
                        className={cardLikeButtonClassName}
                        aria-label="Поставить лайк"
                        onClick={handleLikeClick}
                    ></button>
                    <span className="element__likes-number">{card.likes.length}</span>
                </div>
            </div>
        </article>
    )
}

export default Card;