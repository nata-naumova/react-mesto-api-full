import React from "react";

function Login({ handleSubmitLogin }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault(e);
        handleSubmitLogin({ email, password })
    };

    return (
        <div className="auth">
            <p className="auth__title">Вход</p>
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
                    Войти
                </button>
            </form>
        </div>
    );
}

export default Login;
