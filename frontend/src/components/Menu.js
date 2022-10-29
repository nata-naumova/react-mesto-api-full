import { Link } from 'react-router-dom';

export default function Menu(props) {
    return (
        <nav className='header__nav'>
            <ul className='header__nav-list'>
                <li>{props.email}</li>
                <li onClick={props.onSignOut}>
                    <Link
                        to='/sign-in'
                        className='header__nav-link header__nav-link_type_signout'
                    >
                        Выйти
                    </Link>
                </li>
            </ul>
        </nav>
    );
}