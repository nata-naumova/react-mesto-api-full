import React from "react";
import { Link } from "react-router-dom";

function Register({ handleSubmitRegister }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault(e);
        handleSubmitRegister({ email, password })
    };

    return (
        <div className="auth">
            <p className="auth__title">Регистрация</p>
            <form onSubmit={handleSubmit} className="auth__form">
                <input
                    className="auth__input"
                    required
                    id="username"
                    name="email"
                    type="text"
                    placeholder="Email"
                    value={email}
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="auth__input"
                    required
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    autoComplete="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" onSubmit={handleSubmit} className="auth__btn">
                    Зарегистрироваться
                </button>
                <div className="auth__signin">
                    <p className="auth__subtitle">Уже зарегистрированы?</p>
                    <Link to="/sign-in" className="auth__subtitle">
                        Войти
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Register;
