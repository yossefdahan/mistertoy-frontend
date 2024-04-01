import { userService } from "../../services/user.service.js"
import { LOADING_DONE, LOADING_START } from '../reducers/system.reducer.js'
import { REMOVE_USER, SET_USERS, SET_USER, SET_WATCHED_USER } from "../reducers/user.reducer.js"
import { store } from "../store.js"

export function login(credentials) {

    return userService.login(credentials)
        .then((user) => {
            store.dispatch({ type: SET_USER, user })
        })
        .catch((err) => {
            console.log('user actions -> Cannot login', err)
            throw err
        })
}

export async function loadUsers() {
    try {
        store.dispatch({ type: LOADING_START })
        const users = await userService.getUsers()
        store.dispatch({ type: SET_USERS, users })
    } catch (err) {
        console.log('UserActions: err in loadUsers', err)
    } finally {
        store.dispatch({ type: LOADING_DONE })
    }
}

export async function loadUser(userId) {
    try {
        const user = await userService.getById(userId)
        store.dispatch({ type: SET_WATCHED_USER, user })
    } catch (err) {
        showErrorMsg('Cannot load user')
        console.log('Cannot load user', err)
    }
}

export async function removeUser(userId) {
    try {
        await userService.remove(userId)
        store.dispatch({ type: REMOVE_USER, userId })
    } catch (err) {
        console.log('UserActions: err in removeUser', err)
    }
}

export function signup(credentials) {
    return userService.signup(credentials)
        .then((user) => {
            store.dispatch({ type: SET_USER, user })
        })
        .catch((err) => {
            console.log('user actions -> Cannot signup', err)
            throw err
        })
}

export function logout(credentials) {
    return userService.logout(credentials)
        .then(() => {
            store.dispatch({ type: SET_USER, user: null })
        })
        .catch((err) => {
            console.log('user actions -> Cannot logout', err)
        })
}

// export function checkout(diff) {
//     return userService.updateScore(-diff)
//         .then((newScore) => {
//             store.dispatch({ type: CLEAR_CART })
//             store.dispatch({ type: SET_USER_SCORE, score: newScore })
//         })
//         .catch((err) => {
//             console.log('user actions -> Cannot checkout', err)
//             throw err
//         })
// }