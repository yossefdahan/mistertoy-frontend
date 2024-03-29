import { useState } from 'react'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { login, signup } from '../store/actions/user.actions.js'
import { LoginForm } from './LoginForm.jsx'


export function LoginSignup({ onClose }) {

    const [isSignup, setIsSignUp] = useState(false)

    function onLogin(credentials) {
        isSignup ? _signup(credentials) : _login(credentials)
    }

    function _login(credentials) {
        login(credentials)
            .then(() => { showSuccessMsg('Logged in successfully') })
            .catch((err) => { showErrorMsg('Oops try again') })
    }

    function _signup(credentials) {
        signup(credentials)
            .then(() => { showSuccessMsg('Signed in successfully') })
            .catch((err) => { showErrorMsg('Oops try again') })
    }

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="login-signup-modal" onClick={e => e.stopPropagation()}>
                <div className="login-page">
                    <LoginForm
                        onLogin={onLogin}
                        isSignup={isSignup}
                        onClose={onClose}
                    />
                    <div className="toggle-btns">
                        <div className="btns">
                            <a href="#" onClick={() => setIsSignUp(!isSignup)}>
                                {isSignup ?
                                    'Already a member? Login' :
                                    'New user? Signup here'
                                }
                            </a >
                        </div>
                    </div>
                </div >
            </div>
        </div>)
}
