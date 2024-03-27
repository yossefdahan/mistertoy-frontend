

import React from 'react';
import { Link } from 'react-router-dom';


export function AppFooter() {
    return (
        <footer className="app-footer">
            <div className="footer-container main-layout">

                <nav className="footer-nav">
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                </nav>
                <p>Creator: Yossef Dahan</p>
            </div>
        </footer>
    );
}
