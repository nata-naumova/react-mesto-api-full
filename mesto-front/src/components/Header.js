import React from 'react';
import { Link, useLocation } from "react-router-dom";

export function Header({ loggedIn, src, email, handleSignOut }) {
    const location = useLocation();

    return (
        <header className="header">
            <img
                className="header__logo"
                src={src}
                alt="Логотип сайта"
            />

            {location.pathname === '/sign-up' && (
                <Link to="/sign-in" className="header__link">
                    Войти
                </Link>
            )}

            {location.pathname === '/sign-in' && (
                <Link to="/sign-up" className="header__link">
                    Регистрация
                </Link>
            )}

            {loggedIn && (
                <div className="header__info">
                    <p className="header__title">{email}</p>
                    <button className="header__btn btn" onClick={handleSignOut}>
                        Выйти
                    </button>
                </div>
            )}
        </header>
    )
}