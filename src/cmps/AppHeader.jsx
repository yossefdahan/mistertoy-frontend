import { NavLink, useNavigate } from 'react-router-dom'
import { UserMsg } from '../pages/UserMsg'
import { useDispatch, useSelector } from 'react-redux'
import { logout, loadUser } from '../store/actions/user.actions'
import { LoginSignup } from './LoginSignup'
import { useState } from 'react'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'




export function AppHeader() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(storeState => storeState.userModule.user)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const toggleModal = () => setIsModalOpen(!isModalOpen)


    const [isMenuOpen, setIsMenuOpen] = useState(true)


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
        <header className="app-header">
            <section className="header-container full main-layout">
                <img className='logo-img' src="img/logo.jpg" alt="" onClick={() => navigate('/toy')} />

                <button className="hamburger-menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</button>
                {isMenuOpen && (

                    <div className='navs-user' onClick={e => e.stopPropagation()}>
                        <nav className="app-nav">
                            <NavLink to="/" >Home</NavLink>
                            <NavLink to="/about" >About</NavLink>
                            <NavLink to="/toy" >Toys</NavLink>

                            {/* {user && <NavLink to={`/user/${user._id}`} >My details</NavLink>} */}
                        </nav>
                        <div className="menu-right">
                            {user ? (
                                <>
                                    <span className='user-name-span' onClick={() => navigate(`/user/${user._id}`)}>Hello {user.fullname}</span>
                                    <button className='logout-btn' onClick={onLogout}>Logout</button>
                                </>
                            ) : (
                                <button className="login-ham-btn" onClick={toggleModal}>
                                    ☰ Login
                                </button>
                            )}
                            {/* {isModalOpen && <LoginSignup onClose={toggleModal} />} */}
                        </div>

                    </div>
                )}
                {!isMenuOpen && (
                    <div className="menu-backdrop" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <div className='navs-user-ham' onClick={e => e.stopPropagation()}>
                            <nav className="app-nav">
                                <NavLink to="/" >Home</NavLink>
                                <NavLink to="/about" >About</NavLink>
                                <NavLink to="/toy" >Toys</NavLink>
                                {/* {user && <NavLink to={`/user/${user._id}`} >My details</NavLink>} */}
                            </nav>
                            <div className="menu-right">
                                {user ? (
                                    <>
                                        <span className='user-name-span' onClick={() => navigate(`/user/${user._id}`)}>Hello {user.fullname}</span>
                                        <button className='logout-btn' onClick={onLogout}>Logout</button>
                                    </>
                                ) : (
                                    <button className="login-ham-btn" onClick={toggleModal}>
                                        ☰ Login
                                    </button>
                                )}

                            </div>

                        </div>

                    </div>
                )}
                {isModalOpen && <LoginSignup onClose={toggleModal} />}


            </section>






            <UserMsg />
        </header >)
}