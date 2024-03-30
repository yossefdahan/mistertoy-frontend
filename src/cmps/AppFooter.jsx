

import React from 'react';
import { Link, NavLink } from 'react-router-dom';


export function AppFooter() {
    return (
        <footer className="app-footer">
            <div className="footer-container main-layout">

                <nav className="footer-nav">
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/dash">Statistic</Link>
                </nav>
                <h3>Yossef 🧸 Dahan</h3>

            </div>
        </footer >
    );
}
