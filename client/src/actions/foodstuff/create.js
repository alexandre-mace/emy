import { SubmissionError } from 'redux-form';
import { fetch } from '../../utils/dataAccess';
import { authenticationService } from '../../services';

export function error(error) {
    return { type: 'FOODSTUFF_CREATE_ERROR', error };
}

export function loading(loading) {
    return { type: 'FOODSTUFF_CREATE_LOADING', loading };
}

export function success(created) {
    return { type: 'FOODSTUFF_CREATE_SUCCESS', created };
}

export function create(values) {
    return dispatch => {
        dispatch(loading(true));
        if(values.image && values.image instanceof File) {
            const body = new FormData();
            body.append('file', values['image']);
            fetch('http://localhost:8080/images', { body, method: 'POST' })
                .then(response => {
                    return response.json()
                })
                .then(response => {
                    values.image = '/images/' + response.id;
                    values.provider = authenticationService.currentUser.source.value['@id'];
                    values.owner = authenticationService.currentUser.source.value['@id'];
                    fetch('/food_stuffs', { method: 'POST', body: JSON.stringify(values) })
                        .then(response => {
                            dispatch(loading(false));
                            return response.json();
                        })
                        .then(retrieved => dispatch(success(retrieved)))
                        .catch(e => {
                            dispatch(loading(false));

                            if (e instanceof SubmissionError) {
                                dispatch(error(e.errors._error));
                                throw e;
                            }
                            dispatch(error(e.message));
                        });
                })
        } else {
            values.provider = authenticationService.currentUser.source.value['@id'];
            values.owner = authenticationService.currentUser.source.value['@id'];
            return fetch('/food_stuffs', { method: 'POST', body: JSON.stringify(values) })

                .then(response => {
                    dispatch(loading(false));
                    return response.json();
                })
                .then(retrieved => dispatch(success(retrieved)))
                .catch(e => {
                    dispatch(loading(false));

                    if (e instanceof SubmissionError) {
                        dispatch(error(e.errors._error));
                        throw e;
                    }
                    dispatch(error(e.message));
                });
        }
    };
}

export function reset() {
    return dispatch => {
        dispatch(loading(false));
        dispatch(error(null));
    };
}
