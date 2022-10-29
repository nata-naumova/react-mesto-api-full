import React, { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete }) {
    /* ---------- Подписка на контекст ----------- */
    const currentUser = useContext(CurrentUserContext);
    const { name, about, avatar } = currentUser;

    return (
        <main className="main">
            <section className="profile">
                <img
                    src={avatar}
                    alt="Аватар пользователя"
                    className="profile__avatar"
                />
                <button
                    className="profile__avatar-btn"
                    onClick={onEditAvatar}
                ></button>

                <div className="profile__info">
                    <div className="profile__top">
                        <h1 className="profile__title">{name}</h1>
                        <button
                            type="button"
                            className="profile__edit-btn btn popup-edit-profile"
                            aria-label="Редактировать профиль"
                            data-dismiss="popup_1"
                            onClick={onEditProfile}
                        ></button>
                    </div>
                    <p className="profile__subtitle">{about}</p>
                </div>
                <button
                    type="button"
                    className="profile__add-btn btn popup-add-card"
                    aria-label="Добавить запись"
                    data-dismiss="popup_2"
                    onClick={onAddPlace}
                ></button>
            </section>

            <section className="elements">
                {
                    cards.map((card) => {
                        return (
                            <Card
                                card={card}
                                key={card._id}
                                onCardClick={onCardClick}
                                onCardLike={onCardLike}
                                onCardDelete={onCardDelete}
                            />
                        )
                    })
                }
            </section>
        </main>
    )
}