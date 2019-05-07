import { BehaviorSubject } from 'rxjs';

import { handleResponse } from '../helpers';
import { ENTRYPOINT } from '../config/entrypoint';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    currentUserObservable: currentUserSubject.asObservable(),
    currentUser: JSON.parse(localStorage.getItem('currentUser')),
    get currentUserValue () { return JSON.parse(localStorage.getItem('currentUser')) }
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`${ENTRYPOINT}/login_check`, requestOptions)
        .then(handleResponse)
        .then(token => {
            return fetch(`${ENTRYPOINT}/users?email=${email}`)
                .then(user => {return user.json()})
                .then(user => {
                    const storedUser = user['hydra:member'][0];
                    storedUser.token = token;
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(storedUser));
                    return storedUser;
                    }
                )

        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}