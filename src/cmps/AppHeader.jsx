import { NavLink, useNavigate } from 'react-router-dom'
import { UserMsg } from '../pages/UserMsg'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/actions/user.actions'
import { LoginSignup } from './LoginSignup'




export function AppHeader() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(storeState => storeState.userModule.loggedInUser)

    function onLogout() {
        logout()
            .then(() => {
                showSuccessMsg('logout successfully')
            })
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
        navigate('/')
    }

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <img className='logo-img' src="img/logo.jpg" alt="" />
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/toy" >Toys</NavLink>
                    {user && <NavLink to={`/user/${user._id}`} >My details</NavLink>}
                    {/* <NavLink to="/dash">Dashboard</NavLink> */}

                </nav>
            </section>
            {user ? (
                < section >

                    <span to={`/user/${user._id}`}>Hello {user.fullname} </span>
                    <button onClick={onLogout}>Logout</button>
                </ section >
            ) : (
                <section>
                    <LoginSignup />
                </section>
            )}
            <UserMsg />
        </header>)
}