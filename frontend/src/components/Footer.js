import React from 'react';

export function Footer() {
    let today = new Date();
    let year = today.getFullYear();
    return (
        <footer className="footer">
            <p className="footer__copyright">&copy;&nbsp;{year} Mesto Russia</p>
        </footer>
    )
}