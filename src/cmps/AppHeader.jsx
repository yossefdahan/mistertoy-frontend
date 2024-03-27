import { NavLink } from 'react-router-dom'
import { UserMsg } from '../pages/UserMsg'




export function AppHeader() {



    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <img className='logo-img' src={`img/logo.jpg`} alt="" />
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/toy" >Toys</NavLink>


                </nav>
            </section>
            <UserMsg />
        </header>)
}