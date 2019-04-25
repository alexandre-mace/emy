import { BehaviorSubject } from 'rxjs';

import { handleResponse } from '../helpers';
import { ENTRYPOINT } from '../config/entrypoint';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
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
            fetch(`${ENTRYPOINT}/users`)
                .then((response) => {
                    return response.json()
                })
                .then(users => {
                    const user = users['hydra:member'].find(x => x.email === email);
                    user.token = token;
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    currentUserSubject.next(user);

                    return user;
                    }
                )

        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}