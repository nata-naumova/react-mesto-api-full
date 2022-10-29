import logo from '../images/logo.svg';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWindowDimensions } from '../hooks/useWindowDimensions';
import Menu from './Menu';

export default function Header({ isLoggedIn, onSignOut, email, isMenuActive, onMenuClick }) {
    //linkURL & linkText depend on the current path
    const { pathname } = useLocation();
    const linkText = `${pathname === '/sign-up' ? 'Войти' : 'Регистрация'}`;
    const linkURL = `${pathname === '/sign-up' ? '/sign-in' : '/sign-up'}`;
    const { width } = useWindowDimensions();
    const isMobile = (width <= 767);

    return (
        <>
            {isLoggedIn && isMobile && isMenuActive &&
                <Menu
                    email={email}
                    onSignOut={onSignOut} />
            }

            <header className='header'>
                <img
                    src={logo}
                    alt='логотип Место'
                    className='header__logo'
                />
                {isLoggedIn
                    ? (isMobile
                        ? <button
                            className={`header__menu-button ${isMenuActive && 'header__menu-button_active'}`}
                            onClick={onMenuClick} />
                        : <Menu
                            email={email}
                            onSignOut={onSignOut} />
                    )
                    : <Link
                        to={linkURL}
                        className='header__nav-link'>
                        {linkText}
                    </Link>
                }
            </header>
        </>
    );
}