import { React, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }
  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onRegister({ email, password })
  }

  return (
    <div className='auth-content'>
      <p className='auth-content__heading'>
        Регистрация
      </p>
      <form onSubmit={handleSubmit} className='auth-content__form'>
        <fieldset className='auth-content__fieldset'>
          <input
            className='auth-content__input'
            id='email'
            name='email'
            type='email'
            placeholder='Email'
            autoComplete='off'
            onChange={handleEmailChange}
            value={email}
          />

          <input
            className='auth-content__input'
            id='password'
            name='password'
            minLength='5'
            maxLength='20'
            type='password'
            placeholder='Пароль'
            autoComplete='off'
            onChange={handlePasswordChange}
            value={password}
          />
        </fieldset>

        <div className='auth-content__button-container'>
          <button
            type='submit'
            className={`auth-content__submit-button ${props.isLoading && 'auth-content__submit-button_inactive'}`}
            disabled={props.isLoading}
          >
          {`${props.isLoading ? 'Регистрация...' : 'Зарегистрироваться'}`}
          </button>

          <div className='auth-content__signin'>
            <p className='auth-content__signin-text'>
              Уже зарегистрированы?
              <Link to='./Login' className='auth-content__login-link'>
                {' '}
                Войти
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
