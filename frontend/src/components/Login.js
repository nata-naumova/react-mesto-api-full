import { React, useState } from 'react';

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }
  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!email || !password) {
      return;
    }
    props.onLogin({ email, password })
  };

  return (
    <div className='auth-content'>
      <p className='auth-content__heading'>
        Вход
      </p>
      <form onSubmit={handleSubmit} className='auth-content__form'>
        <fieldset className='auth-content__fieldset'>
          <input
            required
            className='auth-content__input'
            id='email'
            name='email'
            type='text'
            placeholder='Email'
            autoComplete='off'
            onChange={handleEmailChange}
            value={email}
          />

          <input
            required
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
          {`${props.isLoading ? 'Выполняется вход...' : 'Войти'}`}
          </button>
        </div>
      </form>
    </div>
  )
}